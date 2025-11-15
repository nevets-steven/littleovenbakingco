import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OrderForm from './components/OrderForm'
import ReviewOrder from './components/ReviewOrder'


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
  const [stage, setStage] = useState('form');
  const [orderData, setOrderData] = useState(null);

  const handleReview = (data) => {
    setOrderData(data);
    setStage('review');
  };

  const handleEdit = () => {
    setStage('form');
  };

  const handleConfirm = () => {
    console.log('Final Order Confirmed: ', orderData);
    alert('Order Submitted! (Currently just logged in console)')
    // send to google sheets later
  }
  return(
    <>
    {stage === "form" && <OrderForm onReview={handleReview} />}
    {stage === 'review' && orderData && (
      <ReviewOrder
      data={orderData}
      onEdit={handleEdit}
      onConfirm={handleConfirm} />
    )}
    </>
  )
}

export default App;
