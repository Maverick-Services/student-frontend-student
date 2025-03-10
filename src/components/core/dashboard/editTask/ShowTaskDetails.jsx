import React from "react";
import { motion } from "framer-motion";
import { formattedFullDate } from "../../../../utils/dateFormatter";

export const ShowTaskDetails = ({ task, members, setShowDetails, showDetails }) => {
  // Keep the existing logic
  const getAssignedName = (id) => {
    const assignedEmp = members?.filter((mb) => mb?._id === id)[0]?.name;
    return assignedEmp;
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-md p-3 py-6 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Row */}
        <div className="w-full flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1C398E]">Task Details</h1>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-[#1C398E] text-white px-4 py-2 rounded-md hover:bg-[#142A6E] transition"
          >
            Edit
          </button>
        </div>

        {/* Task Info Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 py-4">
          <div className="flex items-start gap-3">
            <p className="text-gray-600 font-medium">Status: </p>
            <p className="text-gray-800">{task?.status}</p>
          </div>
          <div className="flex items-start gap-3">
            <p className="text-gray-600 font-medium">Created At: </p>
            <p className="text-gray-800">{formattedFullDate(task?.createdAt)}</p>
          </div>
          <div className="flex items-start gap-3">
            <p className="text-gray-600 font-medium">Name: </p>
            <p className="text-gray-800">{task?.name}</p>
          </div>
          <div className="flex items-start gap-3">
            <p className="text-gray-600 font-medium">Description: </p>
            <p className="text-gray-800">{task?.description}</p>
          </div>
          <div className="flex items-start gap-3">
            <p className="text-gray-600 font-medium">Client Name: </p>
            <p className="text-gray-800">{task?.clientName}</p>
          </div>
          <div className="flex items-start gap-3">
            <p className="text-gray-600 font-medium">Deadline: </p>
            <p className="text-gray-800">{formattedFullDate(task?.deadline)}</p>
          </div>
        </div>

        {/* Steps Table */}
        {task?.steps && task?.steps?.length > 0 && (
          <div className="w-full py-4 flex flex-col gap-3">
            <p className="text-lg font-bold text-[#1C398E]">Steps:</p>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Sno</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Assigned To</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {task?.steps?.map((st, id) => (
                    <motion.tr
                      key={id}
                      className="text-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: id * 0.1 }}
                    >
                      <td className="p-2 border">{id + 1}</td>
                      <td className="p-2 border">{st?.name}</td>
                      <td className="p-2 border">{st?.description}</td>
                      <td className="p-2 border">{getAssignedName(st?.assignedTo)}</td>
                      <td className="p-2 border">{st?.status}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
