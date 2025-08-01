import { User, Lock, Eye, EyeClosedIcon, ArrowRight } from "lucide-react";
import { useState } from "react";


import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username || !password) {
      setError("Please fill all Detail");
      setIsLoading(false);
      return;
    }

    try {
      const response = await login({ username: username, password: password });

      if (response.status === 200) {
        
        const {access , refresh , user} = response.data;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        if(user){
          console.log(user);
          localStorage.setItem("user",JSON.stringify(user));
        }
        else{
          console.log("User Not Existsing in response")
        }

        // Set success message
        setSuccess("Login Successful! Redirecting to Dashboard...");

        // Redirect to login after a short delay
        setTimeout(() => {
          setIsLoading(true);
        }, 2000);
      
        navigate("/dashboard");
      }
    } catch (error) {
      // Error handling
      setError(
        error.response?.data?.detail || JSON.stringify(error.response.data)
      );
      console.error("Authentication error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" p-50">
      {/* Login Form  */}
      <div className="bg-gray-50 p-20 flex items-center flex-col rounded-sm">
        <div>
          <p className="text-sm">
            Welcome Back! Please Login to access Dashboard
          </p>
        </div>

        {error && (
          <div className="px-3 py-2 mb-1 mt-2 rounded-lg text-center font-medium bg-red-100 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="px-3 py-2 mb-1 mt-2 rounded-lg text-center font-medium bg-green-100 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handlelogin} method="POST">
          <div className="flex flex-col items-center p-1 justify-center ">
            <div className="flex border p-1 rounded-2xl my-2 items-center w-70">
              <User className="mx-2" />

              <input
                type="text"
                name="username"
                id="username"
                className="border-none focus:outline-none "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="flex border p-1 rounded-2xl my-1 w-70">
              <Lock className="mx-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="border-none focus:outline-none "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div
                className="mx-2"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeClosedIcon />}
              </div>
            </div>

            {/* Button */}
            <div className="bg-amber-400 text-gray-800  text-xl rounded-full cursor-pointer">
              <button
                disabled={isLoading}
                className="cursor-pointer px-20 py-1"
                type="submit"
              >
                {/* Button Content */}
                <div className="relative flex items-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>SIGN IN</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
