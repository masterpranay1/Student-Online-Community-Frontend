import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthPage = () => {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<Login admin />} />
        </Routes>
        <Footer />
    </>
  );
};

export default AuthPage;
