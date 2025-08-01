import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import PublicRoutes from './Routes/PublicRoutes';
import Navbar from "./components/Navbar";
import NavbarUser from "./components/NavbarUser";

import './App.css'


function App() {

	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<Navbar/>
				<main className="flex-grow">
					<Routes>
						{/* Home - Public */}
						<Route path="/" element={<Home />} />

						{/* Signin and Signup - Only visible if NOT logged in */}
						<Route element={<PublicRoutes />}>
							<Route path="/signin" element={<Signin />} />
							<Route path="/signup" element={<Signup />} />
						</Route>

						{/* Dashboard - Only visible if logged in */}
						<Route element={<ProtectedRoutes />}>
							<Route path="/dashboard" element={<Dashboard />} />
						</Route>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
