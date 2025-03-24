import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";
import { ChartComponent } from "./ProfileChart";
import LayoutProvider from "../../common/LayoutProvider";

export const Profile = () => {

  const {user} = useContext(AuthContext);
  // console.log(admin)

  
  const getRandomColors = (numColors)=>{
    const colors = [];
    for(let i=0; i<numColors; i++){
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
      // console.log(color);
      colors.push(color);
    }
    return colors;
  }

  const chartData1 = {
    labels: ["Fees Paid","Fees Remaining"],
    datasets:[
      {
        data: [35000,15000],
        backgroundColor: getRandomColors(3)
      }
    ]
  }
  
  const chartData2 = {
    labels: ["Installments Paid","Installments Remaining"],
    datasets:[
      {
        data: [7,5],
        backgroundColor: getRandomColors(2)
      }
    ]
  }

  return (
    <LayoutProvider heading={'Academic Year 2025-26'}>
    <div className="w-full flex flex-col gap-3 lg:items-center justify-center">
      <motion.div
        className="w-full h-full flex flex-col gap-4 items-start"
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
          Welcome {user?.name}👋
        </motion.h1>

        {/* Profile Details */}
        <div className="space-y-4 w-full py-4 flex items-center max-lg:flex-col justify-center gap-2">
          <ChartComponent data={chartData1} />
          <ChartComponent data={chartData2} />
        </div>

        {/* Notice Board */}
        <motion.div
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
        </motion.div>
      </motion.div>
    </div>
    </LayoutProvider>
  );
};

// Profile Item Component
const ProfileItem = ({ label, value, img }) => {
  return (
    <motion.div
      className="max-sm:w-full flex flex-col gap-2 justify-between items-center shadow-sm bg-white p-4 px-6 rounded-lg hover:bg-gray-50 transition border border-gray-50 cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <div className="">
        <img src={img} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-lg text-center font-semibold text-[#374151]">{label}</h3>
      <p className="text-lg text-center text-gray-900 font-medium">{value}</p>
    </motion.div>
  );
};

// export default Profile;
