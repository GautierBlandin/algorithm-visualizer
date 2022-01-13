import React, {useEffect, useRef, useState} from 'react';
import {Coordinate, MazeMakingResult, MazeNodeState} from "./maze-maker.interface";
import SingleSquare from "../SingleSquare";
import {generateMatrix} from "../../utils/matrix-generation";
import Grid, { GridRef } from "../ImperativeGrid/Grid";

export interface MazeMakerProps {
    stateToColorInterpreter: (state: MazeNodeState) => string;
    squareSize: number;
    initialValues?: MazeMakingResult;
    generationResultFetcher: React.MutableRefObject<{fetch: () => MazeMakingResult | void}>;
}

export default function MazeMaker({
    stateToColorInterpreter,
    squareSize,
    initialValues,
    generationResultFetcher
}: MazeMakerProps){

    const initialStart = initialValues?.start ?? {row: 4, col: 8};
    const initialTarget = initialValues?.target?? {row: 3, col: 2};
    const initialGrid = initialValues?.grid ?? generateMatrix<MazeNodeState>(MazeNodeState.EMPTY, 20, 40);
    initialGrid[initialStart.row][initialStart.col] = MazeNodeState.START;
    initialGrid[initialTarget.row][initialTarget.col] = MazeNodeState.TARGET;

    const stateMatrix: React.MutableRefObject<number[][]> = useRef(JSON.parse(JSON.stringify(initialGrid)));
    const start = useRef<Coordinate>(initialStart);
    const target = useRef<Coordinate>(initialTarget);
    const [gridRows, setGridRows] = useState<number>(20);
    const [gridCols, setGridCols] = useState<number>(40);
    const [placingType, setPlacingType] = useState<MazeNodeState>(MazeNodeState.BLOCKED);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const gridRef: React.MutableRefObject<GridRef | null> = useRef(null);

    useEffect(() => {
        generationResultFetcher.current.fetch = () => ({
            grid: stateMatrix.current.map(row => row.map(value => value)),
            start: start.current,
            target: target.current,
        })
    }, []);

    // Set a square state in the generated grid based on passed coords and state.
    const setSquareState = (coord: Coordinate, state: MazeNodeState) => {
        // Prevent updating the state of the current start or target
        if(coord.row < stateMatrix.current.length && coord.col < stateMatrix.current[0].length){
            if((start.current.row == coord.row && start.current.col == coord.col) || (target.current.row == coord.row && target.current.col == coord.col)){
                return
            }

            switch(state) {
                // The start and target squares should be unique, so their current square gets set to empty
                // before they are updated
                case MazeNodeState.START:
                    stateMatrix.current[start.current.row][start.current.col] = MazeNodeState.EMPTY;
                    gridRef.current?.updateSquareState(start.current.row, start.current.col, MazeNodeState.EMPTY);
                    start.current = coord;
                    break;
                case MazeNodeState.TARGET:
                    stateMatrix.current[target.current.row][target.current.col] = MazeNodeState.EMPTY;
                    gridRef.current?.updateSquareState(target.current.row, target.current.col, MazeNodeState.EMPTY);
                    target.current = coord;
                    break;
                default:
                    break;
            }
            // Update the rendering view and the state matrix
            gridRef.current?.updateSquareState(coord.row, coord.col, state);
            stateMatrix.current[coord.row][coord.col] = state;
        }
    }

    // Update the size of the grid when requested
    useEffect(() => {
        if(start.current.row >= gridRows) {
            start.current.row = gridRows - 1;
        }
        if(start.current.col >= gridCols) {
            start.current.col = gridCols - 1;
        }
        if(target.current.row >= gridRows) {
            target.current.row = gridRows - 1;
        }
        if(target.current.col >= gridCols) {
            target.current.col = gridCols - 1;
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
            initialStateMatrix={initialGrid}
            stateToColor={stateToColorInterpreter}
            onSquareMouseDown = {(x: number, y: number) => {setSquareState({row: x, col: y}, placingType)}}
            onSquareClick = {(x: number, y: number) => {setSquareState({row: x, col: y}, placingType)}}
            onSquareMouseEnter = {(x: number, y: number) => {if(isMouseDown) setSquareState({row: x, col: y}, placingType)}}
            ref = {gridRef}
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