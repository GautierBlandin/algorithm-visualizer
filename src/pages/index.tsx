import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import BfsVisualizer from "../components/BfsVisualizer";
import ExplorationModule from "../components/ExplorationModule/ExplorationModule";
import {SquareState} from "../components/ExplorationModule/exploration-module.interface";

const Home: NextPage = () => {
    const stateToColor = (state: SquareState) => {
        switch(state){
            case SquareState.EMPTY:
                return '#fff';
            case SquareState.BLOCKED:
                return '#5c5b54';
            case SquareState.START:
                return '#1beab9';
            case SquareState.TARGET:
                return '#053375';
        }
    }

  return (
    <div>
      <ExplorationModule
          stateToColor={stateToColor}
      />
    </div>
  )
}

export default Home
