import React, {useEffect, useRef, useState} from 'react';
import {Coordinate, MazeMakingResult, MazeNodeState} from "./maze-maker.interface";
import SingleSquare from "../SingleSquare";
import {generateMatrix} from "../../utils/matrix-generation";
import Grid from "../NewNewGridRenderer/Grid";

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

    const initialStart = initialValues?.start ?? {row: 4, col: 8};
    const initialTarget = initialValues?.target?? {row: 3, col: 2};
    const initialGrid = initialValues?.grid ?? generateMatrix<MazeNodeState>(MazeNodeState.EMPTY, 20, 40);
    initialGrid[initialStart.row][initialStart.col] = MazeNodeState.START;
    initialGrid[initialTarget.row][initialTarget.col] = MazeNodeState.TARGET;

    const [stateRefMatrix, setStateRefMatrix] = useState<React.MutableRefObject<MazeNodeState>[][]>(initialGrid.map(row => row.map(state => useRef(state))));
    const [start, setStart] = useState<Coordinate>(initialStart);
    const [target, setTarget] = useState<Coordinate>(initialTarget);
    const [gridRows, setGridRows] = useState<number>(20);
    const [gridCols, setGridCols] = useState<number>(40);
    const [placingType, setPlacingType] = useState<MazeNodeState>(MazeNodeState.BLOCKED);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    // Set a square state in the generated grid based on passed coords and state.
    const setSquareState = (coord: Coordinate, state: MazeNodeState) => {
        if(coord.row < stateRefMatrix.length && coord.col < stateRefMatrix[0].length){
            switch(state) {
                case MazeNodeState.START:
                    stateRefMatrix[start.row][start.col].current = MazeNodeState.EMPTY;
                    setStart(coord);
                    stateRefMatrix[coord.row][coord.col].current = state;
                    break;
                case MazeNodeState.TARGET:
                    stateRefMatrix[target.row][target.col].current = MazeNodeState.EMPTY;
                    setTarget(coord);
                    stateRefMatrix[coord.row][coord.col].current = state;
                    break;
                default:
                    stateRefMatrix[coord.row][coord.col].current = state;
                    break;
            }
        }
    }

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
        // TODO : Make the new grid
    }, [gridCols, gridRows]);

    return(
    <div onMouseDown={() => setIsMouseDown(true)}
         onMouseLeave={() => setIsMouseDown(false)}
         onMouseUp={() => setIsMouseDown(false)}
    >
        <Grid
            stateRefMatrix={stateRefMatrix}
            stateToColor={stateToColorInterpreter}
            rows={gridRows}
            cols={gridCols}
            onSquareMouseDown = {(x: number, y: number) => {setSquareState({row: x, col: y}, placingType)}}
            onSquareClick = {(x: number, y: number) => {setSquareState({row: x, col: y}, placingType)}}
            onSquareMouseEnter = {(x: number, y: number) => {if(isMouseDown) setSquareState({row: x, col: y}, placingType)}}
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
