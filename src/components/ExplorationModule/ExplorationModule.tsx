import React, {useEffect, useState} from 'react';
import MazeMaker from "../MazeMaker/MazeMaker";
import {MazeMakingResult, MazeNodeState} from "../MazeMaker/maze-maker.interface";
import TransformingGridRenderer from "../TransformingGridRenderer/TransformingGridRenderer";
import {Algorithms, CellState, ExternalGridExplorationRequest} from "../../grid-exploration/grid-explorer.interfaces";
import {TransformingGrid} from "../TransformingGridRenderer/transforming-grid-renderer.interface";
import {explorationResultToTransformingGrid} from "./grid-explorer-transforming-grid.adapter";
import {exploreGrid} from "../../grid-exploration/grid-explorer";
import {renderingStateToColor, mazeStateToColor} from "./exploration-module.coloring";

export interface ExplorationModuleProps {
}

export default function ExplorationModule({
}: ExplorationModuleProps){
    const [generatorMode, setGeneratorMode] = useState<boolean>(true);
    const [generatedGrid, setGeneratedGrid] = useState<MazeMakingResult | undefined>(undefined)
    const [explorationAlgorithm, setExplorationAlgorithm] = useState<Algorithms>(Algorithms.BFS);
    const [transformingGrid, setTransformingGrid] = useState<TransformingGrid | undefined>(undefined);

    const getGenerationResult = (result: MazeMakingResult) => {
        setGeneratedGrid(result);
    }

    function mazeStateToCellState(squareState: MazeNodeState): CellState {
        switch(squareState){
            case MazeNodeState.BLOCKED:
                return CellState.BLOCKED
            case MazeNodeState.TARGET:
                return CellState.TARGET
            default:
                return CellState.EMPTY
        }
    }

    function generateExplorationRequest(algorithm: Algorithms, gridGenerationResult: MazeMakingResult): ExternalGridExplorationRequest {
        return {
            algorithm: explorationAlgorithm,
            request : {
                start: {x: gridGenerationResult.start.row, y: gridGenerationResult.start.col},
                target: {x: gridGenerationResult.target.row, y: gridGenerationResult.target.col},
                grid: gridGenerationResult.grid.map(row => row.map(mazeStateToCellState))
            }
        }
    }

    useEffect(() => {
        if(generatorMode){
            setTransformingGrid(undefined);
        }
        if(!generatorMode && generatedGrid) {
            const externalExplorationRequest = generateExplorationRequest(explorationAlgorithm, generatedGrid);
            const explorationResult = exploreGrid(externalExplorationRequest);
            const transformingGrid = explorationResultToTransformingGrid(explorationResult);
            setTransformingGrid(transformingGrid);
        }
    }, [generatorMode]);

    return(
    <div>
        <button onClick={() => {setGeneratorMode(!generatorMode)}}>Toggle generation mode</button>
        { generatorMode && <button onClick={() => {setExplorationAlgorithm(Algorithms.BFS)}}>BFS</button> }
        { generatorMode && <button onClick={() => {setExplorationAlgorithm(Algorithms.DFS)}}>DFS</button> }
        { generatorMode && <MazeMaker
            stateToColorInterpreter= {mazeStateToColor}
            getGenerationResult = {getGenerationResult}
            squareSize={30}
            initialValues={generatedGrid}
        /> }
        {
            (transformingGrid && !generatorMode) && <TransformingGridRenderer
            transformingGrid={transformingGrid}
            stateColorInterpreter={renderingStateToColor}
            squareSize={30}
            />
        }
    </div>
    )
}
