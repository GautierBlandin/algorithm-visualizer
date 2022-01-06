import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import BfsVisualizer from "../components/BfsVisualizer";

const Home: NextPage = () => {
  return (
    <div>
      <BfsVisualizer/>
    </div>
  )
}

export default Home
