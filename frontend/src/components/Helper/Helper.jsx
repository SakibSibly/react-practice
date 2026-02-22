import "./Helper.css";
import { useState } from "react";

export default function Helper() {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="flex justify-center content-center flex-row gap-4">
            <div className="flex justify-center content-center flex-row gap-4">
                <div>
                    <input type="text" placeholder="Type something..." className="border border-gray-300 rounded px-4 py-2 w-64" />
                </div>
                <div>
                    <input type="text" placeholder="Type something else..." className="border border-gray-300 rounded px-4 py-2 w-64 mt-2" />
                </div>
                <div>
                    <input type="text" placeholder="And something more..." className="border border-gray-300 rounded px-4 py-2 w-64 mt-2" />
                </div>
            </div>
            <div>
                <button 
                    onClick={() => setClicked(clicked => !clicked)}
                    className="bg-transparent hover:bg-blue-500 cursor-pointer text-blue-700 font-semibold hover:text-white py-2 w-2xl border border-blue-500 hover:border-transparent rounded"
                    >
                    {clicked ? "Clicked!" : "Click Me"}
                </button>
            </div>
        </div>
    );
}