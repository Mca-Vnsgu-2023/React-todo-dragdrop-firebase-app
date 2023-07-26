import { useEffect, useState } from 'react'
import { Button, Navbar, NavItem } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'


const ProjectDashboard = () => {
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

    const Project=()=>{
        navigate('/Projectdashboard/project')
    }

  return (
    <div>
        <Navbar className="navbar navbar-dark bg-primary">
                <Navbar.Brand className='container'>
                 <Link to={`/Projectdashboard`}  style={{color:'white', textDecoration:'none'}}>Project Management</Link>
                </Navbar.Brand>

                <NavItem>
                    <Button onClick={() => Project()}>Projects</Button>
                </NavItem>
                <h5>
                    Welcome, {user ? user : "Project"}
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

export default ProjectDashboard