import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const NavbarUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-800 w-full py-4 px-4">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-white text-2xl font-bold">
                    MyLogo
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center justify-self-auto space-x-1">
                    <div className="flex space-x-4">
                        <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/dashboard" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                            Dashboard
                        </Link>
                        <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                            About
                        </Link>
                        <Link to="/contact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                            Contact
                        </Link>
                        <Link to="/career" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                            Career
                        </Link>
                    </div>
                </div>
                <button
                    className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300  hover:bg-green-500 bg-blue-500`}
                    onClick={() => {
                        localStorage.clear();

                        navigate("/signin");
                    }}
                >
                    Logout
                </button>
                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <MenuIcon /> : <X />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                            Home
                        </Link>
                        <Link to="/about" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                            About
                        </Link>
                        <Link to="/contact" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                            Contact
                        </Link>
                        <Link to="/career" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                            Career
                        </Link>
                        <button
                            className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium w-full text-left"
                            onClick={() => {
                                localStorage.clear();

                                navigate("/");
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarUser;
