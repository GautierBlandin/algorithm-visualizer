import React, {useContext, useImperativeHandle, useRef, useState} from 'react';
import styled from "styled-components";
import Square, { SquareRef } from "./Square";

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
    initialStateMatrix: number[][];
    stateToColor: (state: number) => string;
    onSquareClick?: (x: number, y: number) => void;
    onSquareMouseDown?: (x: number, y: number) => void;
    onSquareMouseEnter?: (x: number, y: number) => void;
}

export interface GridRef {
    updateSquareState: (row: number, col: number, state: number) => void;
}

const Grid = React.forwardRef<GridRef, GridProps>((({
    initialStateMatrix,
    stateToColor,
    onSquareClick,
    onSquareMouseEnter,
    onSquareMouseDown,
    }, ref) => {
    const rows = initialStateMatrix.length;
    const cols = initialStateMatrix[0].length;

    const refMatrix: React.MutableRefObject<SquareRef | null>[][] = initialStateMatrix.map(row => row.map(state => useRef(null)))

    const updateSquareState = (row: number, col: number, state: number) => {
        if(refMatrix[row][col].current) {
            refMatrix[row][col].current?.updateState(state);
        }
    }

    useImperativeHandle(ref, () => ({updateSquareState}), [])

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
                            initialState={initialStateMatrix[rowIndex][colIndex]}
                            stateToColor={stateToColor}
                            onClick={() => {if(onSquareClick) onSquareClick(rowIndex, colIndex)}}
                            onMouseEnter={() => {if(onSquareMouseEnter) onSquareMouseEnter(rowIndex, colIndex)}}
                            onMouseDown={() => {if(onSquareMouseDown) onSquareMouseDown(rowIndex, colIndex)}}
                            ref={refMatrix[rowIndex][colIndex]}
                        />)}
                </Row>)
            }
        </GridDiv>
    )
}))

export default Grid;
