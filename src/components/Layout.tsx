import { Outlet } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';
import { Toaster } from './ui/Toaster';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;