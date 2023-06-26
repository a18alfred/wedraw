import { StoredKey } from '@/shared/types/global';

type IdMap = Map<string, StoredKey>
const useStoredId = () => {

    const saveMap = (map: IdMap) => {
        const mapJson = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem('client_id_by_room', mapJson);
    };

    const getMap = (): IdMap | undefined => {
        const savedKeysJson = localStorage.getItem('client_id_by_room');

        if (savedKeysJson) {
            return new Map<string, StoredKey>(JSON.parse(savedKeysJson));
        }

        return undefined;
    };
    const cleanMapAndSave = (map: IdMap) => {
        const TWO_DAYS = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        const now = Date.now();
        for (const [key, value] of map.entries()) {
            if (now - value.timestamp > TWO_DAYS) {
                map.delete(key);
            }
        }
        saveMap(map);
    };


    const saveCurrentId = (roomid: string, clientId: string) => {
        const idMap = getMap();
        if (idMap) {
            idMap.set(roomid, { timestamp: Date.now(), id: clientId });
            saveMap(idMap);
            return;
        }

        const newIdMap = new Map<string, StoredKey>();
        newIdMap.set(roomid, { timestamp: Date.now(), id: clientId });
        saveMap(newIdMap);
    };

    const getSavedIdByRoom = (roomId: string): string | undefined => {
        const idMap = getMap();
        let prevKey: string | undefined;

        if (idMap) {
            prevKey = idMap.get(roomId)?.id;
            cleanMapAndSave(idMap);
        }

        return prevKey;
    };

    return {
        getSavedIdByRoom,
        saveCurrentId,
    };
};

export default useStoredId;