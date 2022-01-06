
/*
Goal: code the bfs algorithm on a grid.
Steps :
1. Represent the grid --> The grid is n*m matrix of number, each number represent a possible state.
 */


import {GridObserver} from "./grid-observer";

export enum CellState {
    EMPTY,
    BLOCKED,
}

export enum ObservedCellState {
    EMPTY,
    BLOCKED,
    PATH,
    VISITED,
    START,
    END
}

export interface Coordinate {
    x: number;
    y: number;
}

function getAdjacentCoordinates(coords: Coordinate): Coordinate[]{
    const result: Coordinate[] = [];
    const {x, y} = coords;

    const x_next = [1, -1, 0, 0];
    const y_next = [0, 0, 1, -1];

    for (let i = 0; i < x_next.length; i++){
        const new_x = x + x_next[i];
        const new_y = y + y_next[i];

        result.push({x: new_x, y: new_y});
    }

    return result;
}

function isCoordinateValid(coords: Coordinate, grid: CellState[][]): boolean{
    const {x, y} = coords;
    const n = grid.length;
    const m = grid[0].length;

    return x >= 0 && x < n && y >= 0 && y < m && grid[x][y] !== CellState.BLOCKED;
}

function coordinateIndex(coords: Coordinate, grid: CellState[][]): number{
    const {x, y} = coords;
    const n = grid.length;
    const m = grid[0].length;

    return x * m + y;
}

function indexCoordinate(index: number, grid: CellState[][]): Coordinate {
    const n = grid.length;
    const m = grid[0].length;

    return {x: Math.floor(index / m), y: index % m};
}

export function generateEmptyGrid(n: number, m: number): CellState[][]{
    const grid: CellState[][] = [];

    for (let i = 0; i < n; i++){
        const row: CellState[] = [];
        for (let j = 0; j < m; j++){
            row.push(CellState.EMPTY);
        }
        grid.push(row);
    }

    return grid;
}

export function BFS(grid: CellState[][], start: Coordinate, end: Coordinate, observer?: GridObserver): Coordinate[]{
    const queue: Coordinate[] = [];
    const visited: Set<number> = new Set();
    const previous = new Map<number, number>();
    const result: Coordinate[] = [];
    let visitedLayerNodes: Coordinate[] = [];

    // Enqueue the start coordinate
    queue.push(start);
    visited.add(coordinateIndex(start, grid));
    previous.set(coordinateIndex(start, grid), -1);
    let nodesLeftInLayer = 1;
    let nodesInNextLayer = 0;

    // If observer is provided, set the initial state of the grid
    if(observer){
        const observedGrid = JSON.parse(JSON.stringify(grid)) as ObservedCellState[][];
        observedGrid[start.x][start.y] = ObservedCellState.START;
        observedGrid[end.x][end.y] = ObservedCellState.END;
        observer.setInitialState(observedGrid);
    }

    let counter = 0;

    // Loop through the queue, stop if all reachable nodes have been visited as the queue will be empty
    while (queue.length > 0){
        counter++;
        console.log(counter);
        console.log('looping');
        console.log('queue length', queue.length);
        console.log(queue);

        // Dequeue the first element
        let current = queue.shift()!;
        if(observer) visitedLayerNodes.push(current);
        nodesLeftInLayer--;

        // If the current coordinate is the end coordinate, stop and reconstruct the path
        if (current.x === end.x && current.y === end.y){
            result.unshift({x: current.x, y: current.y});
            while(previous.get(coordinateIndex(current, grid)) !== -1 ){
                const previousIndex = previous.get(coordinateIndex(current, grid));
                current = indexCoordinate(previousIndex!, grid);
                result.unshift({x: current.x, y: current.y});
            }
            // If observer is provided, set the last step for the path to the target
            if(observer) {
                observer.addStep({
                    transformations: visitedLayerNodes.map(c => ({
                        newSquareState: ObservedCellState.VISITED,
                        row: c.x,
                        col: c.y
                    }))
                });
                observer.addStep({transformations: result.map(c => ({
                        newSquareState: ObservedCellState.PATH,
                        row: c.x,
                        col: c.y
                    }))})
            }
            break;
        }

        // Construct the neighbors of the current coordinate (including invalid ones)
        const adjacentCoords = getAdjacentCoordinates(current);

        for (let i = 0; i < adjacentCoords.length; i++){
            const coords = adjacentCoords[i];

            // Enqueue the neighbor coordinate if it is valid and not visited, and set the current coordinate as the neighbor's previous coordinate
            if (isCoordinateValid(coords, grid) && !visited.has(coordinateIndex(coords, grid))){
                queue.push(coords);
                visited.add(coordinateIndex(coords, grid));
                previous.set(coordinateIndex(coords, grid), coordinateIndex(current, grid));
                nodesInNextLayer++;
            }
        }

        // If the current layer is empty, move to the next layer
        if (nodesLeftInLayer === 0){
            nodesLeftInLayer = nodesInNextLayer;
            nodesInNextLayer = 0;
            if(observer) {
                observer.addStep({
                    transformations: visitedLayerNodes.map(c => ({
                        newSquareState: ObservedCellState.VISITED,
                        row: c.x,
                        col: c.y
                    }))
                });
                visitedLayerNodes = [];
            }
        }
    }

    // Return the shortest, which will be empty if no path is found
    console.log("Finished BFSing")
    return result;
}
