import { PathPoint } from '@/shared/types/global';

export const smoothPath = (path: PathPoint[], smoothness: number): PathPoint[] => {
    const smoothedPoints: PathPoint[] = [];
    const windowSize = Math.ceil((smoothness / 100) * path.length);

    for (let i = 0; i < path.length; i++) {
        let sumX = 0;
        let sumY = 0;
        let count = 0;
        for (let j = Math.max(0, i - Math.floor(windowSize / 2)); j <= Math.min(path.length - 1, i + Math.floor(windowSize / 2)); j++) {
            sumX += path[j][0];
            sumY += path[j][1];
            count++;
        }
        smoothedPoints.push([sumX / count, sumY / count]);
    }
    return smoothedPoints;
};
