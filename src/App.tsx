import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Booking from './Pages/Calender';
import RzpCheckout from './Pages/RzpCheckout';
import { useEffect } from 'react'
import { setupFauna } from './api/fauna/setup';
import { client } from './faunadb';
import Data from './Pages/MongoDB/Data';
import Mongodb from './Pages/MongoDB';
import Classes from './Pages/Classes';


function App() {

  // useEffect(() => {
  //   setupFauna(client);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div className='w-full mx-auto h-screen flex items-center justify-center'>

            <div className='flex flex-col gap-2'>
              <ul>
                <li className='text-blue-400 underline'><Link to="/calender">Calender</Link></li>

                {/* <li className='text-blue-400 underline'><Link to="/mongodb">Calender</Link></li> */}
                <li className='text-blue-400 underline'><Link to="/classes">Add/View Classes Mongodb CRUD</Link></li>
              </ul>

            </div>
          </div>
        } />
        <Route path='/rzp-checkout' element={RzpCheckout()} />
        <Route path='/calender' element={<Booking />} />
        {/* <Route path='/mongodb' element={<Mongodb />} /> */}
        <Route path='/classes' element={<Classes />} />


      </Routes>
    </Router>
  );
}

export default App;
