import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { logout } from "../services/operations/authAPI";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  return (
    <div className="w-full bg-[#1C398E] text-white flex justify-between items-center px-8 py-4 shadow-md">
      <p className="text-xl font-bold">Employee Dashboard</p>
      <button
        onClick={() => logout(navigate, setUser, setToken)}
        className="bg-white text-[#1C398E] font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
