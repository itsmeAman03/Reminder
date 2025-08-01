import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Phoneno, setPhoneno] = useState("");
  const [Location, setLocation] = useState("");
  // const [Error, setError] = useState("");

  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = () => {
      const access_token = localStorage.getItem("access_token");
      const user = JSON.parse(localStorage.getItem('user'));
      // console.log(user)

      if (!access_token) {
        navigate("/signin");
        return;
      }

      setTimeout(() => {
        // setIsLoading(true);
      }, 5000);
      setUsername(user.username);
      setEmail(user.email);
      setPhoneno(user.phone_no);
      setLocation(user.location);

      // setIsLoading(true);

    }

    fetchUserInfo();
  }, [navigate]);

  return (
    <div className="p-50 ">
      <div className="bg-amber-100 flex flex-col items-center justify-center rounded-3xl">
        <p className="text-[40px] font-semibold">User Details</p>
        <div className="mt-5 mb-3 flex flex-col justify-between items-center w-80 ">
          <User className="w-10 h-10 scale-150 mb-5" />

          {/* User Info */}
          <div className="flex flex-col items-center justify-center">
            <p> Username: {Username}</p>
            <p> Email :{Email}</p>
            <p> Phone No. : {Phoneno}</p>
            <p> Location: {Location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
