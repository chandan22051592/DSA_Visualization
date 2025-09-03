import { useState } from "react";

export default function LinkedListMethods() {
  const [list, setList] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [foundIndex, setFoundIndex] = useState(null);

  // insertion at end
  const handleInsert = () => {
    if (list.length >= limit) {
      alert("Linked List size limit reached. Cannot insert more nodes.");
      return;
    }
    const newNode = list.length + 1;
    setList([...list, newNode]);
  };

  // deletion at end
  const handleDelete = () => {
    if (list.length === 0) {
      alert("Linked List is empty. Nothing to delete.");
      return;
    }
    setList(list.slice(0, -1));
  };

  // traversal (just alert values in order)
  const handleTraversal = () => {
    if (list.length === 0) {
      alert("List is empty.");
      return;
    }
    alert("Traversal (Head → Tail): " + list.join(" → "));
  };

  // searching
  const handleSearch = () => {
    if (searchValue === "") {
      alert("Enter a value to search.");
      return;
    }
    const index = list.indexOf(Number(searchValue));
    if (index === -1) {
      alert(`${searchValue} not present in the list.`);
      setFoundIndex(null);
    } else {
      alert(`${searchValue} found at position ${index + 1} (from head).`);
      setFoundIndex(index);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Implementation Section */}
      <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
        <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-xl text-center mt-15">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400">
            ⚡ Demonstration
          </h1>

          {/* Show linked list vertically */}
          <div className="flex flex-col items-center mb-6">
            {list.length > 0 && (
              <div className="mb-2 text-blue-400 text-3xl">🔝</div>
            )}
            {list.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-28 h-12 flex items-center justify-center border-2 ${
                    foundIndex === index
                      ? "border-green-400 bg-green-300"
                      : "border-pink-400 bg-pink-300"
                  } text-black font-bold rounded-md mb-1`}
                >
                  {item}
                </div>
                {index < list.length - 1 && (
                  <div className="text-white text-lg mb-1">⬇️</div>
                )}
              </div>
            ))}
          </div>

          {/* Show size */}
          <p className="mb-8 text-lg md:text-xl">
            <strong>Size:</strong>{" "}
            <span className="text-green-400">{list.length}</span>
          </p>

          {/* Limit input */}
          <p className="mb-8 text-lg md:text-xl">
            <strong>Limit:</strong>{" "}
            <input
              type="number"
              value={limit}
              onChange={(e) => {
                const val = e.target.value;
                setLimit(val === "" ? "" : Number(val));
              }}
              className="w-20 text-center bg-gray-700 text-white rounded-md ml-2 no-spin"
            />
          </p>

          {/* Search input */}
          <p className="mb-8 text-lg md:text-xl">
            <strong>Search:</strong>{" "}
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-24 text-center bg-gray-700 text-white rounded-md ml-2"
            />
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center">
            <button
              onClick={handleInsert}
              className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              ➕ Insert
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              ➖ Delete
            </button>
            <button
              onClick={handleTraversal}
              className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              🔄 Traverse
            </button>
            <button
              onClick={handleSearch}
              className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
            >
              🔍 Search
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
              A linked list is a linear data structure where elements are stored
              in <strong>nodes</strong>.
            </li>
            <li>
              Each node has two parts: <strong>data</strong> and a{" "}
              <strong>pointer</strong> to the next node.
            </li>
            <li>
              The first node is called the <strong>head</strong>, shown with 🔝.
            </li>
            <li>
              <strong>Insertion:</strong> Adds a new node at the end of the list
              (in this demo).
            </li>
            <li>
              <strong>Deletion:</strong> Removes the last node.
            </li>
            <li>
              <strong>Traversal:</strong> Visits all nodes from head to tail in
              order.
            </li>
            <li>
              <strong>Searching:</strong> Finds whether a value exists in the
              list, highlighting it in green if found.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
