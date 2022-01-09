import React, { createContext } from 'react';

export interface GridRendererContextInterface {
    squareSize: number;
    borderColor: string;
    colorMatrix: string[][];
    onSquareClick?: (x: number, y: number) => void;
    onSquareEnter?: (x: number, y: number) => void;
    onSquareMouseDown?: (x: number, y: number) => void;
}

const defaultValues: GridRendererContextInterface = {
    squareSize: 30,
    borderColor: 'grey',
    colorMatrix: [],
}

export const GridRendererContext = createContext<GridRendererContextInterface>(defaultValues);
