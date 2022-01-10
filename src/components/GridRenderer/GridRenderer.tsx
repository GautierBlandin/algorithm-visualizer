import Row from "./Row";
import GridRendererProvider from "./context/GridRenderer.provider";

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
