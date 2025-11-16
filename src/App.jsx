import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OrderForm from './components/OrderForm'
import ReviewOrder from './components/ReviewOrder'
import OrderSuccess from './components/OrderSuccess'


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
  const GSCRIPT_URL = import.meta.env.VITE_GSCRIPT_ENDPOINT;


  const handleReview = (data) => {
    setOrderData(data);
    setStage('review');
  };

  const handleEdit = () => {
    setStage('form');
  };

  const handleConfirm = async () => {
    console.log('Final Order Confirmed: ', orderData);
    setStage('success')
    // send to google sheets later

    if (!orderData){
      alert('No order data to submit.')
      return;
    }

    try{
      const response = await fetch(GSCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(orderData),
        }
      );
      let result = null;
      try{
        result = await response.json();
        console.log('Google SCript Response: ', result);
      }
      catch{
      }
      if (!response.ok || (result && result.status === 'error')){
        throw new Error(result?.message || 'Non-OK Response from Google App Script');
      }
      setStage('success');
    }
    catch (err){
      console.error('Error submitting order: ', err);
      alert("There was an error submitting your order. Please try again.")
    }
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

    {stage === 'success' && (
      <OrderSuccess 
        onNewOrder={() => {
          setOrderData(null);
          setStage('form');
        }}
      />
    )}
    </>
  )
}

export default App;
