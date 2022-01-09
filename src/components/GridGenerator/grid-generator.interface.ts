import {Coordinate, SquareState} from "../ExplorationModule/exploration-module.interface";

export interface GridGenerationResult {
    grid: SquareState[][],
    start: Coordinate,
    target: Coordinate
}
