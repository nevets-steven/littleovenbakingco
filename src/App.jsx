import { useState } from 'react'
import reactLogo from './assets/react.svg'
import item1Img from "./assets/applecidercake.jpeg"
import item2Img from "./assets/cookiecake.jpeg"
import viteLogo from '/vite.svg'
import './App.css'
import ItemCard from '../components/ItemCard'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

function App(){
  return(
    <>
    <ItemCard 
    id="item1"
    name="Apple Cider Cake"
    price={35}
    imageURL={item1Img}/>
    <ItemCard 
    id="item2"
    name="Cookie Cake"
    price={25}
    imageURL={item2Img}/>
    </>
  )
}

export default App
