import {useEffect, useState} from 'react';
import {TransformingGrid} from "./TransformingGridRenderer/transforming-grid-renderer.interface";
import {explorationResultToTransformingGrid, renderingStateToColor} from "./grid-rendering-adapter.interface";
import TransformingGridRenderer from "./TransformingGridRenderer/TransformingGridRenderer";
import {Algorithms, generateEmptyGrid} from "../grid-exploration/grid.interface";
import {exploreGrid} from "../grid-exploration/grid-explorer";

export interface BfsVisualizerProps {
}

export default function BfsVisualizer({}: BfsVisualizerProps){
    const [transformingGrid, setTransformGrid] = useState<TransformingGrid|undefined>(undefined)



    useEffect(() => {
        console.log('loading')
        const emptyGrid = generateEmptyGrid(8, 12);
        for (let i = 0; i < 7; i++){
            emptyGrid[i][2] = 1;
        }
        for (let  i = 0; i < 6; i++){
            emptyGrid[6][11 - i] = 1;
        }
        for (let i = 0; i < 5; i++){
            emptyGrid[i][6] = 1;
        }
        const explorationResult = exploreGrid({request: {grid: emptyGrid, start: {x:0, y:0}, target: {x: 0, y: 1}}, algorithm: Algorithms.DFS})
        setTransformGrid(explorationResultToTransformingGrid(explorationResult));
        console.log('here')
    }, []);

    return (
        <div>
            {transformingGrid && <TransformingGridRenderer transformingGrid={transformingGrid} stateColorInterpreter={renderingStateToColor}/>}
        </div>
    )
}
