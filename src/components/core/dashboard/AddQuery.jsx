import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LayoutProvider from "../../common/LayoutProvider";
import { STUDENTS } from "../../../utils/constants";
import { getRandomId } from "../../../utils/randomIdGenerator";

export const AddQuery = ({ team, editTeam, setShowTeamDetails, showTeamDetails }) => {
  const navigate = useNavigate();
  const { admin,token, teams, setTeams, queries, setQueries } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const queryFormSubmitHandler = async(data) => {
    data = {
      ...data,
      _id: getRandomId(),
      createdAt: Date.now(),
      status: "In Review",
      student:STUDENTS[0]?._id,
    };

    const response = data;
    if (response) {
      // console.log("Team created Successfully", response);
      setQueries(prev => (
        [
          ...prev,
          response
        ]
      ))
      navigate("/dashboard/queries");
    }
  };

  return (
    <LayoutProvider heading={'Manage Queries'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-lg flex flex-col gap-6"
      >
        {/* Heading */}
        <div className="w-full flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1C398E]">{editTeam ? "Edit" : "Add"} Queries</h1>
          {
            editTeam && <button
            onClick={() => setShowTeamDetails(!showTeamDetails)}
            className="bg-[#1C398E] text-white px-4 py-2 rounded-md hover:bg-[#142A6E] transition"
          >
            Cancel
          </button>
          }
        </div>
        
        {/* Form */}
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(queryFormSubmitHandler)}
        >
          {/* Query Subject */}
          <div className="flex items-center gap-4">
            <label className="w-40 font-medium text-gray-700">Query Subject</label>
            <input
              type="text"
              {...register("subject", { required: true })}
              className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
            />
          </div>

          {/* Query Description */}
          <div className="flex items-center gap-4">
            <label className="w-40 font-medium text-gray-700">Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#1C398E] text-white py-3 rounded-md font-semibold hover:bg-[#142A6E] transition"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </LayoutProvider>
  );
};
