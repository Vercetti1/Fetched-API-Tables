import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Status from './pages/Status.jsx';
import Header from './pages/Header.jsx';

export default function App(){
  return(
    <div>
      <Header />
      <nav>
        <Link to='/' className='mr-4 text-blue-500'>Home</Link>
        <Link to='/status' className='text-blue-500'>Status</Link>

        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/status' element={<Status/>}></Route>
        </Routes>
      </nav>
    </div>
  )
}