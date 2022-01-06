import {useEffect, useState} from 'react';
import {TransformingGrid} from "../types/transforming-grid";
import {BFS, generateEmptyGrid} from "../algorithms/grid-bfs";
import {GridObserver} from "../algorithms/grid-observer";
import TransformingGridRenderer from "./TransformingGridRenderer/TransformingGridRenderer";

export interface BfsVisualizerProps {
}

export default function BfsVisualizer({}: BfsVisualizerProps){
    const [transformingGrid, setTransformGrid] = useState<TransformingGrid|undefined>(undefined)

    const stateToColor = (state: number): string => {
        switch (state) {
            case 0:
                return '#fff';
            case 1:
                return '#5c5b54';
            case 2:
                return '#00a619';
            case 3:
                return '#f1d416';
            case 4:
                return '#1beab9';
            case 5:
                return '#053375';
            case 6:
                return '#a82605';
            default:
                return '#fff';
        }
    }

    useEffect(() => {
        console.log('loading')
        const emptyGrid = generateEmptyGrid(8, 12);
        const observer = new GridObserver();
        BFS(emptyGrid, {x: 0, y: 0}, {x: 5, y: 5}, observer);
        setTransformGrid(observer.getTransformingGrid());
        console.log('here')
    }, []);

    return (
        <div>
            {transformingGrid && <TransformingGridRenderer transformingGrid={transformingGrid} stateColorInterpreter={stateToColor}/>}
        </div>
    )
}
