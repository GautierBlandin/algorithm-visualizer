import React, {useEffect, useRef, useState} from 'react';
import {Coordinate, MazeMakingResult, MazeNodeState} from "./maze-maker.interface";
import SingleSquare from "../SingleSquare";
import {generateMatrix} from "../../utils/matrix-generation";
import Grid from "../Grid5/Grid";

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

    const [stateMatrix, setStateMatrix] = useState<MazeNodeState[][]>(initialGrid.map(row => row.map(state => state)));
    const [start, setStart] = useState<Coordinate>(initialStart);
    const [target, setTarget] = useState<Coordinate>(initialTarget);
    const [placingType, setPlacingType] = useState<MazeNodeState>(MazeNodeState.BLOCKED);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    // Set a square state in the generated grid based on passed coords and state.
    const setSquareState = (coord: Coordinate, state: MazeNodeState) => {
        if(coord.row < stateMatrix.length && coord.col < stateMatrix[0].length){
            switch(state) {
                case MazeNodeState.START:
                    stateMatrix[start.row][start.col] = MazeNodeState.EMPTY;
                    setStart(coord);
                    stateMatrix[coord.row][coord.col] = state;
                    break;
                case MazeNodeState.TARGET:
                    stateMatrix[target.row][target.col] = MazeNodeState.EMPTY;
                    setTarget(coord);
                    stateMatrix[coord.row][coord.col] = state;
                    break;
                default:
                    stateMatrix[coord.row][coord.col] = state;
                    break;
            }
        }
        setStateMatrix([...stateMatrix])
    }

    return(
    <div onMouseDown={() => setIsMouseDown(true)}
         onMouseLeave={() => setIsMouseDown(false)}
         onMouseUp={() => setIsMouseDown(false)}
    >
        <Grid
            stateMatrix={stateMatrix}
            stateToColor={stateToColorInterpreter}
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
