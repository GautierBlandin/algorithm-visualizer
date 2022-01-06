import type {NextPage} from 'next'
import {TransformingGrid} from "../types/transforming-grid";
import TransformingGridRenderer from "../components/TransformingGridRenderer/TransformingGridRenderer";



const Home: NextPage = () => {
    const stateToColor = (state: number): string => {
        switch (state) {
            case 0:
                return '#fff';
            case 1:
                return '#ebcf34';
            case 2:
                return '#5c5b54';
            case 3:
                return '#33e014';
            case 4:
                return '#00570d';
            case 5:
                return '#00a619';
            case 6:
                return '#a82605';
            default:
                return '#fff';
        }
    }

    const myGrid: number[][] = [[3, 3, 3, 6], [4, 3, 4, 5], [2, 3, 2, 5], [0, 1, 2, 6]];
    const step1 = [{newSquareState: 5, row: 0, col: 0}]
    const step2 = [{newSquareState: 6, row: 0, col: 0}]

    const transformingGrid: TransformingGrid = {
        initialState: myGrid,
        steps: [{transformations: step1}, {transformations: step2}]
    }

  return (
    <div className="container">
        <TransformingGridRenderer transformingGrid={transformingGrid} stateColorInterpreter={stateToColor}/>
      <style jsx>
        {
          `
             
          `
        }
      </style>
    </div>
  )
}

export default Home
