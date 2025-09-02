import logo2 from '../assets/logo2.svg';
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="flex justify-between items-center px-10 py-4 bg-gray-800 shadow-md">
            <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg">
                    <img src={logo2} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl font-bold">
                    <span className="text-lime-500">DSA</span> Visualization
                </h1>
            </div>

            <div className="space-x-6 text-gray-300 font-medium">
                <Link to="/" className="hover:text-purple-400">Home</Link>
                <Link to="/Array" className="hover:text-purple-400">Array</Link>
                <Link to="/Linkedlist" className="hover:text-purple-400">Linked List</Link>
                <Link to="/Stack" className="hover:text-purple-400">Stack</Link>
                <Link to="/Queue" className="hover:text-purple-400">Queue</Link>
                <Link to="/Tree" className="hover:text-purple-400">Tree</Link>
                <Link to="/Graph" className="hover:text-purple-400">Graph</Link>
            </div>
        </nav>
    );
}

export default Header;




// import logo2 from '../assets/logo2.svg';
// import { Link } from "react-router-dom";
// import ErrorPage from './ErrorPage';

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
//                 <a href="/" className="hover:text-purple-400">Home</a>
//                 <a href="/ErrorPage" className="hover:text-purple-400">Array</a>
//                 <a href="/Linkedlist" className="hover:text-purple-400">Linked List</a>
//                 <a href="/Stack" className="hover:text-purple-400">Stack</a>
//                 <a href="/Queue" className="hover:text-purple-400">Queue</a>
//                 <a href="/Tree" className="hover:text-purple-400">Tree</a>
//                 <a href="/Graph" className="hover:text-purple-400">Graph</a>

                
//                 {/* <Link to="/" className="hover:text-purple-400">Home</Link>
//                 <Link to="/ErrorPage" className="hover:text-purple-400">Array</Link>
//                 <Link to="/Linkedlist" className="hover:text-purple-400">Linked List</Link>
//                 <Link to="/Stack" className="hover:text-purple-400">Stack</Link>
//                 <Link to="/Queue" className="hover:text-purple-400">Queue</Link>
//                 <Link to="/Tree" className="hover:text-purple-400">Tree</Link>
//                 <Link to="/Graph" className="hover:text-purple-400">Graph</Link> */}
//             </div>
//         </nav>
//     );
// }

// export default Header;
