import React, {useEffect, useState} from 'react';
import {Coordinate, SquareState} from "../ExplorationModule/exploration-module.interface";
import {GridGenerationResult} from "./grid-generator.interface";
import GridRenderer from "../GridRenderer/GridRenderer";
import SingleSquare from "../SingleSquare";
import {generateMatrix} from "../../utils/matrix-generation";

export interface GridGeneratorProps {
    stateToColorInterpreter: (state: SquareState) => string;
    getGenerationResult: (result: GridGenerationResult) => void;
    squareSize: number;
}

export default function GridGenerator({stateToColorInterpreter,
                                      getGenerationResult,
                                      squareSize}: GridGeneratorProps){

    const [grid, setGrid] = useState<SquareState[][]>(generateMatrix<SquareState>(SquareState.EMPTY, 10, 10));
    const [start, setStart] = useState<Coordinate>({row: 4, col: 8});
    const [target, setTarget] = useState<Coordinate>({row: 3, col: 2});
    const [gridCols, setGridCols] = useState<number>(10);
    const [gridRows, setGridRows] = useState<number>(10);
    const [placingType, setPlacingType] = useState<SquareState>(SquareState.BLOCKED);

    // Set a square state in the generated grid based on passed coords and state.
    const setSquareState = (coord: Coordinate, state: SquareState) => {
        if(grid.length < coord.row && grid[0].length < coord.col){
            switch(state) {
                case SquareState.START:
                    setStart(coord);
                    break;
                case SquareState.TARGET:
                    setTarget(coord);
                    break;
                default:
                    grid[coord.row][coord.col] = state;
                    setGrid(grid);
            }
        }
    }

    // Send the grid generation result everytime the grid is updated
    useEffect(() => {
        getGenerationResult({
            grid: grid,
            start: start,
            target: target
        })
    }, [JSON.stringify(grid), JSON.stringify(target), JSON.stringify(start)]);

    // Update the size of the grid when requested
    useEffect(() => {
        if(start.row >= gridRows) {
            start.row = gridRows - 1;
        }
        if(start.col >= gridCols) {
            start.col = gridCols - 1;
        }
        if(target.row >= gridRows) {
            target.row = gridRows - 1;
        }
        if(target.col >= gridCols) {
            target.col = gridCols - 1;
        }
        // Change the size of the grid and copy the current grid the new increased/decreased grid.
        const newGrid: SquareState[][] = Array.from({length: gridRows}).map(() => Array.from({length: gridCols}).map(() => SquareState.EMPTY));
        for(let i = 0; i < gridRows; i++){
            for(let j = 0; j < gridCols; j++){
                if(i < grid.length && j < grid[0].length) {
                    newGrid[i][j] = grid[i][j];
                }
            }
        }
        setGrid(newGrid);
    }, [gridCols, gridRows]);

    // Convert a grid and start/end coordinates to a rendrable color matrix
    function getColorMatrix(grid: SquareState[][], start: Coordinate, target: Coordinate){
        const colorMatrix = grid.map(row => row.map(state => stateToColorInterpreter(state)));
        colorMatrix[start.row][start.col] = stateToColorInterpreter(SquareState.START);
        colorMatrix[target.row][target.col] = stateToColorInterpreter(SquareState.TARGET);
        return colorMatrix;
    }

    return(
    <div>
        <GridRenderer
            colorMatrix={getColorMatrix(grid, start, target)}
            squareSize={squareSize}
            onSquareClick={(x: number, y: number) => setSquareState({row: x, col: y}, placingType)}
        />
        <div>
            <SingleSquare color={stateToColorInterpreter(SquareState.EMPTY)}
                          borderColor={'gray'}
                          size={40}
                          onClick={() => {console.log('clicked the empty square');
                              setPlacingType(SquareState.EMPTY)}}
            />
            <SingleSquare color={stateToColorInterpreter(SquareState.BLOCKED)}
                          borderColor={'gray'}
                          size={40}
                          onClick={() => setPlacingType(SquareState.BLOCKED)}
            />
            <SingleSquare color={stateToColorInterpreter(SquareState.TARGET)}
                          borderColor={'gray'}
                          size={40}
                          onClick={() => setPlacingType(SquareState.TARGET)}
            />
            <SingleSquare color={stateToColorInterpreter(SquareState.START)}
                          borderColor={'gray'}
                          size={40}
                          onClick={() => setPlacingType(SquareState.START)}
            />
        </div>
    </div>
    )
}
