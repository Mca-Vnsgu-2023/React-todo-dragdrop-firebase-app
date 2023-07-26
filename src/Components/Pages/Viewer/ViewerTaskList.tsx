import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Stores/ConfigureStore'
import { AllTodos } from '../../../Stores/Todo/Todo.action'
import MyModal from '../../Modal/MyModal'
import { StyledEditButton } from '../ProjectAdmin/styles'
import UpdateTaskStatus from './UpdateTaskStatus'
import ViewerDashboard from './ViewerDashboard'

const ViewerTaskList = () => {
    const dispatch: any = useDispatch()

    const [show, setshow] = useState(false)
    const showOrHideDialog = (show: boolean) => {
        setshow(show)
    }

    const [editTodo, setEditTodo] = useState<string>()
    const [editProjectid, setEditProjectid] = useState<string>()

    const [infoData, setInfoData] = useState([])

    const TodoList = useSelector((state: RootState) => state.TodoReducer.List)

    useEffect(() => {
        dispatch(AllTodos())
    }, [])

    useEffect(() => {
        setInfoData(TodoList)
    }, [TodoList])

    const UpdateTodo = (id: string, projectId: string) => {
        showOrHideDialog(true)
        setEditTodo(id)
        setEditProjectid(projectId)
    }

    return (
        <div>
            <div><ViewerDashboard /></div>
            <div className='container'>
                <Table className="table">
                    <tr>
                        <th>TaskName</th>
                        <th>Description</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        {infoData.map((t: any, index: number) =>
                            <tr key={"row" + index}>
                                <td>{t.TodoName}</td>
                                <td>{t.Description}</td>
                                <td>{t.Status}</td>
                                <td>
                                    <StyledEditButton onClick={() => UpdateTodo(t.TodoId, t.projectId)}><FontAwesomeIcon icon={faEdit} /></StyledEditButton>&nbsp;
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
            </div>
            <MyModal show={show} handleClose={() => showOrHideDialog(false)} title={'Update Todo'}>
                <UpdateTaskStatus projectid={editProjectid} todoid={editTodo} handleClose={(open1) => showOrHideDialog(open1)} />
            </MyModal>
        </div>
    )
}

export default ViewerTaskList