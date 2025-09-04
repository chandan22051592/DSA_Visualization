// import logo2 from '../assets/logo2.svg';
// import { Link } from "react-router-dom";

// function Header() {
//     return (
//         <nav className="flex justify-between items-center px-10 py-4 bg-gray-800 shadow-md">
//             <div className="flex items-center space-x-2">
//                 <div className="w-9 h-9 rounded-lg">
//                     <img src={logo2} alt="Logo" className="w-full h-full object-cover" />
//                 </div>
//                 <h1 className="text-xl font-bold">
//                     <span className="text-lime-500">DSA</span> Visualization
//                 </h1>
//             </div>

//             <div className="space-x-6 text-gray-300 font-medium">
//                 <Link to="/" className="hover:text-purple-400">Home</Link>
//                 <Link to="/Array" className="hover:text-purple-400">Array</Link>
//                 <Link to="/Linkedlist" className="hover:text-purple-400">Linked List</Link>
//                 <Link to="/Stack" className="hover:text-purple-400">Stack</Link>
//                 <Link to="/Queue" className="hover:text-purple-400">Queue</Link>
//                 <Link to="/Tree" className="hover:text-purple-400">Tree</Link>
//                 <Link to="/Graph" className="hover:text-purple-400">Graph</Link>
//             </div>
//         </nav>
//     );
// }

// export default Header;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for hamburger
import logo2 from "../assets/logo2.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-gray-800 shadow-md">
      {/* Logo + Title */}
      <div className="flex items-center space-x-2">
        <div className="w-9 h-9 rounded-lg">
          <img src={logo2} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-lg md:text-xl font-bold">
          <span className="text-lime-500">DSA</span> Visualization
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-gray-300 font-medium">
        <Link to="/" className="hover:text-purple-400">Home</Link>
        <Link to="/Array" className="hover:text-purple-400">Array</Link>
        <Link to="/Linkedlist" className="hover:text-purple-400">Linked List</Link>
        <Link to="/Stack" className="hover:text-purple-400">Stack</Link>
        <Link to="/Queue" className="hover:text-purple-400">Queue</Link>
        <Link to="/Tree" className="hover:text-purple-400">Tree</Link>
        <Link to="/Graph" className="hover:text-purple-400">Graph</Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-300 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 shadow-md flex flex-col items-center space-y-4 py-6 text-gray-300 font-medium md:hidden z-50">
          <Link to="/" className="hover:text-purple-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/Array" className="hover:text-purple-400" onClick={() => setIsOpen(false)}>Array</Link>
          <Link to="/Linkedlist" className="hover:text-purple-400" onClick={() => setIsOpen(false)}>Linked List</Link>
          <Link to="/Stack" className="hover:text-purple-400" onClick={() => setIsOpen(false)}>Stack</Link>
          <Link to="/Queue" className="hover:text-purple-400" onClick={() => setIsOpen(false)}>Queue</Link>
          <Link to="/Tree" className="hover:text-purple-400" onClick={() => setIsOpen(false)}>Tree</Link>
          <Link to="/Graph" className="hover:text-purple-400" onClick={() => setIsOpen(false)}>Graph</Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
