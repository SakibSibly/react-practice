import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinkClass = "cursor-pointer hover:text-blue-500 hover:bg-blue-200 hover:rounded font-bold p-2 transition-colors duration-200";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="flex justify-between p-5">
            <div>
                <img src="Test" alt="Test Image" />
            </div>
            <div>
                <ul className="flex space-x-4 items-center">
                    <Link to="/home"><li className={navLinkClass}>Home</li></Link>
                    <Link to="/about"><li className={navLinkClass}>About</li></Link>
                    <Link to="/contact"><li className={navLinkClass}>Contact</li></Link>
                    {user ? (
                        <>
                            <Link to="/inventory"><li className={navLinkClass}>Inventory</li></Link>
                            <li
                                className={`${navLinkClass} text-red-500 hover:text-red-700 hover:bg-red-100`}
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        </>
                    ) : (
                        <Link to="/login"><li className={navLinkClass}>Login</li></Link>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;