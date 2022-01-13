import React, {useContext, useRef, useState} from 'react';
import styled from "styled-components";
import Square from "./Square";



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

export interface GridProps {
    stateMatrix: number[][];
    stateToColor: (state: number) => string;
    onSquareClick?: (x: number, y: number) => void;
    onSquareMouseDown?: (x: number, y: number) => void;
    onSquareMouseEnter?: (x: number, y: number) => void;
}

export default function Grid({
    stateMatrix,
    stateToColor,
    onSquareClick,
    onSquareMouseEnter,
    onSquareMouseDown,
}: GridProps){
    const rows = stateMatrix.length;
    const cols = stateMatrix[0].length;

    return(
            <GridDiv // Styled component
                rows = {rows}
                cols = {cols}
            >
                {
                    Array.from({length: rows}).map((_, rowIndex) => <Row key={rowIndex}>
                        {Array.from({length: cols}).map((_, colIndex) =>
                            <Square
                            key={rowIndex * rows + colIndex}
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
