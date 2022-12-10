import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminOutlets from './Outlets/AdminOutlets';
import PrivateOutlets from './Outlets/PrivateOutlets';
import Appoinment from './Pages/Appoinment/Appoinment';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReports from './Pages/Dashboard/MyReports';
import Users from './Pages/Dashboard/Users';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import NavBar from './Shared/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<PrivateOutlets />} >
          <Route path='appointment' element={<Appoinment />} />
          <Route path='dashboard' element={<Dashboard />}>
            <Route index element={<MyAppointments />} />
            <Route path='reports' element={<MyReports />} />
            <Route element={<AdminOutlets />}>
              <Route path='users' element={<Users />} />
            </Route>
          </Route>
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
