import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="flex justify-between p-5">
            <div>
                <img src="Test" alt="Test Image" />
            </div>
            <div>
                <ul className="flex space-x-4">
                    <Link to="/home"><li className="cursor-pointer hover:text-blue-500 hover:bg-blue-200 hover:rounded font-bold p-2 transition-colors duration-200">Home</li></Link>
                    <Link to="/about"><li className="cursor-pointer hover:text-blue-500 hover:bg-blue-200 hover:rounded font-bold p-2 transition-colors duration-200">About</li></Link>
                    <Link to="/contact"><li className="cursor-pointer hover:text-blue-500 hover:bg-blue-200 hover:rounded font-bold p-2 transition-colors duration-200">Contact</li></Link>
                    <Link to="/login"><li className="cursor-pointer hover:text-blue-500 hover:bg-blue-200 hover:rounded font-bold p-2 transition-colors duration-200">Login</li></Link>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;