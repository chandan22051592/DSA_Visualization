// import { useState } from "react";

// export default function LinkedListMethods() {
//   const [list, setList] = useState([1, 2, 3]);
//   const [limit, setLimit] = useState(10);
//   const [searchValue, setSearchValue] = useState("");
//   const [foundIndex, setFoundIndex] = useState(null);

//   // insertion at end
//   const handleInsert = () => {
//     if (list.length >= limit) {
//       alert("Linked List size limit reached. Cannot insert more nodes.");
//       return;
//     }
//     const newNode = list.length + 1;
//     setList([...list, newNode]);
//   };

//   // deletion at end
//   const handleDelete = () => {
//     if (list.length === 0) {
//       alert("Linked List is empty. Nothing to delete.");
//       return;
//     }
//     setList(list.slice(0, -1));
//   };

//   // traversal (just alert values in order)
//   const handleTraversal = () => {
//     if (list.length === 0) {
//       alert("List is empty.");
//       return;
//     }
//     alert("Traversal (Head → Tail): " + list.join(" → "));
//   };

//   // searching
//   const handleSearch = () => {
//     if (searchValue === "") {
//       alert("Enter a value to search.");
//       return;
//     }
//     const index = list.indexOf(Number(searchValue));
//     if (index === -1) {
//       alert(`${searchValue} not present in the list.`);
//       setFoundIndex(null);
//     } else {
//       alert(`${searchValue} found at position ${index + 1} (from head).`);
//       setFoundIndex(index);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
//       {/* Implementation Section */}
//       <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
//         <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-xl text-center mt-15">
//           <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400">
//             ⚡ Demonstration
//           </h1>

//           {/* Show linked list vertically */}
//           <div className="flex flex-col items-center mb-6">
//             {list.length > 0 && (
//               <div className="mb-2 text-blue-400 text-3xl">🔝</div>
//             )}
//             {list.map((item, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div
//                   className={`w-28 h-12 flex items-center justify-center border-2 ${
//                     foundIndex === index
//                       ? "border-green-400 bg-green-300"
//                       : "border-pink-400 bg-pink-300"
//                   } text-black font-bold rounded-md mb-1`}
//                 >
//                   {item}
//                 </div>
//                 {index < list.length - 1 && (
//                   <div className="text-white text-lg mb-1">⬇️</div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Show size */}
//           <p className="mb-8 text-lg md:text-xl">
//             <strong>Size:</strong>{" "}
//             <span className="text-green-400">{list.length}</span>
//           </p>

//           {/* Limit input */}
//           <p className="mb-8 text-lg md:text-xl">
//             <strong>Limit:</strong>{" "}
//             <input
//               type="number"
//               value={limit}
//               onChange={(e) => {
//                 const val = e.target.value;
//                 setLimit(val === "" ? "" : Number(val));
//               }}
//               className="w-20 text-center bg-gray-700 text-white rounded-md ml-2 no-spin"
//             />
//           </p>

//           {/* Search input */}
//           <p className="mb-8 text-lg md:text-xl">
//             <strong>Search:</strong>{" "}
//             <input
//               type="number"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               className="w-24 text-center bg-gray-700 text-white rounded-md ml-2"
//             />
//           </p>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center">
//             <button
//               onClick={handleInsert}
//               className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
//             >
//               ➕ Insert
//             </button>
//             <button
//               onClick={handleDelete}
//               className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
//             >
//               ➖ Delete
//             </button>
//             <button
//               onClick={handleTraversal}
//               className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
//             >
//               🔄 Traverse
//             </button>
//             <button
//               onClick={handleSearch}
//               className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
//             >
//               🔍 Search
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Theory Section */}
//       <section className="bg-gray-900 text-white flex flex-col items-start px-6 md:px-5 py-10">
//         <div className="max-w-2xl">
//           <h1 className="text-2xl md:text-3xl font-bold mb-6 mt-4 md:mt-2">
//             📖 Theory
//           </h1>
//           <ul className="list-disc list-outside pl-6 space-y-4 text-base md:text-lg">
//             <li>
//               A linked list is a linear data structure where elements are stored
//               in <strong>nodes</strong>.
//             </li>
//             <li>
//               Each node has two parts: <strong>data</strong> and a{" "}
//               <strong>pointer</strong> to the next node.
//             </li>
//             <li>
//               The first node is called the <strong>head</strong>, shown with 🔝.
//             </li>
//             <li>
//               <strong>Insertion:</strong> Adds a new node at the end of the list
//               (in this demo).
//             </li>
//             <li>
//               <strong>Deletion:</strong> Removes the last node.
//             </li>
//             <li>
//               <strong>Traversal:</strong> Visits all nodes from head to tail in
//               order.
//             </li>
//             <li>
//               <strong>Searching:</strong> Finds whether a value exists in the
//               list, highlighting it in green if found.
//             </li>
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useState } from "react";

export default function LinkedListMethods() {
  const [list, setList] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [foundIndex, setFoundIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Show message for 3 seconds
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  // Generate next unique value
  const getNextUniqueValue = () => {
    let value = 1;
    while (list.includes(value)) {
      value++;
    }
    return value;
  };

  // Validate and handle limit changes
  const handleLimitChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setLimit("");
      return;
    }
    const num = Number(val);
    if (!isNaN(num) && num > 0 && Number.isInteger(num) && num <= 100) {
      setLimit(num);
    }
  };

  // Insertion at end
  const handleInsert = () => {
    const currentLimit = Number(limit);
    if (!currentLimit || currentLimit <= 0) {
      showMessage("Please set a valid limit (positive integer).", "error");
      return;
    }
    
    if (list.length >= currentLimit) {
      showMessage("Linked List size limit reached. Cannot insert more nodes.", "error");
      return;
    }

    let valueToInsert;
    if (insertValue !== "") {
      const num = Number(insertValue);
      if (isNaN(num) || !Number.isInteger(num)) {
        showMessage("Please enter a valid integer to insert.", "error");
        return;
      }
      valueToInsert = num;
      setInsertValue("");
    } else {
      valueToInsert = getNextUniqueValue();
    }

    setList([...list, valueToInsert]);
    setFoundIndex(null);
    showMessage(`Node ${valueToInsert} inserted successfully!`, "success");
  };

  // Deletion at end
  const handleDelete = () => {
    if (list.length === 0) {
      showMessage("Linked List is empty. Nothing to delete.", "error");
      return;
    }
    const deletedValue = list[list.length - 1];
    setList(list.slice(0, -1));
    setFoundIndex(null);
    showMessage(`Node ${deletedValue} deleted successfully!`, "success");
  };

  // Traversal
  const handleTraversal = () => {
    if (list.length === 0) {
      showMessage("List is empty.", "info");
      return;
    }
    showMessage(`Traversal (Head → Tail): ${list.join(" → ")}`, "info");
  };

  // Searching with validation
  const handleSearch = () => {
    if (searchValue === "") {
      showMessage("Enter a value to search.", "error");
      return;
    }
    
    const numValue = Number(searchValue);
    if (isNaN(numValue) || !Number.isInteger(numValue)) {
      showMessage("Please enter a valid integer to search.", "error");
      return;
    }

    const index = list.indexOf(numValue);
    if (index === -1) {
      showMessage(`${numValue} not found in the list.`, "error");
      setFoundIndex(null);
    } else {
      showMessage(`${numValue} found at position ${index + 1} (from head).`, "success");
      setFoundIndex(index);
    }
  };

  // Clear search highlighting
  const clearSearch = () => {
    setFoundIndex(null);
    setSearchValue("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Implementation Section */}
      <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
        <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
            ⚡ Demonstration
          </h1>

          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${
              messageType === 'error' ? 'bg-red-600 text-white' : 
              messageType === 'success' ? 'bg-green-600 text-white' : 
              'bg-blue-600 text-white'
            }`}>
              {message}
            </div>
          )}

          {/* Show linked list vertically */}
          <div className="flex flex-col items-center mb-6">
            {list.length > 0 && (
              <div className="mb-2 text-blue-400 text-2xl">🔝 HEAD</div>
            )}
            {list.length === 0 ? (
              <div className="text-gray-400 text-lg p-4 border-2 border-dashed border-gray-600 rounded-lg">
                Empty List
              </div>
            ) : (
              list.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-24 h-12 flex items-center justify-center border-2 transition-all duration-300 ${
                      foundIndex === index
                        ? "border-green-400 bg-green-300 shadow-lg scale-105"
                        : "border-pink-400 bg-pink-300"
                    } text-black font-bold rounded-md mb-1`}
                  >
                    {item}
                  </div>
                  {index < list.length - 1 && (
                    <div className="text-white text-lg mb-1">⬇️</div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Show size and limit */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-lg">
              <strong>Size:</strong>{" "}
              <span className="text-green-400 text-xl">{list.length}</span>
            </div>
            <div className="text-lg">
              <strong>Limit:</strong>{" "}
              <input
                type="number"
                value={limit}
                onChange={handleLimitChange}
                min="1"
                max="100"
                className="w-16 text-center bg-gray-700 text-white rounded-md ml-1 border border-gray-600 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Insert section */}
          <div className="mb-6">
            <div className="text-lg mb-2">
              <strong>Insert Value (optional):</strong>
            </div>
            <input
              type="number"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder="Auto-generate if empty"
              className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Search section */}
          <div className="mb-6">
            <div className="text-lg mb-2">
              <strong>Search Value:</strong>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {foundIndex !== null && (
                <button
                  onClick={clearSearch}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleInsert}
              disabled={list.length >= Number(limit)}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ➕ Insert
            </button>
            <button
              onClick={handleDelete}
              disabled={list.length === 0}
              className="px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ➖ Delete
            </button>
            <button
              onClick={handleTraversal}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              🔄 Traverse
            </button>
            <button
              onClick={handleSearch}
              disabled={!searchValue}
              className="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              🔍 Search
            </button>
          </div>
        </div>
      </section>

      {/* Theory Section */}
      <section className="bg-gray-900 text-white flex flex-col items-start px-6 md:px-8 py-10">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            📖 Linked List Theory
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                What is a Linked List?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                A linked list is a linear data structure where elements are stored in <strong>nodes</strong>. 
                Each node contains <strong>data</strong> and a <strong>pointer</strong> to the next node, 
                allowing for dynamic memory allocation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-green-400">
                Key Operations
              </h2>
              <div className="space-y-3 text-gray-300">
                <div>
                  <strong className="text-green-300">Insertion (O(1) at end):</strong>
                  <br />Adds a new node. This demo inserts at the tail for simplicity.
                </div>
                <div>
                  <strong className="text-red-300">Deletion (O(1) at end):</strong>
                  <br />Removes the last node and updates the tail pointer.
                </div>
                <div>
                  <strong className="text-blue-300">Traversal (O(n)):</strong>
                  <br />Visits all nodes from head to tail in sequential order.
                </div>
                <div>
                  <strong className="text-yellow-600">Search (O(n)):</strong>
                  <br />Finds if a value exists, highlighting the found node in green.
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-purple-400">
                Advantages vs Arrays
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Dynamic size:</strong> No need to declare size beforehand</li>
                <li>• <strong>Efficient insertion/deletion:</strong> O(1) at known positions</li>
                <li>• <strong>Memory efficient:</strong> Allocates memory as needed</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-red-400">
                Disadvantages
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>No random access:</strong> Must traverse from head</li>
                <li>• <strong>Extra memory:</strong> Pointer storage overhead</li>
                <li>• <strong>Cache performance:</strong> Non-contiguous memory layout</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
