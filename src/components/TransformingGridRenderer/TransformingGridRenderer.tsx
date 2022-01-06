import React from 'react';
import {SquareState, Step, TransformingGrid} from "../../types/transforming-grid";
import GridRenderer from "../GridRenderer/GridRenderer";

export interface TransformingGridRendererProps {
    transformingGrid: TransformingGrid
    stateColorInterpreter: (state: number) => string;
}


export default function TransformingGridRenderer({transformingGrid, stateColorInterpreter}: TransformingGridRendererProps){
    const [currentStateMatrix, setCurrentStateMatrix] = React.useState<SquareState[][]>(transformingGrid.initialState);
    const [currentStepNumber, setCurrentStepNumber] = React.useState<number>(0);

    const stateMatrixToColorMatrix = (stateMatrix: number[][]): string[][] => {
        return stateMatrix.map(row => row.map(stateColorInterpreter));
    }

    const makeStep = (stateMatrix: SquareState[][], stepNumber: number, step: Step) => {
        step.transformations.forEach(transformation => {
            stateMatrix[transformation.row][transformation.col] = transformation.newSquareState;
        })
        return stateMatrix;
    }


    const executeStep = () => {
        if (currentStepNumber < transformingGrid.steps.length) {
            setCurrentStateMatrix(makeStep(currentStateMatrix, currentStepNumber, transformingGrid.steps[currentStepNumber]));
            setCurrentStepNumber(currentStepNumber + 1);
        }
    }

    return(
        <div>
            <GridRenderer colorMatrix={stateMatrixToColorMatrix(currentStateMatrix)} squareSize={40}/>
            {currentStepNumber < transformingGrid.steps.length ? <button onClick={executeStep}>Next step</button> : null}
        </div>
    )
}
