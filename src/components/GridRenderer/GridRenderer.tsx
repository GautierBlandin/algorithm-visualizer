import React from 'react';
import Row from "./Row";
import GridRendererProvider from "./context/GridRenderer.provider";

export interface GridRendererProps {
    colorMatrix: string[][];
    squareSize: number;
    borderColor?: string;
}

export default function GridRenderer({colorMatrix, squareSize, borderColor = 'black'}: GridRendererProps){
    return(
        <GridRendererProvider squareSize = {squareSize} borderColor={borderColor} colorMatrix={colorMatrix}>
            <div className="grid">
                {colorMatrix.map((row, rowIndex) => (
                    <Row key={rowIndex} colorRow={row} index={rowIndex}/>
                ))}
                <style jsx>
                    {`
                        .grid {
                            display: flex;
                            flex-direction: column;
                            height: ${squareSize * colorMatrix.length}px;
                            align-items: flex-start;
                        }
                    `}
                </style>
            </div>
        </GridRendererProvider>
    )
}
