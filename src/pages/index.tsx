import type { NextPage } from 'next'
import ExplorationModule from "../components/ExplorationModule/ExplorationModule";

const Home: NextPage = () => {
  return (
    <div className={"test"}>
      <ExplorationModule />
        <style jsx>
            {
                `
                .test {
                    display: flex;
                    justify-content: center;
                }
                `
            }
        </style>
    </div>
  )
}

export default Home
