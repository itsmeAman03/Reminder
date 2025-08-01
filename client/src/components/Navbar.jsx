import {  useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";


const Navbar = () => {

	const [isOpen, setIsOpen] = useState(false);
	const isLoggedIn  = localStorage.getItem("access_token");
	const navigate = useNavigate();
	const [hoveredButton, setHoveredButton] = useState(null);


	return (
		<nav className="bg-gray-800 w-full py-4 px-4">
			<div className="flex justify-between items-center mx-10">
				{/* Logo */}
				<Link to="/" className="text-white text-2xl font-bold">
					MyLogo
				</Link>

				{/* Mobile menu button */}
				<div className="md:hidden flex items-center">
					<button
						className="text-white focus:outline-none"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <MenuIcon /> : <XIcon />}
					</button>
				</div>

				{/* Desktop menu */}
				<div className="hidden md:flex items-center justify-between space-x-5 ">
					<Link to="/" className="text-white hover:text-gray-300">
						Home
					</Link>
					{isLoggedIn && <Link to="/dashboard" className="text-white hover:text-gray-300">
						Dashboard
					</Link>}
					<Link to="/about" className="text-white hover:text-gray-300">
						About
					</Link>
					<Link to="/contact" className="text-white hover:text-gray-300">
						Contact
					</Link>
					<Link to="/career" className="text-white hover:text-gray-300">
						Career
					</Link>``
				</div>
				{isLoggedIn ?
					<>
						<button
							className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300  hover:bg-green-500 bg-blue-500`}
							onClick={() => {
								localStorage.clear();
								navigate("/signin");
							}}
						>
							Logout
						</button>
					</> :
					<>
						<div className="flex gap-3 ">
							<button
								className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ${hoveredButton === 1 ? 'bg-green-500' : 'bg-blue-500'
									}`}
								onMouseEnter={() => setHoveredButton(1)}
								onMouseLeave={() => setHoveredButton(null)}
								onClick={() => navigate("/signin")}
							>
								Sign In
							</button>
							<button
								className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ${hoveredButton === 2 ? 'bg-green-500' : 'bg-blue-500'
									}`}
								onMouseEnter={() => setHoveredButton(2)}
								onMouseLeave={() => setHoveredButton(null)}
								onClick={() => navigate("/signup")}
							>
								Sign Up
							</button>
						</div>
					</>
				}
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<div className="md:hidden mt-4 space-y-2">
					<Link to="/" className="block text-white px-2 py-2 hover:bg-gray-700">
						Home
					</Link>
					<Link to="/about" className="block text-white px-2 py-2 hover:bg-gray-700">
						About
					</Link>
					<Link to="/contact" className="block text-white px-2 py-2 hover:bg-gray-700">
						Contact
					</Link>
					<Link to="/career" className="block text-white px-2 py-2 hover:bg-gray-700">
						Career
					</Link>
					<button
						className="block text-white px-2 py-2 hover:bg-gray-700 w-full text-left"
						onClick={() => navigate("/signin")}
					>
						Sign In
					</button>
					<button
						className="block text-white px-2 py-2 hover:bg-gray-700 w-full text-left"
						onClick={() => navigate("/signup")}
					>
						Sign Up
					</button>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
