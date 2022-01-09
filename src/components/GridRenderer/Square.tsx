import {useContext} from 'react';
import {GridRendererContext} from "./context/GridRenderer.context";
import gridRendererProvider from "./context/GridRenderer.provider";

export interface SquareProps {
    color: string;
    hasRightBorder?: boolean;
    hasBottomBorder?: boolean;
    rowIndex: number;
    colIndex: number;
}

export default function Square({color, hasRightBorder, hasBottomBorder, rowIndex, colIndex}: SquareProps){
    const gridRendererContext = useContext(GridRendererContext)
    const borderColor = gridRendererContext.borderColor;

    return(
    <div onClick={gridRendererContext.onSquareClick ? (() => {gridRendererContext.onSquareClick!(rowIndex, colIndex)}) : undefined}>
        <style jsx>
            {`
                div {
                background-color: ${color};
                height: 100%;
                flex-grow: 1;
                border-top: 1px solid ${borderColor};
                border-left: 1px solid ${borderColor};
                ${hasRightBorder ? `border-right: 1px solid ${borderColor};` : ''}
                ${hasBottomBorder ? `border-bottom: 1px solid ${borderColor};` : ''}
                ${gridRendererContext.onSquareClick ? `cursor: pointer;` : ''}
                }
                }
            `}
        </style>
    </div>
    )
}

