import React, {useEffect, useState} from 'react';
import {
    Coordinate,
    MazeMakingResult,
    MazeNodeState} from "./maze-maker.interface";
import GridRenderer from "../GridRenderer/GridRenderer";
import SingleSquare from "../SingleSquare";
import {generateMatrix} from "../../utils/matrix-generation";

export interface MazeMakerProps {
    stateToColorInterpreter: (state: MazeNodeState) => string;
    getGenerationResult: (result: MazeMakingResult) => void;
    squareSize: number;
    initialValues?: MazeMakingResult;
}

export default function MazeMaker({
    stateToColorInterpreter,
    getGenerationResult,
    squareSize,
    initialValues
}: MazeMakerProps){

    const [grid, setGrid] = useState<MazeNodeState[][]>(initialValues?.grid ?? generateMatrix<MazeNodeState>(MazeNodeState.EMPTY, 10, 10));
    const [start, setStart] = useState<Coordinate>(initialValues?.start ?? {row: 4, col: 8});
    const [target, setTarget] = useState<Coordinate>(initialValues?.target?? {row: 3, col: 2});
    const [gridCols, setGridCols] = useState<number>(10);
    const [gridRows, setGridRows] = useState<number>(10);
    const [placingType, setPlacingType] = useState<MazeNodeState>(MazeNodeState.BLOCKED);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    // Set a square state in the generated grid based on passed coords and state.
    const setSquareState = (coord: Coordinate, state: MazeNodeState) => {
        if(coord.row < grid.length && coord.col < grid[0].length){
            switch(state) {
                case MazeNodeState.START:
                    setStart(coord);
                    break;
                case MazeNodeState.TARGET:
                    setTarget(coord);
                    break;
                default:
                    grid[coord.row][coord.col] = state;
                    setGrid([...grid]);
                    break;
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
        const newGrid: MazeNodeState[][] = Array.from({length: gridRows}).map(() => Array.from({length: gridCols}).map(() => MazeNodeState.EMPTY));
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
    function getColorMatrix(grid: MazeNodeState[][], start: Coordinate, target: Coordinate){
        const colorMatrix = grid.map(row => row.map(state => stateToColorInterpreter(state)));
        colorMatrix[start.row][start.col] = stateToColorInterpreter(MazeNodeState.START);
        colorMatrix[target.row][target.col] = stateToColorInterpreter(MazeNodeState.TARGET);
        return colorMatrix;
    }

    return(
    <div onMouseDown={() => setIsMouseDown(true)}
         onMouseLeave={() => setIsMouseDown(false)}
         onMouseUp={() => setIsMouseDown(false)}
    >
        <GridRenderer
            colorMatrix={getColorMatrix(grid, start, target)}
            squareSize={squareSize}
            onSquareEnter={(x: number, y: number) => {if(isMouseDown) {
                setSquareState({row: x, col: y}, placingType)
            }}}
            onSquareMouseDown={(x: number, y: number) => setSquareState({row: x, col: y}, placingType)}
        />
        <div>
            <div>
                <SingleSquare color={stateToColorInterpreter(MazeNodeState.EMPTY)}
                              borderColor={'gray'}
                              size={40}
                              onClick={() => setPlacingType(MazeNodeState.EMPTY)}
                />
                Empty
            </div>
            <div>
                <SingleSquare color={stateToColorInterpreter(MazeNodeState.BLOCKED)}
                              borderColor={'gray'}
                              size={40}
                              onClick={() => setPlacingType(MazeNodeState.BLOCKED)}
                />
                Wall
            </div>
            <div>
                <SingleSquare color={stateToColorInterpreter(MazeNodeState.START)}
                              borderColor={'gray'}
                              size={40}
                              onClick={() => setPlacingType(MazeNodeState.START)}
                />
                Start
            </div>
            <div>
                <SingleSquare color={stateToColorInterpreter(MazeNodeState.TARGET)}
                              borderColor={'gray'}
                              size={40}
                              onClick={() => setPlacingType(MazeNodeState.TARGET)}
                />
                Target
            </div>
        </div>
    </div>
    )
}
