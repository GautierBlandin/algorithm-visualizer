import {Algorithms} from "../../grid-exploration/grid-explorer.interfaces";

export interface MazeMakingResult {
    grid: MazeNodeState[][],
    start: Coordinate,
    target: Coordinate,
    algorithm: Algorithms
}

export interface Coordinate {
    row: number;
    col: number;
}

export enum MazeNodeState {
    EMPTY,
    BLOCKED,
    START,
    TARGET
}
