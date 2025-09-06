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
    if (!isNaN(num) && num > 0 && Number.isInteger(num) && num <= 100) {
      if (num < arr.length) {
        showMessage(`Limit must be at least ${arr.length} (current array size).`, "error");
        return;
      }
      setLimit(num);
    } else if (num > 100) {
      showMessage("Array limit must be 100 or less.", "error");
    }
  };

  // Push new item with validation
  const handlePush = () => {
    const currentLimit = Number(limit);
    if (!currentLimit || currentLimit <= 0) {
      showMessage("Please set a valid limit (1-100).", "error");
      return;
    }

    if (currentLimit < arr.length) {
      showMessage(`Limit should be at least ${arr.length} (current array size).`, "error");
      return;
    }

    if (currentLimit > 100) {
      showMessage("Array limit must be 100 or less.", "error");
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
    if (currentLimit && currentLimit < arr.length - 1) {
      showMessage(`Limit should be at least ${arr.length - 1} after popping.`, "error");
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
    <div className="min-h-screen bg-gray-900">
      {/* Mobile-first single column layout */}
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        {/* Implementation Section */}
        <section className="bg-gray-950 flex flex-col items-center text-white py-6 sm:py-8 lg:py-12 px-3 sm:px-4">
          <div className="bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg w-full max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-blue-400 text-center">
              ⚡ Array Demonstration
            </h1>

            {/* Message Display */}
            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-medium text-center ${
                messageType === 'error' ? 'bg-red-600 text-white' : 
                messageType === 'success' ? 'bg-green-600 text-white' : 
                'bg-blue-600 text-white'
              }`}>
                {message}
              </div>
            )}

            {/* Array Visualization */}
            <div className="mb-4 sm:mb-6">
              <div className="text-base sm:text-lg mb-3 text-purple-400 font-semibold text-center">
                Array Elements (Index-based access)
              </div>
              
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border-2 border-dashed border-gray-600 min-h-[100px] sm:min-h-[120px] flex items-center justify-center">
                {arr.length === 0 ? (
                  <div className="text-gray-400 text-base sm:text-lg">
                    Empty Array []
                  </div>
                ) : (
                  <div className="w-full overflow-x-auto">
                    <div className="flex gap-1 sm:gap-2 justify-start lg:justify-center items-center min-w-max px-2 sm:px-4">
                      <span className="text-purple-300 font-bold text-base sm:text-lg">[</span>
                      {arr.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-shrink-0">
                          <div className="text-xs text-gray-400 mb-1">
                            {index}
                          </div>
                          <div
                            className={`w-12 h-10 sm:w-16 sm:h-12 flex items-center justify-center border-2 rounded-md font-bold text-xs sm:text-sm transition-all duration-300 ${
                              foundIndex === index
                                ? "border-green-400 bg-green-300 text-black shadow-lg scale-110"
                                : "border-purple-400 bg-purple-300 text-black"
                            }`}
                          >
                            {item}
                          </div>
                          {index < arr.length - 1 && (
                            <div className="text-purple-300 font-bold text-base sm:text-lg mt-1 sm:mt-2">,</div>
                          )}
                        </div>
                      ))}
                      <span className="text-purple-300 font-bold text-base sm:text-lg">]</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Array Info */}
            <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
              <div className="text-sm sm:text-base text-center">
                <div className="text-gray-300 mb-1">Size:</div>
                <div className="text-green-400 text-lg sm:text-xl font-bold">{arr.length}</div>
              </div>
              <div className="text-sm sm:text-base text-center">
                <div className="text-gray-300 mb-1">Limit:</div>
                <input
                  type="number"
                  value={limit}
                  onChange={handleLimitChange}
                  min={arr.length}
                  max="100"
                  className="w-16 sm:w-20 text-center bg-gray-700 text-white rounded-md py-1 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Input Controls */}
            <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 mb-4 sm:mb-6">
              {/* Push Value */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-300">Push Value:</label>
                <input
                  type="number"
                  value={pushValue}
                  onChange={(e) => setPushValue(e.target.value)}
                  placeholder="Auto if empty"
                  className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handlePush()}
                />
              </div>

              {/* Search Value */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-300">Search Value:</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1 text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  {foundIndex !== null && (
                    <button
                      onClick={clearSearch}
                      className="px-2 py-2 bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white rounded-md transition text-xs touch-manipulation"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Insert Index */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-300">Index (0-{arr.length}):</label>
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
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-300">Insert Value:</label>
                <input
                  type="number"
                  value={insertValue}
                  onChange={(e) => setInsertValue(e.target.value)}
                  className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                />
              </div>
            </div>

            {/* Operation Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              <button
                onClick={handlePush}
                disabled={arr.length >= Number(limit)}
                className="px-2 sm:px-3 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 disabled:hover:scale-100 touch-manipulation"
              >
                ➕ Push
              </button>
              <button
                onClick={handlePop}
                disabled={arr.length === 0}
                className="px-2 sm:px-3 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 disabled:hover:scale-100 touch-manipulation"
              >
                ➖ Pop
              </button>
              <button
                onClick={handleSearch}
                disabled={!searchValue}
                className="px-2 sm:px-3 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 disabled:hover:scale-100 touch-manipulation"
              >
                🔍 Search
              </button>
              <button
                onClick={handleInsert}
                disabled={!insertIndex || !insertValue || arr.length >= Number(limit)}
                className="px-2 sm:px-3 py-3 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 disabled:hover:scale-100 touch-manipulation"
              >
                📍 Insert At
              </button>
              <button
                onClick={handleDeleteAt}
                disabled={!insertIndex || arr.length === 0}
                className="px-2 sm:px-3 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 disabled:hover:scale-100 touch-manipulation"
              >
                🗑️ Delete At
              </button>
              <button
                onClick={handleClear}
                disabled={arr.length === 0}
                className="px-2 sm:px-3 py-3 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 disabled:hover:scale-100 touch-manipulation"
              >
                🧹 Clear
              </button>
            </div>
          </div>
        </section>

        {/* Theory Section */}
        <section className="bg-gray-900 text-white flex flex-col items-start px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="max-w-2xl w-full">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
              📊 Array Theory
            </h1>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-blue-400">
                  What is an Array?
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  An array is a <strong>linear data structure</strong> that stores a collection of elements 
                  in <strong>contiguous memory locations</strong>. Each element can be accessed directly 
                  using its <strong>index</strong> (starting from 0).
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-green-400">
                  Key Properties
                </h2>
                <ul className="text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>• <strong>Fixed size:</strong> Size is typically determined at creation</li>
                  <li>• <strong>Same data type:</strong> All elements are usually the same type</li>
                  <li>• <strong>Zero-based indexing:</strong> First element is at index 0</li>
                  <li>• <strong>Random access:</strong> O(1) access time to any element</li>
                  <li>• <strong>Contiguous memory:</strong> Elements stored in adjacent memory locations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-purple-400">
                  Array Operations & Time Complexity
                </h2>
                <div className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
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
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-yellow-400">
                  Advantages & Disadvantages
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-300 text-sm sm:text-base">
                  <div>
                    <h3 className="font-semibold text-green-300 mb-2">✅ Advantages:</h3>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      <li>• Fast random access O(1)</li>
                      <li>• Memory efficient</li>
                      <li>• Cache-friendly</li>
                      <li>• Simple implementation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-300 mb-2">❌ Disadvantages:</h3>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      <li>• Fixed size (in static arrays)</li>
                      <li>• Expensive insertion/deletion</li>
                      <li>• Memory waste if underutilized</li>
                      <li>• Same data type restriction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-cyan-400">
                  Real-World Applications
                </h2>
                <ul className="text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>• <strong>Database records:</strong> Storing rows of data</li>
                  <li>• <strong>Image processing:</strong> Pixel data in matrices</li>
                  <li>• <strong>Lookup tables:</strong> Fast data retrieval</li>
                  <li>• <strong>Sorting algorithms:</strong> Base structure for sorting</li>
                  <li>• <strong>Mathematical operations:</strong> Vectors and matrices</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-red-400">
                  Dynamic Arrays (JavaScript/React)
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  In JavaScript, arrays are <strong>dynamic</strong> - they can grow and shrink during runtime. 
                  This demo simulates array operations with a size limit to demonstrate memory constraints 
                  that exist in lower-level languages like C/C++.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}