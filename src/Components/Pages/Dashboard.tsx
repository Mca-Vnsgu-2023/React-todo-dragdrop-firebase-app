import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Navbar, NavItem } from 'react-bootstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate } from 'react-router-dom'
import MyModal from '../Modal/MyModal'
import AddProject from './Projects/AddProject';
import DisplayList from './Projects/DisplayList';
import DisplayTodoList from './Task/DisplayTodoList';


const Dashboard = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const showOrHideDialog = (show: boolean) => {
        setShow(show)
    }
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

    return (
        <div>
            <Navbar className="navbar navbar-dark bg-primary">
                <Navbar.Brand className='container'>
                    Project Management
                </Navbar.Brand>

                <h5>
                    Welcome, {user ? user : "User"}
                </h5>&nbsp;

                <NavItem>
                    <Button onClick={() => Logout()}>LogOut</Button>
                </NavItem>

            </Navbar>
            <br />
            <div>
                <Grid>
                    <div className="container row">
                        <div className="col-2 panel">
                            <h5 style={{ textAlign: "left" }}>My Project &nbsp;<Button size="sm" onClick={() => showOrHideDialog(true)}><FontAwesomeIcon icon={faPlus} /></Button></h5>
                            <DisplayList/>
                        </div>
                        <div className="col-10" ><DisplayTodoList/></div>
                    </div>
                </Grid>
            </div>

            <MyModal show={show} handleClose={() => showOrHideDialog(false)} title={'Add Project'}>
                <AddProject projectid={undefined} handleClose={(open) => showOrHideDialog(open)} />
            </MyModal>

        </div>
    )
}

export default Dashboard