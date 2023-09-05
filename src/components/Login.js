import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      setError("Please fill all the fields");
      return;
    }
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  const toogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] font-jetbrains">
      <form className="flex flex-col justify-center items-center">
        <fieldset>
          <legend className="text-center text-4xl font-bold mb-2">Login</legend>
          <div className="flex flex-col justify-center text-2xl">
            <div className="flex flex-col justify-center my-2">
              <div>
                <label>Email</label>
              </div>
              <div className="flex flex-row items-center justify-center border-[1px] border-black rounded-[5px]">
                <input
                  type="email"
                  required
                  className="focus:outline-none m-[5px]"
                  onChange={(event) =>
                    setUserData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col justify-center my-2">
              <div className="flex flex-row justify-between items-center">
                <label>Password</label>
                {showPassword ? (
                  <EyeOff
                    className="cursor-pointer"
                    onClick={toogglePassword}
                  />
                ) : (
                  <Eye className="cursor-pointer" onClick={toogglePassword} />
                )}
              </div>
              <div className="flex flex-row items-center justify-center border-[1px] border-black rounded-[5px]">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="focus:outline-none m-[5px]"
                  onChange={(event) =>
                    setUserData((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex align-center justify-center my-2 text-[#ff0e0e] text-lg">
              {error}
            </div>
            <div className="flex align-center justify-center my-2">
              <input
                type="submit"
                value="Login"
                className="cursor-pointer bg-[#C77DFF] p-[5px] rounded-[8px] w-[320px] "
                onClick={handleLogin}
              />
            </div>
            <div className="flex flex-row align-center justify-center text-lg">
              Don't have an account?
              <Link to="/signup" className="cursor-pointer text-[#d62828]">
                Signup
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
