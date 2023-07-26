import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Navbar, NavItem } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const ViewerDashboard = () => {
    const navigate = useNavigate()
    const [isLogin, setisLogin] = useState(true)

    let user: any = localStorage.getItem("UserName")

    useEffect(() => {
        if (user === null) {
            setisLogin(false)
        } else {
            setisLogin(true)
        }
    }, [isLogin])

    if (!isLogin) {
        return <Navigate to="/login" />
    }

    const Logout = () => {
        localStorage.clear()
        navigate('/')
    }

    const Task=()=>{
        navigate('/Viewerdashboard/Task')
    }

  return (
    <div>
        <Navbar className="navbar navbar-dark bg-primary">
                <Navbar.Brand className='container'>
                 <Link to={`/Taskdashboard`}  style={{color:'white', textDecoration:'none'}}>Task Management</Link>
                </Navbar.Brand>

                <NavItem>
                    <Button onClick={() => Task()}>Task</Button>
                </NavItem>
                <h5>
                    Welcome, {user ? user : "Viewer"}
                </h5>&nbsp;

                <NavItem>
                    <Button onClick={() => Logout()}>LogOut</Button>
                </NavItem>

            </Navbar>
            <br />
            <div>
            </div>
        
    </div>
  )
}

export default ViewerDashboard