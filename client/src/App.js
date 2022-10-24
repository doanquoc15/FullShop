import './App.css';
import Announcement from './components/Announcement';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom'
import NewsLetter from './components/NewsLetter';


function App() {
  return (
    <>
      <Navbar />
      <Announcement />
      <Outlet />
      <NewsLetter />
      <Footer />
    </>
  )
}

export default App;
