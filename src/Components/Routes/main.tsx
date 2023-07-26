import { Route, Routes } from "react-router-dom"
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home"
import MemberList from "../Pages/Member/MemberList";
import Project from "../Pages/ProjectAdmin/Project";
import ProjectList from "../Pages/Member/ProjectList";
import TodoTaskList from "../Pages/Member/TodoTaskList";
import Login from "../Pages/User/Login/Login";
import SignUp from "../Pages/User/SignUp/SignUp";
import ProjectDashboard from "../Pages/ProjectAdmin/ProjectDashboard";
import TodoList from "../Pages/ProjectAdmin/TodoList";
import ViewerDashboard from "../Pages/Viewer/ViewerDashboard";
import ViewerTaskList from "../Pages/Viewer/ViewerTaskList";


const Main=()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path='/login' element={<Login/>} ></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/Admindashboard' element={<AdminDashboard/>}></Route>
            <Route path='/Admindashboard/member' element={<MemberList/>}></Route>
            <Route path='/Admindashboard/member/:userid/:username' element={<ProjectList/>}></Route>
            <Route path='/Admindashboard/:projectid/:projectname' element={<TodoTaskList/>}></Route>
            <Route path='/Projectdashboard' element={<ProjectDashboard/>}></Route>
            <Route path='/Projectdashboard/project' element={<Project/>}></Route>
            <Route path='/Viewerdashboard' element={<ViewerDashboard/>}></Route>
            <Route path='/Viewerdashboard/Task' element={<ViewerTaskList/>}></Route>
            <Route path='/Projectdashboard/:projectid/:projectname' element={<TodoList/>}></Route>
            <Route path='/dashboard/:projectid/:projectname' element={<Dashboard/>}></Route>
        </Routes>
    );
}

export default Main