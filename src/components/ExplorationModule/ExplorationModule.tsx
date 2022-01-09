import React, {useState} from 'react';
import {SquareState} from "./exploration-module.interface";
import GridGenerator from "../GridGenerator/GridGenerator";
import {GridGenerationResult} from "../GridGenerator/grid-generator.interface";

export interface ExplorationModuleProps {
    stateToColor: (state: SquareState) => string;
}

export default function ExplorationModule({stateToColor}: ExplorationModuleProps){
    const [generatorMode, setGeneratorMode] = useState<boolean>(false);

    const getGenerationResult = (result: GridGenerationResult) => {
        console.log(result);
    }

    return(
    <div>
        <GridGenerator
            stateToColorInterpreter= {stateToColor}
            getGenerationResult = {getGenerationResult}
            squareSize={40}
        />
    </div>
    )
}
