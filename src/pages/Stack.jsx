import { useState } from "react";

export default function StackMethods() {
    const [stack, setStack] = useState([1, 2, 3]);
    const [limit, setLimit] = useState(5);

    // push new item
    const handlePush = () => {
        if (limit >= 21) {
            alert("Please set limit less than 20 because stack size is intentionally kept small due to memory constraints.");
            return;
        } else if (stack.length >= limit) {
            alert("Stack size limit reached. Cannot push more items.");
            return;
        }
        const newItem = stack.length + 1; // next number
        setStack([...stack, newItem]); // push to top
    };

    // pop from top
    const handlePop = () => {
        if (stack.length === 0) {
            alert("Stack underflow!!");
            return;
        }
        setStack(stack.slice(0, -1));
    };

    // show top item
    const handleTop = () => {
        if (stack.length === 0) {
            alert("Stack is empty!!");
            return;
        }
        alert(`Top item is: ${stack[stack.length - 1]}`);
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* Implementation Section */}
            <section className="bg-gray-950 flex flex-col items-center text-white py-12 px-4">
                <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-xl text-center mt-15">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400">
                        ⚡ Demonstration
                    </h1>

                    {/* Show stack in vertical form */}
                    <div className="flex flex-col-reverse items-center mb-6">
                        {stack.map((item, index) => (
                            <div
                                key={index}
                                className="w-24 h-12 flex items-center justify-center border-2 border-yellow-400 bg-yellow-300 text-black font-bold rounded-md mb-1"
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* Show size */}
                    <p className="mb-8 text-lg md:text-xl">
                        <strong>Size:</strong>{" "}
                        <span className="text-green-400">{stack.length}</span>
                    </p>

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
                        <button
                            onClick={handleTop}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md transition transform hover:scale-105"
                        >
                            🔝 Top
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
                            A stack is a linear data structure that follows the{" "}
                            <strong>LIFO (Last In, First Out)</strong> principle.
                        </li>
                        <li>
                            Elements can only be inserted (pushed) and removed (popped) from
                            the <strong>top</strong>.
                        </li>
                        <li>
                            Push adds a new element on top, while Pop removes the top element.
                        </li>
                        <li>
                            Common uses include undo operations, expression evaluation,
                            recursion, and browser history.
                        </li>

                        <h1 className="text-xl md:text-2xl font-bold mb-6 mt-10">
                            <u>Implementation</u>
                        </h1>
                        <li>
                            We start with an initial stack: <code>[1, 2, 3]</code>.
                        </li>
                        <li>
                            <strong>Push:</strong> Adds a new element{" "}
                            <code>stack.length + 1</code> at the top.
                        </li>
                        <li>
                            <strong>Pop:</strong> Removes the top element using{" "}
                            <code>stack.slice(0, -1)</code>.
                        </li>
                        <li>
                            In UI, the top of the stack is shown at the{" "}
                            <strong>top of the column</strong>.
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
