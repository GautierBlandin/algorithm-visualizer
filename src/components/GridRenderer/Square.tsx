import {useContext, useEffect, useState} from 'react';
import {GridRendererContext} from "./context/grid-renderer.context";
import gridRendererProvider from "./context/GridRenderer.provider";
import AnimatedSquare from "../AnimatedSquare/AnimatedSquare";
import styled from "styled-components";

export interface SquareProps {
    color: string;
    hasRightBorder?: boolean;
    hasBottomBorder?: boolean;
    rowIndex: number;
    colIndex: number;
}

interface SquareDivInterface {
    backgroundColor: string;
    borderColor: string;
}

const SquareDiv = styled.div<SquareDivInterface>`
  background-color: ${(props) => props.backgroundColor};
  height: 100%;
  flex-grow: 1;
  border-left: 1px solid ${(props) => props.borderColor};
  
  &:last-child {
    border-right: 1px solid ${(props) => props.borderColor};
  }
`

export default function Square({color, hasRightBorder, hasBottomBorder, rowIndex, colIndex}: SquareProps){
    const gridRendererContext = useContext(GridRendererContext)
    const borderColor = gridRendererContext.borderColor;

    const [currentColor, setCurrentColor] = useState<string>(color);
    const [nextColor, setNextColor] = useState<string | undefined>(undefined);

    const animationDurationMs = 500;

    useEffect(() => {
        if(nextColor){
            setCurrentColor(nextColor);
            setNextColor(color);
        } else {
            setNextColor(color);
        }
    }, [color])


    return(
    <SquareDiv
        backgroundColor = {color}
        borderColor = {borderColor}
        onClick={gridRendererContext.onSquareClick ? (() => {gridRendererContext.onSquareClick!(rowIndex, colIndex)}) : undefined}
        onMouseEnter={gridRendererContext.onSquareEnter ? (() => {gridRendererContext.onSquareEnter!(rowIndex, colIndex)}) : undefined}
        onMouseDown={gridRendererContext.onSquareMouseDown ? (() => {gridRendererContext.onSquareMouseDown!(rowIndex, colIndex)}) : undefined}
    >
        {/*<AnimatedSquare color={color}/>*/}
    </SquareDiv>
    )
}

