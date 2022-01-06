import React, { createContext } from 'react';

export interface GridRendererContextInterface {
    squareSize: number;
    borderColor: string;
    colorMatrix: string[][];
}

const defaultValues: GridRendererContextInterface = {
    squareSize: 30,
    borderColor: 'grey',
    colorMatrix: [],
}

export const GridRendererContext = createContext<GridRendererContextInterface>(defaultValues);
