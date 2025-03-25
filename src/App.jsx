import './App.css'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Profile } from './components/core/dashboard/Profile'
import MyTasks from './components/core/dashboard/MyTasks'
import { Login } from './pages/Login'
import OpenRoute from './components/core/auth/OpenRoute'
import PrivateRoute from './components/core/auth/PrivateRoute'
import { EditTaskDetails } from './components/core/dashboard/editTask/EditTaskDetails'
import FeeDetails from './components/core/dashboard/FeeDetails'
import { AddQuery } from './components/core/dashboard/AddQuery'
import Queries from './components/core/dashboard/Queries'
import { ProfileDetails } from './components/core/dashboard/ProfileDetails'

function App() {
  return (
    <div id='wrapper' className='bg-gray-200'>
      {/* Employee */}
      <Routes>
        <Route path='/' element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        } />
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/' element={<Profile/>}/>
          <Route path='/dashboard/tasks' element={<MyTasks/>}/>
          <Route path='/dashboard/tasks/:taskId' element={<EditTaskDetails/>}/>
          <Route path='/dashboard/fees' element={<FeeDetails/>}/>
          <Route path='/dashboard/addQuery' element={<AddQuery/>}/>
          <Route path='/dashboard/queries' element={<Queries/>}/>
          <Route path='/dashboard/settings' element={<ProfileDetails/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
