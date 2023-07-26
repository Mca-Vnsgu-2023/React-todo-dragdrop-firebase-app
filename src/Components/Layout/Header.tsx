import React from 'react'
import { Button, Navbar, NavItem } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Header() {

const navigate=useNavigate()

const Login=()=>{
    navigate('/login')
}

const Signup=()=>{
    navigate('/signup')
}

    return (
        <div>
            <Navbar bg="dark" variant="dark">
             
                    <Navbar.Brand  className='container' onClick={()=>Login()}>
                        Project Management
                    </Navbar.Brand>
                  
                    <NavItem>
                        <Button  onClick={()=>Login()}>Login</Button>&nbsp;
                        <Button  onClick={()=>Signup()}>Signup</Button>
                    </NavItem>
                   
            </Navbar>
        </div>
    )
}

export default Header