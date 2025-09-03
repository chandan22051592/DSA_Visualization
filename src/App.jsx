 import './App.css'
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ErrorPage from './components/ErrorPage'
import ArrayMethods from './pages/Array';
import StackMethods from './pages/Stack';
import LinkedListMethods from './pages/Linkedlist';
import QueueMethods from './pages/Queue';
// import GraphMethods from './pages/Graph';  


function App() {

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen">
      
     

      <BrowserRouter>
        <Header/>  
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Array" element={<ArrayMethods />} />
          <Route path="/Linkedlist" element={<LinkedListMethods />} />
          <Route path="/Stack" element={<StackMethods />} />
          <Route path="/Queue" element={<QueueMethods />} />
          <Route path="/Graph" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;

