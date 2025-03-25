import React, { useContext } from "react";
import { motion } from "framer-motion";
// import { AuthContext } from "../../../Context/AuthContext";
import { ChartComponent } from "./ProfileChart";
import LayoutProvider from "../../common/LayoutProvider";
import { CLASSES, ROUTES } from "../../../utils/constants";

export const ProfileDetails = () => {

    const user = {
        name: "Abhay Gupta",
        email: "abhaygupta.kiit@gmail.com",
        phoneNumber: "8700381153",
        fatherName: "Santosh Gupta",
        motherName: "Ritu Gupta",
        class: "640fe1e2f8a7d64f7b6e4a18",
        route: "ROUTE-12 (SEC-17A, Sec-17C, Bus Stand)"
    }
    const getClass = (id) => {
        const classData = CLASSES?.filter(cl => cl?._id === id)[0];
        // console.log(classData);
        return classData;
    }

  const getRoute = (route) => {
    const routeData = ROUTES?.filter(rt => rt?.route === route)[0];
    // console.log(classData);
    return routeData;
  }

  return (
    <LayoutProvider heading={'Academic Year 2025-26'}>
      <div className="w-full flex flex-col gap-3 lg:items-center justify-center">
        <motion.div
          className="w-full h-full flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        > 
          {/* Profile Header */}
          <motion.h1
            className="text-3xl font-bold sm:font-bold text-[#1C398E] pb-2 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Profile Details
          </motion.h1>

          {/* Profile Details */}
          <div className="space-y-4 w-full md:w-[50%] py-4 flex items-stretch flex-col justify-center gap-2">
            <ProfileItem label={"Name"} value={user?.name} />
            <ProfileItem label={"Email"} value={user?.email} />
            <ProfileItem label={"Contact No"} value={user?.phoneNumber} />
            <ProfileItem label={"Father's Name"} value={user?.fatherName} />
            <ProfileItem label={"Mother's Name"} value={user?.motherName} />
            <ProfileItem label={"Class"} value={getClass(user?.class)?.class_name} />
            <ProfileItem label={"Bus Route"} value={getRoute(user?.route)?.route} />
          </div>

          {/* Notice Board */}
          {/* <motion.div
            className="w-full h-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.h1
                className="text-3xl font-bold sm:font-bold text-[#1C398E] pb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
              Queries
            </motion.h1>
            <div className="w-full min-h-[200px] flex flex-col items-center justify-center p-4 bg-white shadow-sm gap-4 rounded-sm">
              <p className="text-center">          
                No Queries Yet
              </p>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </LayoutProvider>
  )
};

// Profile Item Component
const ProfileItem = ({ label, value }) => {
  return (
    <motion.div
      className="max-sm:w-full flex gap-2 justify-between items-center shadow-sm bg-white p-4 px-6 rounded-lg hover:bg-gray-50 transition border border-gray-50 cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg text-center font-bold text-[#1C398E]">{label}:</h3>
      <p className="text-lg text-center text-gray-900 font-medium">{value}</p>
    </motion.div>
  );
};
