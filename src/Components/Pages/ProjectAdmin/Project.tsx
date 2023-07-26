import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { db } from '../../../Fire-config'
import { RootState } from '../../../Stores/ConfigureStore'
import { AllProject, DeleteProject, GetAllProject } from '../../../Stores/Project/Project.action'
import MyModal from '../../Modal/MyModal'
import EditProjectForm from './EditProjectForm'
import ProjectDashboard from './ProjectDashboard'
import { StyledEditButton, StyledDeleteButton } from './styles'

const Project = () => {

  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const [open, setopen] = useState(false)
  const showOrHideDialog = (open: boolean) => {
    setopen(open)
  }

  const [editProject, setEditProject] = useState<string>()
  const [editUserid, setEditUserid] = useState<string>()
  const [filterValue, setfilterValue] = useState('')
  const [infoData, setInfoData] = useState([])

  // const fetchAllProject = () => {
  //   db.collection("project").get().then((querySnapshot) => {
  //     querySnapshot.forEach(element => {
  //       var projectdata = element.data();
  //       setInfo(arr => [...arr, projectdata]);
  //       setSearchData(arr => [...arr, projectdata]);
  //     });
  //   })
  // }

  const ProjectList = useSelector((state: RootState) => state.ProjectReducer.List)

  useEffect(() => {
    dispatch(AllProject())
  }, [])

  useEffect(() => {
    setInfoData(ProjectList)
  }, [ProjectList])

  const updateProject = (id: string, userId: string) => {
    showOrHideDialog(true)
    setEditProject(id)
    setEditUserid(userId)
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


  const ProjectData = (projectid: string, projectname: string) => {
    navigate(`/Projectdashboard/${projectid}/${projectname}`)
  }

  const handleFilter = (e: any) => {
    if (e.target.value == '') {
      setInfoData(ProjectList)
    } else {
      const filterResult = ProjectList.filter((item: any) => item.projectName.toLowerCase().includes(e.target.value.toLowerCase()))
      setInfoData(filterResult)
    }
    setfilterValue(e.target.value)
  }

  return (
    <div>
      <div><ProjectDashboard /></div>
      <div className='container'>
        <div>
          <input type="text" name="search" placeholder='Search here...' value={filterValue} onInput={(e) => handleFilter(e)} />
        </div>

        <Table className="table">
          <tr>
            <th>Project List</th>
            <th>Action</th>
          </tr>
          <tbody>
            {infoData.map((p: any, index: number) =>
              <tr key={"row" + index}>
                <td onClick={() => ProjectData(p.projectId, p.projectName)}>{p.projectName}</td>
                <td>
                  <StyledEditButton onClick={() => updateProject(p.projectId, p.userId)}><FontAwesomeIcon icon={faEdit} /></StyledEditButton>&nbsp;
                  <StyledDeleteButton onClick={() => deleteProject(p.projectId)}><FontAwesomeIcon icon={faTrashAlt} /></StyledDeleteButton>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <MyModal show={open} handleClose={() => showOrHideDialog(false)} title={'Update Todo'}>
        <EditProjectForm projectid={editProject} userid={editUserid} handleClose={(open) => showOrHideDialog(open)} />
      </MyModal>
    </div>
  )
}

export default Project