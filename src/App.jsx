  import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ErrorPage from './components/ErrorPage'
// import Stack from './components/Stack'
// import Queue from './components/Queue'
// import Graph from './components/Graph'  
function App() {

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen">
      
      <Header/>
      
      <Hero/> 
      <Footer/>

    </div>
  );
}

export default App

//   < Routes >
          
//           <Route path="/" element={<Hero />} />
//           <Route path="/Array" element={<ErrorPage />} />
//           <Route path="/Stack" element={<ErrorPage />} />
//           <Route path="/Queue" element={<ErrorPage />} />
//           <Route path="/Graph" element={<ErrorPage />} />
//           <Route path="*" element={<ErrorPage />} /> 
// </Routes > 