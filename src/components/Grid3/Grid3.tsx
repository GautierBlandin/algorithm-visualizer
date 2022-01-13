import React, {useContext, useRef, useState} from 'react';
import styled from "styled-components";
import Square from "./Square";

export interface GridProps {
    stateMatrix: React.MutableRefObject<number>[][];
    stateToColor: (state: number) => string;
    rows: number;
    cols: number;
    onSquareClick?: (x: number, y: number) => void;
    onSquareMouseDown?: (x: number, y: number) => void;
    onSquareMouseEnter?: (x: number, y: number) => void;
}

interface GridDivInterface{
    rows: number;
    cols: number;
}

const GridDiv = styled.div<GridDivInterface> `
  display: flex;
  flex-direction: column;
  width: ${props => props.cols * 20}px;
  height: ${props => props.rows * 20}px;
`

const Row = styled.div`
  flex-grow: 1;
  display: flex;
  border-top: 1px solid black;
  &:last-child {
    border-bottom: 1px solid black;
  }
`

export default function Grid({
                                 rows,
                                 cols,
                                 stateMatrix,
                                 stateToColor,
                                 onSquareClick,
                                 onSquareMouseEnter,
                                 onSquareMouseDown,
                             }: GridProps){

    return(
        <GridDiv
            rows = {rows}
            cols = {cols}
        >
            {
                stateMatrix.map((_, rowIndex) => <Row key = {rowIndex}>
                    {stateMatrix[rowIndex].map((_, colIndex) =>
                        <Square
                            key={rowIndex * cols + colIndex}
                            state={stateMatrix[rowIndex][colIndex]}
                            stateToColor={stateToColor}
                            onClick={() => {if(onSquareClick) onSquareClick(rowIndex, colIndex)}}
                            onMouseEnter={() => {if(onSquareMouseEnter) onSquareMouseEnter(rowIndex, colIndex)}}
                            onMouseDown={() => {if(onSquareMouseDown) onSquareMouseDown(rowIndex, colIndex)}}
                        />)}
                </Row>)
            }
        </GridDiv>
    )
}
