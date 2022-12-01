import { Route, Routes } from 'react-router-dom';
import './App.css';
import Appoinment from './Pages/Appoinment/Appoinment';
import Home from './Pages/Home/Home';
import NavBar from './Shared/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='appointment' element={<Appoinment />} />
      </Routes>
    </div>
  );
}

export default App;
