import { createServer } from 'http';

import express from 'express';
import next, { NextApiHandler } from 'next';
import { Server } from 'socket.io';
import { v4 } from 'uuid';

import {
    ClientToServerEvents,
    Move,
    Room,
    ServerToClientEvents,
} from '@/shared/types/global';

// Define the port number
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

// Create a Next.js app instance
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

// Start the Next.js app and listen to incoming connections
nextApp.prepare().then(async () => {
    const app = express();
    const server = createServer(app);

    // Initialize socket.io
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

    // Initialize an empty map to store rooms
    const rooms = new Map<string, Room>();

    // Initialize an empty map to room deletion timers
    const roomDeleteTimers = new Map<string, NodeJS.Timeout>();

    // Function to add a move to a room
    const addMove = (roomId: string, socketId: string, moves: Move[]) => {
        const room = rooms.get(roomId);

        try {
            if (!room) throw new Error(`Room ${roomId} does not exist`);

            if (!room.users.has(socketId)) {
                room.usersMoves.set(socketId, [...moves]);
            }

            room.usersMoves.get(socketId)?.push(...moves);
        } catch (error) {
            console.error((error as Error).message);
        }
    };

    // Function to undo moves in a room
    const undoMove = (roomId: string, n: number, socketId: string) => {
        try {
            const room = rooms.get(roomId);

            if (!room) {
                throw new Error(`Room with id ${roomId} not found`);
            }

            const userMoves = room.usersMoves.get(socketId);

            if (!userMoves) {
                throw new Error(`User moves not found for socket id ${socketId}`);
            }

            userMoves.splice(-n);
        } catch (error) {
            console.error(`Error occurred while undoing move: ${error}`);
        }
    };

    // Handle new socket connections
    io.on('connection', (socket) => {
        // Function to get the room ID that the socket is in
        const getRoomId = () => {
            const joinedRoom = [...socket.rooms].find(
                (room) => room !== socket.id,
            );

            if (!joinedRoom) return socket.id;

            return joinedRoom;
        };


        // Function to clear delete timer for a room
        const clearDeleteTimer = (roomId: string) => {
            const activeTimer = roomDeleteTimers.get(roomId);
            if (activeTimer) {
                clearTimeout(activeTimer);
                roomDeleteTimers.delete(roomId);
            }
        };
        // Function to set up delete timer if the room is empty for 1 hour
        const deleteRoomIfEmpty = (roomId: string) => {
            clearDeleteTimer(roomId);

            const room = rooms.get(roomId);
            if (room?.users.size === 0)
                roomDeleteTimers.set(roomId, setTimeout(() => {
                    rooms.delete(roomId);
                    roomDeleteTimers.delete(roomId);
                }, 3600000));
        };

        // Function to leave a room
        const leaveRoom = (roomId: string, socketId: string) => {
            const room = rooms.get(roomId);
            if (!room) return;

            room.users.delete(socketId);

            socket.leave(roomId);

            deleteRoomIfEmpty(roomId);
        };

        // Handle the 'create_room' event
        socket.on('create_room', (username) => {
            const roomId: string = v4();

            socket.join(roomId);

            rooms.set(roomId, {
                usersMoves: new Map([[socket.id, []]]),
                users: new Map([[socket.id, username]]),
            });

            io.to(socket.id).emit('created', roomId, username);
        });

        // Handle the 'check_room' event
        socket.on('check_room', (roomId) => {
            if (rooms.has(roomId)) socket.emit('room_exists', true);
            else socket.emit('room_exists', false);
        });

        // Handle the 'join_room' event
        socket.on('join_room', (roomId, username, prevUserId) => {
            const room = rooms.get(roomId);

            if (room && room.users?.size < 10) {
                socket.join(roomId);

                room.users.set(socket.id, username);

                if (prevUserId && !room.users.has(prevUserId)) {
                    const prevUserMoves = room.usersMoves.get(prevUserId);
                    room.usersMoves.set(socket.id, prevUserMoves || []);
                    room.usersMoves.delete(prevUserId);
                } else room.usersMoves.set(socket.id, []);

                io.to(socket.id).emit('joined', roomId, username);

                clearDeleteTimer(roomId);
            } else io.to(socket.id).emit('joined', roomId, username, true);

        });

        // Handle the 'join_room' event where a user requests to join a specific room
        socket.on('joined_room', () => {
            const roomId = getRoomId();

            const room = rooms.get(roomId);
            if (!room) return;

            io.to(socket.id).emit(
                'room',
                JSON.stringify([...room.usersMoves]),
                JSON.stringify([...room.users]),
            );

            socket.broadcast
                .to(roomId)
                .emit(
                    'new_user',
                    socket.id,
                    room.users.get(socket.id) || 'Аноним',
                );
        });

        //  Handle the 'leave_room' event where a user requests to leave the room
        socket.on('leave_room', () => {
            const roomId = getRoomId();
            leaveRoom(roomId, socket.id);

            io.to(roomId).emit('user_disconnected', socket.id);
        });

        // Handle the 'draw' event where a user makes a new drawing move
        socket.on('draw', (move) => {
            const roomId = getRoomId();

            const timestamp = Date.now();

            move.timestamp = timestamp;

            addMove(roomId, socket.id, [move]);

            io.to(socket.id).emit('your_move', [move]);

            socket.broadcast
                .to(roomId)
                .emit('user_draw', [move], socket.id);
        });

        // Handle the 'redraw' event where a user redo changes
        socket.on('redraw', (moves) => {
            const roomId = getRoomId();

            addMove(roomId, socket.id, moves);

            io.to(socket.id).emit('your_move', moves);

            socket.broadcast
                .to(roomId)
                .emit('user_draw', moves, socket.id);
        });

        //  Handles the 'undo' event where a user requests to undo their last move
        socket.on('undo', (n) => {
            const roomId = getRoomId();

            undoMove(roomId, n, socket.id);

            socket.broadcast.to(roomId).emit('user_undo', socket.id, n);
        });

        // Handle the 'mouse_move' event where a user moves their mouse over the drawing area
        socket.on('mouse_move', (x, y) => {
            socket.broadcast
                .to(getRoomId())
                .emit('mouse_moved', x, y, socket.id);
        });

        // Handle the 'send_msg' event where a user sends a new chat message
        socket.on('send_msg', (msg) => {
            io.to(getRoomId()).emit('new_msg', socket.id, msg);
        });

        // Handle the 'disconnecting' event where a user is disconnecting from the server
        socket.on('disconnecting', () => {
            const roomId = getRoomId();
            leaveRoom(roomId, socket.id);

            io.to(roomId).emit('user_disconnected', socket.id);
        });
    });

    app.all('*', (req: any, res: any) => nextHandler(req, res));

    server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${port}`);
    });
});
