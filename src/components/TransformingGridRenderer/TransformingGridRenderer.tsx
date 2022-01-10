import {Step, TransformingGrid} from "./transforming-grid-renderer.interface";
import GridRenderer from "../GridRenderer/GridRenderer";
import {useEffect, useState} from "react";

export interface TransformingGridRendererProps {
    transformingGrid: TransformingGrid
    stateColorInterpreter: (state: number) => string;
    squareSize: number;
}

export default function TransformingGridRenderer({transformingGrid, stateColorInterpreter, squareSize}: TransformingGridRendererProps){
    const [currentStateMatrix, setCurrentStateMatrix] = useState<number[][]>(JSON.parse(JSON.stringify(transformingGrid.initialState)));
    const [currentStepNumber, setCurrentStepNumber] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(undefined);

    // Pure function turning a state matrix of numbers into a renderable color matrix using the provided interpreter
    const stateMatrixToColorMatrix = (stateMatrix: number[][]): string[][] => {
        return stateMatrix.map(row => row.map(stateColorInterpreter));
    }

    // Pure function that executes the provided step for the provided step matrix
    const makeStep = (stateMatrix: number[][], step: Step): number[][] => {
        step.transformations.forEach(transformation => {
            stateMatrix[transformation.row][transformation.col] = transformation.newSquareState;
        })
        return stateMatrix;
    }

    // Make step using the component's current state.
    const executeStep = () => {
        if (currentStepNumber < transformingGrid.steps.length) {
            setCurrentStateMatrix(makeStep(currentStateMatrix, transformingGrid.steps[currentStepNumber]));
        }
    }

    // When the currentStepNumber changes, execute the new current step
    useEffect(() => {
        executeStep();
    }, [currentStepNumber]);

    const toggleRunning = () => {
        console.log("toggled running");
        const running = !isRunning;
        setIsRunning(running);

        if(running) {
            console.log("clearing and setting new interval");
            if(intervalId) clearInterval(intervalId);
            setIntervalId(setInterval(() => setCurrentStepNumber(p => p + 1), 100));
        } else {
            console.log("clearing interval")
            if(intervalId) clearInterval(intervalId);
        }
    }

    // Cleanup when unmounting
    useEffect(() => {
        return () => {if(intervalId) clearInterval(intervalId)}
    }, []);

    const reset = () => {
        console.log("reset the animation");
        setIsRunning(false);
        if(intervalId) clearInterval(intervalId);
        setCurrentStepNumber(0);
        setCurrentStateMatrix(JSON.parse(JSON.stringify(transformingGrid.initialState)))
    }

    return(
        <div>
            <GridRenderer
                colorMatrix={stateMatrixToColorMatrix(currentStateMatrix)}
                squareSize={squareSize}
                onSquareClick={(x, y) => {console.log(`x: ${x}, y:${y}`)}}
            />
            <button onClick={toggleRunning}>Play/Pause</button>
            <button onClick = {reset}>reset</button>
        </div>
    )
}
