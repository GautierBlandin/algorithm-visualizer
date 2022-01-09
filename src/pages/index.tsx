import type { NextPage } from 'next'
import ExplorationModule from "../components/ExplorationModule/ExplorationModule";
import {MazeNodeState} from "../components/MazeMaker/maze-maker.interface";
import {renderingStateToColor} from "../components/ExplorationModule/exploration-module.coloring";

const Home: NextPage = () => {
  return (
    <div>
      <ExplorationModule />
    </div>
  )
}

export default Home
