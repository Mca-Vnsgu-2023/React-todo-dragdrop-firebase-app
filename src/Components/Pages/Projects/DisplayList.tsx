import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  DeleteProject, GetAllProject } from '../../../Stores/Project/Project.action'
import MyModal from '../../Modal/MyModal'
import AddProject from './AddProject'
import { faEdit, faEllipsis, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Chip, Menu, MenuItem } from '@mui/material'
import { RootState } from '../../../Stores/ConfigureStore'

const DisplayList = () => {

  const navigate = useNavigate()

  const dispatch: any = useDispatch()
  const ProjectList = useSelector((state: RootState) => state.ProjectReducer.List)
//   console.log("Demo",ProjectList)
 
  const userId: any = localStorage.getItem("UserId")  
 

  const [show, setShow] = useState(false);
  const showOrHideDialog = (show: boolean) => {
    setShow(show)
  }

  const [editProject, setEditProject] = useState<string>()
  const [projectName, setprojectName] = useState('')


  const fetchAllProject=()=>{
    dispatch(GetAllProject(userId))
  }

  useEffect(() => {
    fetchAllProject()
  }, [])

  const updateProject = (id: string) => {
    showOrHideDialog(true)
    setEditProject(id)
    // console.log(id)
  }

  
  const deleteProject = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this.!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it..!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProject(id))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        fetchAllProject()
      } 
      else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }

  const TodoTask = (projectid: string, projectName: string) => {
    navigate(`/dashboard/${projectid}/${projectName}`)
    setprojectName(projectName)
    setEditProject(projectid)
  }

  // console.log(ProjectList)
  return (
    <div>
      <table className="">
        {/* <thead>
          <tr>
            <th>ProjectName</th>

          </tr>
        </thead> */}
        <tbody>
          {ProjectList && ProjectList.map((p: any, index: number) =>
            <tr key={"row" + index}>
              <td style={{textAlign:"left"}} onClick={() => TodoTask(p.projectId, p.projectName)}>{p.projectName}</td>
              <td>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button size="sm" variant="contained" {...bindTrigger(popupState)}>
                      <FontAwesomeIcon icon={faEllipsis} />
                      </Button>
                      <Menu {...bindMenu(popupState)} onClick={popupState.close}>
                        <MenuItem onClick={() => updateProject(p.projectId)} sx={{color:"Green"}}><FontAwesomeIcon icon={faEdit} />Edit</MenuItem>
                        <MenuItem onClick={() => deleteProject(p.projectId)} sx={{color:"red"}}><FontAwesomeIcon icon={faTrashAlt} />Delete</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>

              </td>
            </tr>
          )}
        </tbody>
      </table>

      <MyModal show={show} handleClose={() => showOrHideDialog(false)} title={'Update Project'}>
        <AddProject projectid={editProject} handleClose={(open) => showOrHideDialog(open)} />
      </MyModal>

    </div>
  )
}

export default DisplayList