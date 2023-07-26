import { Table } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../Stores/ConfigureStore';
import { GetAllProject } from '../../../Stores/Project/Project.action';
import AdminDashboard from '../Admin/AdminDashboard';

const ProjectList = () => {

  const navigate = useNavigate()
  const { userid, username } = useParams();
  const UserId = String(userid)

  const dispatch: any = useDispatch()

  const ProjectList = useSelector((state: RootState) => state.ProjectReducer.List)

  const fetchAllProject = () => {
    dispatch(GetAllProject(UserId))
  }

  useEffect(() => {
    fetchAllProject()
  }, [])

  const ProjectData = (projectid: string, projectname: string) => {
    navigate(`/Admindashboard/${projectid}/${projectname}`)
  }

  return (
    <div>
      <div><AdminDashboard /></div>
      <h3 style={{ textAlign: 'left' }}>User : {username}</h3>
      <hr />
      <div className='container'>
        <Table className="table">
          <tr>
            <th>ProjectName</th>
          </tr>
          <tbody>
            {ProjectList.map((p: any, index: number) =>
              <tr key={"row" + index}>
                <td onClick={() => ProjectData(p.projectId, p.projectName)}>{p.projectName}</td>
              </tr>
            )}
          </tbody>

        </Table>
      </div>
    </div>
  )
}

export default ProjectList