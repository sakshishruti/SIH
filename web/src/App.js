import { createContext, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useImmer } from "use-immer";
import { AnimatePresence } from "framer-motion";

import SignIn from "./components/Auth";
import Home from "./components/Home";
import Snackbar from "./components/Reusable/Snackbar";
import Navbar from "./components/Home/Navbar";
import Contact from "./components/Contact";
import Track from "./components/Track";
import TrackCar from "./components/Track/Track";

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export default function App() {
  const [user, setUser] = useImmer({
    isAuthenticated: Boolean(localStorage.getItem("user")),
    info: JSON.parse(localStorage.getItem("user")) || {
      username: "",
      password: "",
      name: "",
    },
    snackbar: {
      message: "",
      open: false,
      type: "error",
    },
  });
  const location = useLocation();
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Snackbar />

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/auth" element={<SignIn />} />
          <Route
            path="/"
            element={
              user.isAuthenticated ? (
                <>
                  <Navbar />
                  <Home />
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          >
            <Route path="/" element={<Track />} />
            <Route path="contact" element={<Contact />} />
            <Route path="track" element={<TrackCar />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AppContext.Provider>
  );
}
