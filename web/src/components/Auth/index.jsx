import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppContext } from "../../App";
import { SignInUser } from "../../backend";

import AnimatedComponent from "../Reusable/AnimatedComponent";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await SignInUser(user.info);
      console.log(response);
      setUser((draft) => {
        draft.isAuthenticated = true;
        draft.snackbar.message = "Logged in successfully";
        draft.snackbar.type = "success";
        draft.snackbar.open = true;
        draft.user = response;
      });
      localStorage.setItem("user", JSON.stringify(response));
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setUser((draft) => {
        draft.snackbar.message = err;
        draft.snackbar.type = "error";
        draft.snackbar.open = true;
      });
      setLoading(false);
    }
  };
  return (
    <AnimatedComponent>
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="p-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-center">
            <div className="cursor-pointer flex items-center">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <div className="text-2xl text-[ ] tracking-wide font-semibold">Madhya Pradhesh Police</div>
            </div>
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-[#295ba5] font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
            >
              Sign In
            </h2>
            <div className="mt-12">
              <form>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#295ba5]"
                    type=""
                    placeholder="MP-XXXXX"
                    value={user.info.username}
                    onChange={(e) =>
                      setUser((draft) => {
                        draft.info.username = e.target.value;
                      })
                    }
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
                    <div>
                      <a
                        className="text-xs font-display font-semibold text-[#295ba5] hover:text[#274f86]
                                cursor-pointer"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#274f86]"
                    type="password"
                    value={user.info.password}
                    onChange={(e) =>
                      setUser((draft) => {
                        draft.info.password = e.target.value;
                      })
                    }
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mt-10">
                  <button
                    className="bg-[#295ba5] text-gray-100 p-4 w-full rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-[#274f86] disabled:opacity-70
                        shadow-lg ease-in duration-100"
                    disabled={loading}
                    onClick={handleSignIn}
                  >
                    {loading ? (
                      <div className="flex justify-center">
                        <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-[#143b77]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>
              {/* <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an account ? <a className="cursor-pointer text-[#295ba5] hover:text-[#274f86]">Sign up</a>
            </div> */}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
          <img className="object-cover" src={logo} alt="img" />
        </div>
      </div>
    </AnimatedComponent>
  );
}
