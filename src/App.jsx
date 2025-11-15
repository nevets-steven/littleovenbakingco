import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ItemRow from './components/ItemRow'
import BundleRow from './components/BundleRow'
import item1Img from './assets/applecidercake.jpeg'
import item2Img from './assets/cookiecake.jpeg'


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
    <ItemRow 
    item={{
      id: 1,
      name: "Apple Cider Cake",
      price: 30.00,
      image: item1Img
    }}
    onQuanityChange={() => {}}/>
    <ItemRow
    item={{
      id: 2,
      name: 'Pumpkin Frosting Cookie Cake',
      price: 25.00,
      image: item2Img
    }}
    />
    <BundleRow 
    title="Thanksgiving Bundle Duo"
    image1={item1Img}
    image2={item2Img}
    price={50}
    onQuanityChange={(qty) => console.log('Bundle qty:' , qty)}
      />
    </>
  )
}

export default App;
