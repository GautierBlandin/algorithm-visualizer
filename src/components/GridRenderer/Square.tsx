import {useContext, useEffect, useState} from 'react';
import {GridRendererContext} from "./context/grid-renderer.context";
import gridRendererProvider from "./context/GridRenderer.provider";
import AnimatedSquare from "../AnimatedSquare/AnimatedSquare";

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
    <div
        onClick={gridRendererContext.onSquareClick ? (() => {gridRendererContext.onSquareClick!(rowIndex, colIndex)}) : undefined}
        onMouseEnter={gridRendererContext.onSquareEnter ? (() => {gridRendererContext.onSquareEnter!(rowIndex, colIndex)}) : undefined}
        onMouseDown={gridRendererContext.onSquareMouseDown ? (() => {gridRendererContext.onSquareMouseDown!(rowIndex, colIndex)}) : undefined}
    >
        {/*<AnimatedSquare color={color}/>*/}
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
                    ${gridRendererContext.onSquareClick || 
                        gridRendererContext.onSquareEnter || 
                         gridRendererContext.onSquareMouseDown
                    ? `cursor: pointer;` : ''}
                }
            `}
        </style>
    </div>
    )
}

