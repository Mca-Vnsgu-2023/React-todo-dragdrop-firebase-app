import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { RootState } from '../../../Stores/ConfigureStore'
import { AllTodos, DeleteTodo, GetTodoTask } from '../../../Stores/Todo/Todo.action'
import MyModal from '../../Modal/MyModal'
import AddTaskForm from '../Task/AddTask'
import ProjectDashboard from './ProjectDashboard'
import { StyledEditButton, StyledDeleteButton } from './styles'

const TodoList = () => {

    const { projectid, projectname } = useParams()
    const ProjectId = String(projectid)

    const dispatch: any = useDispatch()

    const [show, setshow] = useState(false)
    const showOrHideDialog = (show: boolean) => {
        setshow(show)
    }


    const [filterValue, setfilterValue] = useState('')

    const [editTodo, setEditTodo] = useState<string>()
    const TodoList = useSelector((state: RootState) => state.TodoReducer.List)

    const [infoData, setInfoData] = useState([])

    useEffect(() => {

        if (ProjectId) {
            dispatch(GetTodoTask(ProjectId))
        }
    }, [ProjectId])

    const UpdateTodoTask = (id: string) => {
        showOrHideDialog(true);
        setEditTodo(id)
    }

    useEffect(() => {
        setInfoData(TodoList)
    }, [TodoList])

    const DeleteTodoTask = (id: string) => {
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
                dispatch(DeleteTodo(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                dispatch(AllTodos())
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

    const handleFilter = (e: any) => {

        if (e.target.value == '') {
            setInfoData(TodoList)
        } else {

            const filterResult = TodoList.filter((item: any) => item.Status.toLowerCase().includes(e.target.value.toLowerCase()))
            setInfoData(filterResult)
        }
        setfilterValue(e.target.value)
    }

    return (
        <div>
            <div><ProjectDashboard /></div>
            <h3 style={{ textAlign: 'left' }}> Project : {projectname}</h3>
            <hr />
            <div className='container'>
                <div>
                    {/* <input type="text" name="search" placeholder='Search Status...' value={filterValue} onInput={(e) => handleFilter(e)} /> */}
                    Filter:<select name="search" value={filterValue} onChange={(e) => handleFilter(e)}>
                        <option value=''>Search Status</option>
                        <option value="0">Todo</option>
                        <option value="1">Progress</option>
                        <option value="2">Done</option>
                    </select>
                </div>
                <Table className="table">
                    <tr>
                        <th>TaskName</th>
                        <th>Description</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        {infoData.length > 0 ?
                            infoData.map((t: any, index: number) =>
                                <tr key={"row" + index}>
                                    <td>{t.TodoName}</td>
                                    <td>{t.Description}</td>
                                    <td>{t.Status}</td>
                                    <td>
                                        <StyledEditButton onClick={() => UpdateTodoTask(t.TodoId)}><FontAwesomeIcon icon={faEdit} /></StyledEditButton>&nbsp;
                                        <StyledDeleteButton onClick={() => DeleteTodoTask(t.TodoId)}><FontAwesomeIcon icon={faTrashAlt} /></StyledDeleteButton>
                                    </td>

                                </tr>
                            )
                            : <td colSpan={4}>No Records Found</td>
                        }
                    </tbody>

                </Table>
            </div>
            <MyModal show={show} handleClose={() => showOrHideDialog(false)} title={'Update Todo'}>
                <AddTaskForm projectid={ProjectId} todoid={editTodo} handleClose={(open1) => showOrHideDialog(open1)} />
            </MyModal>
        </div>
    )
}

export default TodoList