import React from 'react';
import { GridRendererContext } from "./GridRenderer.context";

export interface GridRendererProviderProps{
    squareSize: number;
    borderColor: string;
    colorMatrix: string[][];
}

export const GridRendererProvider: React.FC<GridRendererProviderProps> = ({
      children,
      squareSize,
      borderColor,
      colorMatrix
}) => {
    return(
        <GridRendererContext.Provider value = {{
            squareSize,
            borderColor,
            colorMatrix,
        }}>
            {children}
        </GridRendererContext.Provider>
    )
}

export default GridRendererProvider;
