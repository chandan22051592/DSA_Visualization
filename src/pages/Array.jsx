import { useState } from "react";

export default function ArrayMethods() {
  const [arr, setArr] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(5);
  const [pushValue, setPushValue] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
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
    while (arr.includes(value)) {
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
    if (!isNaN(num) && num > 0 && Number.isInteger(num) && num <= 60) {
      if (num < arr.length) {
        showMessage(`Limit must be at least ${arr.length} (current array size).`, "error");
        return;
      }
      setLimit(num);
    }
  };

  // Push new item with validation
  const handlePush = () => {
    const currentLimit = Number(limit);
    if (!currentLimit || currentLimit <= 0) {
      showMessage("Please set a valid limit (1-60).", "error");
      return;
    }

    if (currentLimit < arr.length) {
      showMessage(`Limit should be at least ${arr.length} (current array size).`, "error");
      return;
    }

    if (currentLimit > 60) {
      showMessage("Array limit must be 60 or less.", "error");
      return;
    }

    if (arr.length >= currentLimit) {
      showMessage("Array size limit reached. Cannot push more items.", "error");
      return;
    }

    let valueToPush;
    if (pushValue !== "") {
      const num = Number(pushValue);
      if (isNaN(num) || !Number.isInteger(num)) {
        showMessage("Please enter a valid integer to push.", "error");
        return;
      }
      valueToPush = num;
      setPushValue("");
    } else {
      valueToPush = getNextUniqueValue();
    }

    setArr([...arr, valueToPush]);
    setFoundIndex(null);
    showMessage(`Value ${valueToPush} pushed successfully! New size: ${arr.length + 1}`, "success");
  };

  // Pop last item with validation
  const handlePop = () => {
    const currentLimit = Number(limit);
    if (currentLimit < arr.length) {
      showMessage(`Limit should be at least ${arr.length} (current array size).`, "error");
      return;
    }

    if (arr.length === 0) {
      showMessage("Array is empty. Cannot pop items.", "error");
      return;
    }

    const poppedValue = arr[arr.length - 1];
    setArr(arr.slice(0, -1));
    setFoundIndex(null);
    showMessage(`Value ${poppedValue} popped successfully! New size: ${arr.length - 1}`, "success");
  };

  // Insert at specific index
  const handleInsert = () => {
    if (insertIndex === "" || insertValue === "") {
      showMessage("Please enter both index and value to insert.", "error");
      return;
    }

    const index = Number(insertIndex);
    const value = Number(insertValue);

    if (isNaN(index) || !Number.isInteger(index) || index < 0 || index > arr.length) {
      showMessage(`Index must be between 0 and ${arr.length}.`, "error");
      return;
    }

    if (isNaN(value) || !Number.isInteger(value)) {
      showMessage("Please enter a valid integer value.", "error");
      return;
    }

    if (arr.length >= Number(limit)) {
      showMessage("Array size limit reached. Cannot insert more items.", "error");
      return;
    }

    const newArr = [...arr];
    newArr.splice(index, 0, value);
    setArr(newArr);
    setInsertIndex("");
    setInsertValue("");
    setFoundIndex(null);
    showMessage(`Value ${value} inserted at index ${index} successfully!`, "success");
  };

  // Delete at specific index
  const handleDeleteAt = () => {
    if (insertIndex === "") {
      showMessage("Please enter an index to delete.", "error");
      return;
    }

    const index = Number(insertIndex);

    if (isNaN(index) || !Number.isInteger(index) || index < 0 || index >= arr.length) {
      showMessage(`Index must be between 0 and ${arr.length - 1}.`, "error");
      return;
    }

    if (arr.length === 0) {
      showMessage("Array is empty. Cannot delete items.", "error");
      return;
    }

    const deletedValue = arr[index];
    const newArr = [...arr];
    newArr.splice(index, 1);
    setArr(newArr);
    setInsertIndex("");
    setFoundIndex(null);
    showMessage(`Value ${deletedValue} deleted from index ${index} successfully!`, "success");
  };

  // Search for value
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

    const index = arr.indexOf(numValue);
    if (index === -1) {
      showMessage(`Value ${numValue} not found in the array.`, "error");
      setFoundIndex(null);
    } else {
      showMessage(`Value ${numValue} found at index ${index}!`, "success");
      setFoundIndex(index);
    }
  };

  // Clear search highlighting
  const clearSearch = () => {
    setFoundIndex(null);
    setSearchValue("");
  };

  // Clear entire array
  const handleClear = () => {
    if (arr.length === 0) {
      showMessage("Array is already empty.", "info");
      return;
    }
    setArr([]);
    setFoundIndex(null);
    showMessage("Array cleared successfully!", "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Implementation Section */}
      <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
        <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
            ⚡ Array Demonstration
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

          {/* Array Visualization */}
          <div className="mb-6">
            <div className="text-lg mb-3 text-purple-400 font-semibold">
              Array Elements (Index-based access)
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600 min-h-[120px] flex items-center justify-center">
              {arr.length === 0 ? (
                <div className="text-gray-400 text-lg">
                  Empty Array []
                </div>
              ) : (
                <div className="overflow-x-auto w-full">
                  <div className="flex gap-2 justify-center items-center min-w-max px-4">
                    <span className="text-purple-300 font-bold text-lg">[</span>
                    {arr.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="text-xs text-gray-400 mb-1">
                          {index}
                        </div>
                        <div
                          className={`w-16 h-12 flex items-center justify-center border-2 rounded-md font-bold text-sm transition-all duration-300 ${
                            foundIndex === index
                              ? "border-green-400 bg-green-300 text-black shadow-lg scale-110"
                              : "border-purple-400 bg-purple-300 text-black"
                          }`}
                        >
                          {item}
                        </div>
                        {index < arr.length - 1 && (
                          <div className="text-purple-300 font-bold text-lg mt-2">,</div>
                        )}
                      </div>
                    ))}
                    <span className="text-purple-300 font-bold text-lg">]</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Array Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-lg">
              <strong>Size:</strong>{" "}
              <span className="text-green-400 text-xl">{arr.length}</span>
            </div>
            <div className="text-lg">
              <strong>Limit:</strong>{" "}
              <input
                type="number"
                value={limit}
                onChange={handleLimitChange}
                min={arr.length}
                max="60"
                className="w-16 text-center bg-gray-700 text-white rounded-md ml-1 border border-gray-600 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Push Value */}
            <div>
              <label className="block text-sm font-medium mb-1">Push Value:</label>
              <input
                type="number"
                value={pushValue}
                onChange={(e) => setPushValue(e.target.value)}
                placeholder="Auto if empty"
                className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handlePush()}
              />
            </div>

            {/* Search Value */}
            <div>
              <label className="block text-sm font-medium mb-1">Search Value:</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                {foundIndex !== null && (
                  <button
                    onClick={clearSearch}
                    className="px-2 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Insert Index */}
            <div>
              <label className="block text-sm font-medium mb-1">Index (0-{arr.length}):</label>
              <input
                type="number"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
                min="0"
                max={arr.length}
                className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
              />
            </div>

            {/* Insert Value */}
            <div>
              <label className="block text-sm font-medium mb-1">Insert Value:</label>
              <input
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
                className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
              />
            </div>
          </div>

          {/* Operation Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            <button
              onClick={handlePush}
              disabled={arr.length >= Number(limit)}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ➕ Push
            </button>
            <button
              onClick={handlePop}
              disabled={arr.length === 0}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ➖ Pop
            </button>
            <button
              onClick={handleSearch}
              disabled={!searchValue}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              🔍 Search
            </button>
            <button
              onClick={handleInsert}
              disabled={!insertIndex || !insertValue || arr.length >= Number(limit)}
              className="px-3 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              📍 Insert At
            </button>
            <button
              onClick={handleDeleteAt}
              disabled={!insertIndex || arr.length === 0}
              className="px-3 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              🗑️ Delete At
            </button>
            <button
              onClick={handleClear}
              disabled={arr.length === 0}
              className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              🧹 Clear
            </button>
          </div>
        </div>
      </section>

      {/* Theory Section */}
      <section className="bg-gray-900 text-white flex flex-col items-start px-6 md:px-8 py-10">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            📊 Array Theory
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                What is an Array?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                An array is a <strong>linear data structure</strong> that stores a collection of elements 
                in <strong>contiguous memory locations</strong>. Each element can be accessed directly 
                using its <strong>index</strong> (starting from 0).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-green-400">
                Key Properties
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Fixed size:</strong> Size is typically determined at creation</li>
                <li>• <strong>Same data type:</strong> All elements are usually the same type</li>
                <li>• <strong>Zero-based indexing:</strong> First element is at index 0</li>
                <li>• <strong>Random access:</strong> O(1) access time to any element</li>
                <li>• <strong>Contiguous memory:</strong> Elements stored in adjacent memory locations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-purple-400">
                Array Operations & Time Complexity
              </h2>
              <div className="space-y-3 text-gray-300">
                <div>
                  <strong className="text-green-300">Access by index (O(1)):</strong>
                  <br />Direct access to any element using its index position.
                </div>
                <div>
                  <strong className="text-blue-300">Search (O(n)):</strong>
                  <br />Linear search through elements to find a specific value.
                </div>
                <div>
                  <strong className="text-purple-300">Insert at end (O(1)):</strong>
                  <br />Add element to the end if space is available.
                </div>
                <div>
                  <strong className="text-orange-300">Insert at position (O(n)):</strong>
                  <br />Insert at specific index, shifting existing elements.
                </div>
                <div>
                  <strong className="text-red-300">Delete (O(n)):</strong>
                  <br />Remove element and shift remaining elements to fill gap.
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-yellow-400">
                Advantages & Disadvantages
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-green-300 mb-2">✅ Advantages:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Fast random access O(1)</li>
                    <li>• Memory efficient</li>
                    <li>• Cache-friendly</li>
                    <li>• Simple implementation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-300 mb-2">❌ Disadvantages:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Fixed size (in static arrays)</li>
                    <li>• Expensive insertion/deletion</li>
                    <li>• Memory waste if underutilized</li>
                    <li>• Same data type restriction</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-cyan-400">
                Real-World Applications
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Database records:</strong> Storing rows of data</li>
                <li>• <strong>Image processing:</strong> Pixel data in matrices</li>
                <li>• <strong>Lookup tables:</strong> Fast data retrieval</li>
                <li>• <strong>Sorting algorithms:</strong> Base structure for sorting</li>
                <li>• <strong>Mathematical operations:</strong> Vectors and matrices</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-red-400">
                Dynamic Arrays (JavaScript/React)
              </h2>
              <p className="text-gray-300 leading-relaxed">
                In JavaScript, arrays are <strong>dynamic</strong> - they can grow and shrink during runtime. 
                This demo simulates array operations with a size limit to demonstrate memory constraints 
                that exist in lower-level languages like C/C++.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}