import { useState } from "react"; 

export default function QueueMethods() {
  const [queue, setQueue] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(5);
  const [enqueueValue, setEnqueueValue] = useState("");
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
    while (queue.includes(value)) {
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
      if (num < queue.length) {
        showMessage(`Limit must be at least ${queue.length} (current queue size).`, "error");
        return;
      }
      setLimit(num);
    }
  };

  // Enqueue new item with validation
  const handleEnqueue = () => {
    const currentLimit = Number(limit);
    if (!currentLimit || currentLimit <= 0) {
      showMessage("Please set a valid limit (1-60).", "error");
      return;
    }

    if (currentLimit < queue.length) {
      showMessage(`Limit should be at least ${queue.length} (current queue size).`, "error");
      return;
    }

    if (currentLimit > 60) {
      showMessage("Queue limit must be 60 or less.", "error");
      return;
    }

    if (queue.length >= currentLimit) {
      showMessage("Queue size limit reached. Cannot enqueue more items.", "error");
      return;
    }

    let valueToEnqueue;
    if (enqueueValue !== "") {
      const num = Number(enqueueValue);
      if (isNaN(num) || !Number.isInteger(num)) {
        showMessage("Please enter a valid integer to enqueue.", "error");
        return;
      }
      valueToEnqueue = num;
      setEnqueueValue("");
    } else {
      valueToEnqueue = getNextUniqueValue();
    }

    setQueue([...queue, valueToEnqueue]);
    setFoundIndex(null);
    showMessage(`Value ${valueToEnqueue} enqueued successfully! New size: ${queue.length + 1}`, "success");
  };

  // Dequeue front item with validation
  const handleDequeue = () => {
    const currentLimit = Number(limit);
    if (currentLimit < queue.length) {
      showMessage(`Limit should be at least ${queue.length} (current queue size).`, "error");
      return;
    }

    if (queue.length === 0) {
      showMessage("Queue is empty. Cannot dequeue items.", "error");
      return;
    }

    const dequeuedValue = queue[0];
    setQueue(queue.slice(1));
    setFoundIndex(null);
    showMessage(`Value ${dequeuedValue} dequeued successfully! New size: ${queue.length - 1}`, "success");
  };

  // Peek at front item
  const handlePeek = () => {
    if (queue.length === 0) {
      showMessage("Queue is empty. Nothing to peek.", "error");
      return;
    }

    const frontValue = queue[0];
    setFoundIndex(0);
    showMessage(`Front element is: ${frontValue}`, "info");
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

    const index = queue.indexOf(numValue);
    if (index === -1) {
      showMessage(`Value ${numValue} not found in the queue.`, "error");
      setFoundIndex(null);
    } else {
      showMessage(`Value ${numValue} found at position ${index}!`, "success");
      setFoundIndex(index);
    }
  };

  // Clear search highlighting
  const clearSearch = () => {
    setFoundIndex(null);
    setSearchValue("");
  };

  // Clear entire queue
  const handleClear = () => {
    if (queue.length === 0) {
      showMessage("Queue is already empty.", "info");
      return;
    }
    setQueue([]);
    setFoundIndex(null);
    showMessage("Queue cleared successfully!", "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Implementation Section */}
      <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
        <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
            🚦 Queue Demonstration
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

          {/* Queue Visualization */}
          <div className="mb-6">
            <div className="text-lg mb-3 text-purple-400 font-semibold">
              Queue Elements (FIFO - First In, First Out)
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600 min-h-[150px] flex flex-col items-center justify-center">
              {queue.length === 0 ? (
                <div className="text-gray-400 text-lg">
                  Empty Queue
                </div>
              ) : (
                <div className="w-full">
                  {/* Front/Rear Labels */}
                  <div className="flex justify-between mb-2 text-xs text-gray-400">
                    <span>← FRONT (Dequeue)</span>
                    <span>REAR (Enqueue) →</span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <div className="flex gap-2 justify-center items-center min-w-max px-4">
                      {queue.map((item, index) => (
                        <div key={index} className="flex flex-col items-center relative">
                          <div className="text-xs text-gray-400 mb-1">
                            {index}
                          </div>
                          <div
                            className={`w-16 h-12 flex items-center justify-center border-2 rounded-md font-bold text-sm transition-all duration-300 ${
                              foundIndex === index
                                ? "border-green-400 bg-green-300 text-black shadow-lg scale-110"
                                : index === 0
                                ? "border-blue-400 bg-blue-300 text-black" // Front element
                                : index === queue.length - 1
                                ? "border-orange-400 bg-orange-300 text-black" // Rear element
                                : "border-purple-400 bg-purple-300 text-black"
                            }`}
                          >
                            {item}
                          </div>
                          {index === 0 && (
                            <div className="text-xs text-blue-300 mt-1 font-bold">FRONT</div>
                          )}
                          {index === queue.length - 1 && (
                            <div className="text-xs text-orange-300 mt-1 font-bold">REAR</div>
                          )}
                          {index < queue.length - 1 && (
                            <div className="text-purple-300 font-bold text-lg absolute mt-8">→</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Queue Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-lg">
              <strong>Size:</strong>{" "}
              <span className="text-green-400 text-xl">{queue.length}</span>
            </div>
            <div className="text-lg">
              <strong>Limit:</strong>{" "}
              <input
                type="number"
                value={limit}
                onChange={handleLimitChange}
                min={queue.length}
                max="60"
                className="w-16 text-center bg-gray-700 text-white rounded-md ml-1 border border-gray-600 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Enqueue Value */}
            <div>
              <label className="block text-sm font-medium mb-1">Enqueue Value:</label>
              <input
                type="number"
                value={enqueueValue}
                onChange={(e) => setEnqueueValue(e.target.value)}
                placeholder="Auto if empty"
                className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleEnqueue()}
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
          </div>

          {/* Operation Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            <button
              onClick={handleEnqueue}
              disabled={queue.length >= Number(limit)}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ➕ Enqueue
            </button>
            <button
              onClick={handleDequeue}
              disabled={queue.length === 0}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ➖ Dequeue
            </button>
            <button
              onClick={handlePeek}
              disabled={queue.length === 0}
              className="px-3 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              👁 Peek
            </button>
            <button
              onClick={handleSearch}
              disabled={!searchValue}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              🔍 Search
            </button>
            <button
              onClick={handleClear}
              disabled={queue.length === 0}
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
            🚦 Queue Theory
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                What is a Queue?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                A queue is a <strong>linear data structure</strong> that follows the 
                <strong> FIFO (First In, First Out)</strong> principle. Elements are added at the 
                <strong> rear</strong> and removed from the <strong>front</strong>, just like a line of people waiting.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-green-400">
                Key Properties
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>FIFO ordering:</strong> First element added is first to be removed</li>
                <li>• <strong>Two pointers:</strong> Front (for dequeue) and Rear (for enqueue)</li>
                <li>• <strong>Restricted access:</strong> Can only add/remove from specific ends</li>
                <li>• <strong>Sequential processing:</strong> Elements processed in order of arrival</li>
                <li>• <strong>No random access:</strong> Cannot access middle elements directly</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-purple-400">
                Queue Operations & Time Complexity
              </h2>
              <div className="space-y-3 text-gray-300">
                <div>
                  <strong className="text-green-300">Enqueue (O(1)):</strong>
                  <br />Add element to the rear of the queue.
                </div>
                <div>
                  <strong className="text-red-300">Dequeue (O(1)):</strong>
                  <br />Remove and return element from the front of the queue.
                </div>
                <div>
                  <strong className="text-cyan-300">Peek/Front (O(1)):</strong>
                  <br />View the front element without removing it.
                </div>
                <div>
                  <strong className="text-blue-300">Search (O(n)):</strong>
                  <br />Linear search through queue elements to find a value.
                </div>
                <div>
                  <strong className="text-yellow-300">isEmpty (O(1)):</strong>
                  <br />Check if the queue contains any elements.
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">
                Types of Queues
              </h2>
              <div className="space-y-3 text-gray-300">
                <div>
                  <strong className="text-green-300">Linear Queue:</strong> Basic queue with fixed size
                </div>
                <div>
                  <strong className="text-blue-300">Circular Queue:</strong> Rear connects back to front when full
                </div>
                <div>
                  <strong className="text-purple-300">Priority Queue:</strong> Elements have priorities for ordering
                </div>
                <div>
                  <strong className="text-yellow-300">Double-ended Queue (Deque):</strong> Add/remove from both ends
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
                    <li>• Fair processing (FIFO)</li>
                    <li>• Fast enqueue/dequeue O(1)</li>
                    <li>• Simple implementation</li>
                    <li>• Memory efficient</li>
                    <li>• Thread-safe operations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-300 mb-2">❌ Disadvantages:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• No random access</li>
                    <li>• Linear search O(n)</li>
                    <li>• Fixed size (in static queues)</li>
                    <li>• Memory waste in array implementation</li>
                    <li>• No direct middle element access</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-cyan-400">
                Real-World Applications
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>CPU Scheduling:</strong> Process scheduling in operating systems</li>
                <li>• <strong>Print Queues:</strong> Managing print job orders</li>
                <li>• <strong>Web Servers:</strong> Handling incoming requests</li>
                <li>• <strong>Messaging Systems:</strong> Message delivery ordering</li>
                <li>• <strong>Order Processing:</strong> First-come, first-served order fulfillment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
