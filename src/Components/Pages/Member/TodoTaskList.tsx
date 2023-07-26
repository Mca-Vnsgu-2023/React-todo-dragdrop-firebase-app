import { Table } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../Stores/ConfigureStore'
import { GetTodoTask } from '../../../Stores/Todo/Todo.action'
import AdminDashboard from '../Admin/AdminDashboard'

const TodoTaskList = () => {

    const { projectid, projectname } = useParams()
    const ProjectId = String(projectid)

    const dispatch: any = useDispatch()

    const TodoList = useSelector((state: RootState) => state.TodoReducer.List)

    useEffect(() => {

        if (ProjectId) {
            dispatch(GetTodoTask(ProjectId))
        }
    }, [ProjectId])

    return (
        <div>
            <div><AdminDashboard /></div>
            <h3 style={{ textAlign: 'left' }}> Project : {projectname}</h3>
            <hr />
            <div className='container'>
                <Table className="table">
                    <tr>
                        <th>TaskName</th>
                        <th>Description</th>
                        <th>status</th>
                    </tr>
                    <tbody>
                        {TodoList.length > 0 ?
                            TodoList.map((t: any, index: number) =>
                                <tr key={"row" + index}>
                                    <td>{t.TodoName}</td>
                                    <td>{t.Description}</td>
                                    <td>{t.Status}</td>
                                </tr>
                            )
                            : <td colSpan={3}>No Records Found</td>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TodoTaskList