import {
  User,
  Lock,
  Eye,
  EyeClosedIcon,
  User2,
  AtSign,
  Mail,
  Hash,
  Locate,
  PinIcon,
} from "lucide-react";
import {  useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State variables for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [location, setLocation] = useState("");

  // State variables for validation errors
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phonenoErr, setPhonenoErr] = useState("");
  const [locationErr, setLocationErr] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Function to validate the username
  const validateUsername = (name) => {
    if (!name.trim()) {
      return "Username is required.";
    }
    if (name.trim().length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (/\s/.test(name)) {
      return "Username cannot contain spaces.";
    }
    return "";
  };

  // Function to validate the email
  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required.";
    }
    // Basic email regex for format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    return "";
  };

  // Function to validate the password
  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    // // Check for at least one uppercase letter
    // if (!/[A-Z]/.test(password)) {
    // 	return "Password must contain at least one uppercase letter.";
    // }
    // // Check for at least one lowercase letter
    // if (!/[a-z]/.test(password)) {
    // 	return "Password must contain at least one lowercase letter.";
    // }
    // // Check for at least one number
    // if (!/[0-9]/.test(password)) {
    // 	return "Password must contain at least one number.";
    // }
    // // Check for at least one special character
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    // 	return "Password must contain at least one special character.";
    // }
    return "";
  };

  // Function to validate confirm password
  const validateConfirmPassword = (confirmPass, originalPass) => {
    if (!confirmPass) {
      return "Confirm Password is required.";
    }
    if (confirmPass !== originalPass) {
      return "Passwords do not match.";
    }
    return "";
  };
  const validatePhone = (phoneno) => {
    if (!phoneno) {
      return "Phone No. is required";
    }
    if (!phoneno.trim().length == 10) {
      return "Phone number should of 10 Digits";
    }
    if (/^\d$$/.test(phoneno)) {
      return "Phone number shoudld contain only numbers";
    }
    return "";
  };
  const validateLocation = (location) => {
    if (!location) {
      return "Location is required";
    }
    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    //validation of data in the form

    e.preventDefault(); // Prevent default form submission behavior

    // Perform all validations

    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(
      confirmPassword,
      password
    );
    const phonenoErr = validatePhone(phoneno);
    const locationErr = validateLocation(location);




    // Set error messages
    setUsernameError(usernameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);
    setPhonenoErr(phonenoErr);
    setLocationErr(locationErr);



    // Check if any errors exist
    if (
      usernameErr ||
      emailErr ||
      passwordErr ||
      confirmPasswordErr ||
      phonenoErr ||
      locationErr
    ) {
      setError("Please correct the errors in the form to proceed."); // Specific message for errors
      console.log("Error occurred");
      return;
    }

    // If all validations pass, log the data and show success message
    console.log("Your Details", {
      username,
      email,
      password, // In a real app, you would hash this before sending,
      phoneno,
      location,
    });



    // Optionally clear the form fields after successful submission

    // setUsername("");
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
    // setPhoneno("");
    // setLocation("");

    // Signup function
    const signupDetail = {
      email: email,
      password: password,
      username: username,
      phone_no: phoneno,
      location: location,
    };
    try {
      const response = await signup(signupDetail);
      if (response.status === 201) {
        console.log("Signup Attempted");
        setSuccess("Account Created Successful")
        setTimeout(() => {

          navigate("/signin");
        }, 2000);
      }
    } catch (err) {


      // Error handling
      const usernameError = err.response?.data?.username?.[0];

      if (usernameError && usernameError.includes('already exists')) {

        setError(usernameError);
        setUsernameError("Already taken");
      }
      else if (err.response.data.email_exist) {


        console.log("inside the if email");

        setError(err.response.data.message)
        setEmailError("Already Linked");

      }
      else {

        setError(
          err.response?.data?.detail || "An error occurred , Failed Signup"
        );
        console.error("Authentication error", err);
      }

    }

  };

  return (
    <div className=" p-50">
      {/* Login Form  */}
      <div className="bg-gray-50 p-20 flex items-center flex-col rounded-sm ">
        <div>
          <p className="text-sm">
            Welcomes! <br />
            Please Create an account to access Dashboard
          </p>
        </div>
        {/* Display general form messages */}
        {error && (
          <div className="p-3 mb-4 rounded-lg text-center font-medium bg-red-100 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 mb-4 rounded-lg text-center font-medium bg-green-100 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col items-center p-5 justify-center ">
            <div className=" border p-1 rounded-2xl my-1">
              <div className="flex items-center align-center">
                <label htmlFor="username">
                  <AtSign />{" "}
                </label>
                <input
                  type="text"
                  id="username"
                  className={`w-full px-4 py-2 border-none focus:outline-none focus:border-trasparent ${usernameError ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
                  placeholder="johndoe123"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(""); // Clear error on change
                  }}
                />
              </div>
              {usernameError && (
                <p className="text-red-500 text-xs mt-1">{usernameError}</p>
              )}
            </div>
            <div className=" border p-1 rounded-2xl my-1 ">
              <div className="flex items-center align-center">
                <label htmlFor="username">
                  <Mail />{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-2 border ${emailError ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(""); // Clear error on change
                  }}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <div className=" border p-1 rounded-2xl my-1 ">
              <div className="flex items-center align-center">
                <label htmlFor="username">
                  <Lock />{" "}
                </label>
                <input
                  type="password"
                  id="password"
                  className={`w-full px-4 py-2 border ${passwordError ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(""); // Clear error on change
                  }}
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div className=" border p-1 rounded-2xl my-1 ">
              <div className="flex items-center align-center">
                <label htmlFor="username">
                  <Lock />{" "}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`w-full px-4 py-2 border ${confirmPasswordError ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(""); // Clear error on change
                  }}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
            <div className=" border p-1 rounded-2xl my-1 ">
              <div className="flex items-center align-center">
                <label htmlFor="username">
                  <Hash />{" "}
                </label>
                <input
                  type="text"
                  id="text"
                  className={`w-full px-4 py-2 border ${phonenoErr ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
                  placeholder="Enter you Phone No."
                  value={phoneno}
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                    setPhonenoErr(""); // Clear error on change
                  }}
                />
              </div>
              {phonenoErr && (
                <p className="text-red-500 text-xs mt-1">{phonenoErr}</p>
              )}
            </div>

            <div className=" border p-1 rounded-2xl my-1 ">
              <div className="flex items-center align-center">
                <label htmlFor="username">
                  <PinIcon />{" "}
                </label>
                <input
                  type="text"
                  id="text"
                  className={`w-full px-4 py-2 border ${locationErr ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
                  placeholder="Enter Your Address"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocationErr(""); // Clear error on change
                  }}
                />
              </div>
              {locationErr && (
                <p className="text-red-500 text-xs mt-1">{locationErr}</p>
              )}
            </div>

            <button
              className=" bg-amber-400 px-10 py-1 mt-4 text-gray-800 rounded-lg font-bold text-lg hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
