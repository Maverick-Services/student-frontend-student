import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllEmployeeTasks } from "../../../services/operations/authAPI";
import { Spinner } from "../../common/Spinner";
import { motion } from "framer-motion";
import { formattedFullDate } from "../../../utils/dateFormatter";

const MyTasks = () => {
  const { token, loading, setLoading } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchEmployeeTasks = async () => {
    setLoading(true);
    const result = await fetchAllEmployeeTasks(token);
    if (result) {
      setTasks(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployeeTasks();
  }, []);

  if (loading || !tasks) return <Spinner />;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-[#1C398E] text-center mb-8">
        My Tasks
      </h1>
      {tasks && tasks.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No Tasks assigned to you yet
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {tasks.map((ts, index) => (
            <Link key={ts?._id} to={`/dashboard/tasks/${ts?._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.01, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Task Name: {ts?.name}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Created At:</span> {formattedFullDate(ts?.createdAt)}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Deadline:</span> {formattedFullDate(ts?.deadline)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span> {ts?.status}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
