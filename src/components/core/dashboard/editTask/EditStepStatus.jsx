import React, { useContext, useState } from 'react';
import { motion } from "framer-motion";
import { AuthContext } from '../../../../Context/AuthContext';
import { STATUS } from '../../../../utils/constants';
import { editStepDetails } from '../../../../services/operations/userAPI';

export const EditStepStatus = ({task,members}) => {
  
  const {user,token} = useContext(AuthContext);
  const [editStep,setEditStep] = useState(null);

  const statusInputChangeHandler = (e) => {
    setEditStep({
      ...editStep,
      status: e.target.value
    });
  };

  const updateStepStatus = async(e)=>{
    e.preventDefault();
    // console.log(editStep);
    const result = await editStepDetails(editStep,token);
    if(result){
      setEditStep(null);
    }
  }

  // Keep the existing logic
  const getAssignedName = (id) => {
    const assignedEmp = members?.filter((mb) => mb?._id === id)[0]?.name;
    return assignedEmp;
  };

  return (
      <motion.div
        /** 
         * Framer Motion for a smooth fade-in & slide-up effect
         */
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-4xl mx-auto bg-white shadow-md rounded-md p-3 py-6 md:p-6 overflow-x-auto'
      >
        {/* Steps Table */}
        {task?.steps && task?.steps?.length > 0 && (
          <div className="w-full py-4 flex flex-col gap-3">
            <p className="text-lg font-bold text-[#1C398E]">Steps:</p>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-[#1C398E] text-white">
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Assigned To</th>
                    <th className="p-2 border">Status</th>
                    {/* <th className="p-2 border">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {task?.steps?.map((st, id) => (
                    st?.assignedTo === user?._id &&
                    <motion.tr
                      key={id}
                      className={`text-center`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: id * 0.1 }}
                    >
                      <td className="p-2 border">{st?.name}</td>
                      <td className="p-2 border">{st?.description}</td>
                      <td className="p-2 border">{getAssignedName(st?.assignedTo)}</td>
                      <td className="p-2 border">
                        <form onSubmit={updateStepStatus} className='flex max-lg:flex-col items-center justify-evenly gap-2'>
                          <select
                            onChange={(e) => statusInputChangeHandler(e,st?._id)}
                            defaultValue={st?.status ? st?.status : STATUS.PENDING}
                            disabled={editStep && editStep?.stepId === st?._id ? false : true}
                            name="status"
                            id="status"
                            className={`
                              ${editStep ? "outline" : "outline-none"}
                              border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]  
                            `}
                          >
                          {
                            Object.values(STATUS).map((s,index)=>{
                              return <option key={index} value={s}>
                                      {s}
                                  </option>
                            })
                          }
                          </select>
                          {
                            editStep?.stepId !== st?._id &&
                            <button type='button'
                              className="px-4 py-2 self-cente bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                              onClick={() => {
                                setEditStep({
                                  ...st,
                                  stepId: st?._id,
                                });
                              }}
                            >
                              Edit Status
                            </button>
                          }

                          {
                            editStep?.stepId === st?._id &&
                            <button type='submit'
                              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"              
                            >
                              Update Status
                            </button>
                          }
                        </form>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
  )
}