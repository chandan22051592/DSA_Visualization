import { useState } from "react";

export default function StackMethods() {
  const [stack, setStack] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(5);
  const [pushValue, setPushValue] = useState("");
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
    while (stack.includes(value)) {
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
    if (!isNaN(num) && num > 0 && Number.isInteger(num) && num <= 20) {
      setLimit(num);
    }
  };

  // Push new item with validation
  const handlePush = () => {
    const currentLimit = Number(limit);
    if (!currentLimit || currentLimit <= 0) {
      showMessage("Please set a valid limit (1-20).", "error");
      return;
    }

    if (currentLimit > 20) {
      showMessage("Stack limit must be 20 or less due to memory constraints.", "error");
      return;
    }

    if (stack.length >= currentLimit) {
      showMessage("Stack overflow! Cannot push more items.", "error");
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

    setStack([...stack, valueToPush]);
    showMessage(`Item ${valueToPush} pushed successfully!`, "success");
  };

  // Pop from top with validation
  const handlePop = () => {
    if (stack.length === 0) {
      showMessage("Stack underflow! Stack is empty.", "error");
      return;
    }
    const poppedItem = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    showMessage(`Item ${poppedItem} popped successfully!`, "success");
  };

  // Show top item with validation
  const handleTop = () => {
    if (stack.length === 0) {
      showMessage("Stack is empty! No top element.", "error");
      return;
    }
    showMessage(`Top item is: ${stack[stack.length - 1]}`, "info");
  };

  // Check if stack is empty
  const handleIsEmpty = () => {
    const isEmpty = stack.length === 0;
    showMessage(`Stack is ${isEmpty ? "empty" : "not empty"} (Size: ${stack.length})`, "info");
  };

  // Clear the entire stack
  const handleClear = () => {
    if (stack.length === 0) {
      showMessage("Stack is already empty.", "info");
      return;
    }
    setStack([]);
    showMessage("Stack cleared successfully!", "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Implementation Section */}
      <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
        <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
            ⚡ Stack Demonstration
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

          {/* Stack Visualization */}
          <div className="mb-6">
            <div className="text-lg mb-2 text-yellow-400 font-semibold">
              ↑ TOP (LIFO - Last In, First Out)
            </div>
            
            <div className="flex flex-col-reverse items-center min-h-[200px] justify-end border-2 border-dashed border-gray-600 rounded-lg p-4 bg-gray-900">
              {stack.length === 0 ? (
                <div className="text-gray-400 text-lg p-4">
                  Empty Stack
                </div>
              ) : (
                stack.map((item, index) => (
                  <div
                    key={index}
                    className={`w-28 h-14 flex items-center justify-center border-2 border-yellow-400 bg-yellow-300 text-black font-bold rounded-md mb-1 transition-all duration-300 ${
                      index === stack.length - 1 ? 'shadow-lg scale-105 border-yellow-500 bg-yellow-200' : ''
                    }`}
                    style={{
                      zIndex: stack.length - index
                    }}
                  >
                    {item}
                    {index === stack.length - 1 && (
                      <span className="ml-2 text-xs text-red-600 font-bold">TOP</span>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="text-lg mt-2 text-gray-400 font-semibold">
              ↓ BOTTOM
            </div>
          </div>

          {/* Stack Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-lg">
              <strong>Size:</strong>{" "}
              <span className="text-green-400 text-xl">{stack.length}</span>
            </div>
            <div className="text-lg">
              <strong>Limit:</strong>{" "}
              <input
                type="number"
                value={limit}
                onChange={handleLimitChange}
                min="1"
                max="20"
                className="w-16 text-center bg-gray-700 text-white rounded-md ml-1 border border-gray-600 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Push Value Input */}
          <div className="mb-6">
            <div className="text-lg mb-2">
              <strong>Push Value (optional):</strong>
            </div>
            <input
              type="number"
              value={pushValue}
              onChange={(e) => setPushValue(e.target.value)}
              placeholder="Auto-generate if empty"
              className="w-full text-center bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:border-blue-400 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handlePush()}
            />
          </div>

          {/* Main Operation Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handlePush}
              disabled={stack.length >= Number(limit)}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ⬆️ Push
            </button>
            <button
              onClick={handlePop}
              disabled={stack.length === 0}
              className="px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              ⬇️ Pop
            </button>
            <button
              onClick={handleTop}
              disabled={stack.length === 0}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
            >
              👁️ Peek
            </button>
            <button
              onClick={handleIsEmpty}
              className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              ❓ Empty?
            </button>
          </div>

          {/* Utility Button */}
          <button
            onClick={handleClear}
            disabled={stack.length === 0}
            className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:hover:scale-100"
          >
            🗑️ Clear Stack
          </button>
        </div>
      </section>

      {/* Theory Section */}
      <section className="bg-gray-900 text-white flex flex-col items-start px-6 md:px-8 py-10">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            📚 Stack Theory
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                What is a Stack?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                A stack is a linear data structure that follows the <strong className="text-yellow-400">LIFO (Last In, First Out)</strong> principle. 
                Think of it like a stack of plates - you can only add or remove plates from the top.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-green-400">
                Core Operations
              </h2>
              <div className="space-y-3 text-gray-300">
                <div>
                  <strong className="text-green-300">Push (O(1)):</strong>
                  <br />Adds a new element to the top of the stack. Can cause overflow if stack is full.
                </div>
                <div>
                  <strong className="text-red-300">Pop (O(1)):</strong>
                  <br />Removes and returns the top element. Can cause underflow if stack is empty.
                </div>
                <div>
                  <strong className="text-blue-300">Peek/Top (O(1)):</strong>
                  <br />Returns the top element without removing it from the stack.
                </div>
                <div>
                  <strong className="text-purple-300">isEmpty (O(1)):</strong>
                  <br />Checks whether the stack is empty or contains elements.
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-yellow-400">
                Real-World Applications
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Function calls:</strong> Managing recursive function calls</li>
                <li>• <strong>Undo operations:</strong> Text editors, image editors</li>
                <li>• <strong>Expression evaluation:</strong> Parsing mathematical expressions</li>
                <li>• <strong>Browser history:</strong> Back button functionality</li>
                <li>• <strong>Memory management:</strong> Stack frame allocation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">
                Stack vs Other Data Structures
              </h2>
              <div className="text-gray-300 space-y-2">
                <div><strong>vs Queue:</strong> Stack is LIFO, Queue is FIFO (First In, First Out)</div>
                <div><strong>vs Array:</strong> Stack has restricted access (only top), Array allows random access</div>
                <div><strong>vs Linked List:</strong> Stack operations are conceptually simpler and more restricted</div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-red-400">
                Common Errors
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Stack Overflow:</strong> Trying to push when stack is full</li>
                <li>• <strong>Stack Underflow:</strong> Trying to pop from empty stack</li>
                <li>• <strong>Memory leaks:</strong> Not properly managing dynamic stack memory</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
