import React from 'react';
import { GridRendererContext } from "./GridRenderer.context";

export interface GridRendererProviderProps{
    squareSize: number;
    borderColor: string;
    colorMatrix: string[][];
    onSquareClick?: (x: number, y: number) => void;
    onSquareEnter?: (x: number, y: number) => void;
    onSquareMouseDown?: (x: number, y: number) => void;
}

export const GridRendererProvider: React.FC<GridRendererProviderProps> = ({
                                                                              children,
                                                                              squareSize,
                                                                              borderColor,
                                                                              colorMatrix,
                                                                              onSquareClick,
                                                                              onSquareEnter,
                                                                              onSquareMouseDown
}) => {
    return(
        <GridRendererContext.Provider value = {{
            squareSize,
            borderColor,
            colorMatrix,
            onSquareClick,
            onSquareEnter,
            onSquareMouseDown,
        }}>
            {children}
        </GridRendererContext.Provider>
    )
}

export default GridRendererProvider;
