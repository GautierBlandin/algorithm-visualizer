import Row from "./Row";
import GridRendererProvider from "./context/GridRenderer.provider";
import styled from "styled-components";

export interface GridRendererProps {
    colorMatrix: string[][];
    squareSize: number;
    borderColor?: string;
    animations?: {
        coordinates: {
            row: number,
            col: number,
        }[]
        color: string;
    }
    onSquareClick?: (x: number, y: number) => void;
    onSquareEnter?: (x: number, y: number) => void;
    onSquareMouseDown?: (x: number, y: number) => void;
}

interface GridInterface {
    squareSize: number;
    colorMatrix: string[][];
}

const Grid = styled.div<GridInterface>`
  display: flex;
  flex-direction: column;
  height: ${(props) => props.squareSize * props.colorMatrix.length}px;
  align-items: flex-start;
`

export default function GridRenderer({
    colorMatrix,
    squareSize,
    borderColor = 'black',
    onSquareClick,
    onSquareEnter,
    onSquareMouseDown
}: GridRendererProps){
    return(
        <GridRendererProvider
            squareSize = {squareSize}
            borderColor={borderColor}
            colorMatrix={colorMatrix}
            onSquareClick={onSquareClick}
            onSquareEnter={onSquareEnter}
            onSquareMouseDown={onSquareMouseDown}
        >
            <Grid
                squareSize = {squareSize}
                colorMatrix = {colorMatrix}
            >
                {colorMatrix.map((row, rowIndex) => (
                    <Row key={rowIndex} colorRow={row} index={rowIndex}/>
                ))}
            </Grid>
        </GridRendererProvider>
    )
}
