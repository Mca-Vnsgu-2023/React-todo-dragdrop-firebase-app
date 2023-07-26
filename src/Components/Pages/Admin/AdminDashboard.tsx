import { useEffect, useState } from 'react'
import { Button, Navbar, NavItem } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'


const AdminDashboard = () => {
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

    const Member = () => {
        navigate('/Admindashboard/member')
    }

    // const Project=()=>{
    //     navigate('/Admindashboard/project')
    // }

  return (
    <div>
        <Navbar className="navbar navbar-dark bg-primary">
                <Navbar.Brand className='container'>
                 <Link to={`/Admindashboard`}  style={{color:'white', textDecoration:'none'}}>Admin Management</Link>
                </Navbar.Brand>

                <NavItem>
                    <Button  onClick={() => Member()}>Members</Button>
                </NavItem>

                <h5>
                    Welcome, {user ? user : "Admin"}
                </h5>&nbsp;

                <NavItem>
                    <Button onClick={() => Logout()}>LogOut</Button>
                </NavItem>

            </Navbar>
            <br />
            <div>
{/*               
                    <div className="container row">
                        <div className="col-2">
                            <h6 style={{ textAlign: "left" }}>Member</h6>
                            <h6 style={{ textAlign: "left" }}>Project</h6>
                            
                        </div>
                        <div className="col-10" ></div>
                    </div> */}
              
            </div>
        
    </div>
  )
}

export default AdminDashboard