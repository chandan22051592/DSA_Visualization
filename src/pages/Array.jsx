import { useState } from "react";

export default function ArrayMethods() {
  const [arr, setArr] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(5);

  // push new item
  const handlePush = () => {
    if (limit >= 61) {
      alert("Please set limit less than 60.");
      return; 
    }
    else if (arr.length >= limit) {
      alert("Array size limit reached. Cannot push more items.");
      return;
    }
    const newItem = arr.length + 1; // next number
    setArr([...arr, newItem]); // push
  };

  // pop last item
  const handlePop = () => {
    setArr(arr.slice(0, -1)); // remove last element
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Implementation Section */}
      <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
        <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-xl text-center mt-15">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400">
            ⚡ Demonstration
          </h1>

          {/* Show array */}
          <div className="overflow-x-auto">
            <p className="mb-6 text-lg md:text-xl inline-block">
              <strong>Array:</strong>{" "}
              <span className="text-yellow-300">[{arr.join(", ")}]</span>
            </p>
          </div>

          {/* Show size */}
          <p className="mb-8 text-lg md:text-xl">
            <strong>Size:</strong>{" "}
            <span className="text-green-400">{arr.length}</span>
          </p>

          <p className="mb-8 text-lg md:text-xl">
            <strong>Limit:</strong>{" "}
            <input
              type="number"
              value={limit}
              onChange={(e) => {
                const val = e.target.value;
                setLimit(val === "" ? "" : Number(val)); // <-- main change)
                }}
              className="w-20 text-center bg-gray-700 text-white rounded-md ml-2 no-spin"
            />
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
            <button
              onClick={handlePush}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              ➕ Push
            </button>
            <button
              onClick={handlePop}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              ➖ Pop
            </button>
          </div>
        </div>
      </section>

      {/* Theory Section */}
      <section className="bg-gray-900 text-white flex flex-col items-start px-6 md:px-5 py-10">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 mt-4 md:mt-2">
            📖 Theory
          </h1>
          <ul className="list-disc list-outside pl-6 space-y-4 text-base md:text-lg">
            <li>
              An array is a data structure that stores a collection of elements
              (values), usually of the same data type, in a contiguous block of
              memory.
            </li>
            <li>
              Fixed size : Once an array is created, its size cannot be changed.
            </li>
            <li>Same data type : All elements are of the same type.</li>
            <li>Indexing : The first element is usually at index 0.</li>

            <h1 className="text-xl md:text-2xl font-bold mb-6 mt-10">
              <u>Implementation</u>
            </h1>
            <li>
              We start with an initial array: <code>[1, 2, 3]</code>.
            </li>
            <li>
              <strong>Push:</strong> Adds a new element calculated as{" "}
              <code>arr.length + 1</code> to the end of the array.
            </li>
            <li>
              <strong>Pop:</strong> Removes the last element using{" "}
              <code>arr.slice(0, -1)</code>.
            </li>
            <li>
              React re-renders every time state changes, updating the array and
              its size dynamically.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
