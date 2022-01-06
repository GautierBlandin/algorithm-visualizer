import {useContext} from 'react';
import Square from "./Square";
import {GridRendererContext} from "./context/GridRenderer.context";

export interface RowProps {
    colorRow: string[];
    index: number;
}

export default function Row({colorRow, index}: RowProps){
    const gridRendererContext = useContext(GridRendererContext);
    const colorMatrix = gridRendererContext.colorMatrix;

    const hasBottomBorder = (row: number, col: number) => {
        if (row === colorMatrix.length - 1) {
            return true;
        }
        return col >= colorMatrix[row + 1].length;
    };

    return(
    <div className={`row${index}`}>
        {colorRow.map((color, colIndex) => {
            return <Square
                key={colIndex}
                color={color}
                hasRightBorder={colIndex + 1 == colorRow.length}
                hasBottomBorder={hasBottomBorder(index, colIndex)}
            />
        })}
        <style>
            {`
                .row${index} {
                    display: flex;
                    flex-direction: row;
                    flex-grow: 1;
                    width: ${gridRendererContext.squareSize * colorRow.length}px;
                }
            `}
        </style>
    </div>
    )
}
