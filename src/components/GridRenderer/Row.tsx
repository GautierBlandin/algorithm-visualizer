import {useContext} from 'react';
import Square from "./Square";
import {GridRendererContext} from "./context/grid-renderer.context";
import styled from "styled-components";

export interface RowProps {
    colorRow: string[];
    index: number;
}

interface RowDivInterface {
    squareSize: number;
    colorRow: string[];
    borderColor: string;
}

const RowDiv = styled.div<RowDivInterface>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: ${(props => props.squareSize * props.colorRow.length)}px;
  border-top:  1px solid ${(props) => props.borderColor};
  
  &:last-child{
    border-bottom: 1px solid ${(props) => props.borderColor};
  }
`

export default function Row({colorRow, index}: RowProps){


    const gridRendererContext = useContext(GridRendererContext);
    const borderColor = gridRendererContext.borderColor;
    const colorMatrix = gridRendererContext.colorMatrix;

    const hasBottomBorder = (row: number, col: number) => {
        if (row === colorMatrix.length - 1) {
            return true;
        }
        return col >= colorMatrix[row + 1].length;
    };

    return(
    <RowDiv
        squareSize = {gridRendererContext.squareSize}
        colorRow = {colorRow}
        borderColor = {borderColor}
    >
        {colorRow.map((color, colIndex) => {
            return <Square
                key={colIndex}
                color={color}
                hasRightBorder={colIndex + 1 == colorRow.length}
                hasBottomBorder={hasBottomBorder(index, colIndex)}
                rowIndex={index}
                colIndex={colIndex}
            />
        })}
    </RowDiv>
    )
}
