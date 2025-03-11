import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthContext';
import { fetchCompleteTaskDetails, fetchTeamMembers } from '../../../../services/operations/authAPI';
import { ShowTaskDetails } from './ShowTaskDetails';
import { EditStepStatus } from './EditStepStatus';

export const EditTaskDetails = () => {

  const {taskId} = useParams();
  const {token,task,editTask,setTask,setEditTask,loading,setLoading} = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [showDetails, setShowDetails] = useState(true);

  // console.log(task)
  const fetchTaskDetails = async()=>{
    setLoading(true);
    const result = await fetchCompleteTaskDetails({taskId});
    // console.log("result",result);
    if(result){
      setTask(result);
      setEditTask(true);
    }
    setLoading(false);
  }

  const fetchMemebrs = async()=>{
    setLoading(true);
    const result = await fetchTeamMembers(token,{teamId:task?.team?._id});
    if(result){
      setMembers(result);
    }
    setLoading(false);
  }

  useEffect(()=>{
    // console.log(editUser)
    if(taskId){
      fetchTaskDetails(taskId);
    }else{
      setEditTask(false);
    }
  },[taskId])
  
  useEffect(()=>{
    if(task){
      fetchMemebrs();
    }
  },[task])

  if(loading || !task || !members){
    return <p>Loading ......</p>
  }

  return (
    <div className='w-full h-full'>
      {
        showDetails && task && members &&
        <ShowTaskDetails task={task} members={members} setShowDetails={setShowDetails} showDetails={showDetails} />
      }
      
      {
        !showDetails &&
        editTask && task && members &&
        <EditStepStatus members={members} task={task} editTask={editTask}/>
      }
    </div>
  )
}
