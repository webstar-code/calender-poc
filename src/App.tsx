import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Booking from './Pages/Calender';
import RzpCheckout from './Pages/RzpCheckout';
import { useEffect } from 'react'
import { setupFauna } from './api/fauna/setup';
import { client } from './faunadb';


function App() {

  useEffect(() => {
    setupFauna(client);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<p>Home Page</p>} />
        <Route path='/rzp-checkout' element={RzpCheckout()} />
        <Route path='/calender' element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
