import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React from 'react'
import MyModal from "../../Modal/MyModal";
import AddTaskForm from "./AddTask";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../Stores/ConfigureStore";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Menu, MenuItem } from "@mui/material";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { DeleteTodo, GetTodoTask, UpdateTodo } from "../../../Stores/Todo/Todo.action";
import Swal from "sweetalert2";


interface TodoItem {
    todoName: string
    description: string,
    projectid: string,
    status: string,
    todoid: string,
}

const DisplayTodoList = () => {

    const { projectid, projectname } = useParams();
    const Projectid = String(projectid)
    const dispatch: any = useDispatch()
    const [open, setopen] = useState(false);
    const showTaskModal = (open: boolean) => {
        setopen(open)
    }

    const [show, setshow] = useState(false);
    const showOrHideDialog = (show: boolean) => {
        setshow(show)
    }
    const [editTodo, setEditTodo] = useState<string>()

    const [todo, setTodo] = useState<TodoItem[]>([])
    const [progress, setProgress] = useState<TodoItem[]>([])
    const [done, setDone] = useState<TodoItem[]>([])
    const TodoList = useSelector((state: RootState) => state.TodoReducer.List)

    useEffect(() => {

        if (Projectid) {
            dispatch(GetTodoTask(Projectid))
        }
    }, [Projectid])

    const updateTodo = (id: string) => {
        showOrHideDialog(true)
        setEditTodo(id)
    }

    const deleteTodoTask = (id: string) => {
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
                dispatch(GetTodoTask(Projectid))
            } else if (
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

    useEffect(() => {

        if (Array.isArray(TodoList)) {
            setTodo(TodoList.filter((x) => x.Status == "0"))
            setProgress(TodoList.filter((x) => x.Status == "1"))
            setDone(TodoList.filter((x) => x.Status == "2"))
        }
    }, [TodoList])

    const taskStatus = {
        toDo: {
            id: "0",
            status: "To do",
            items: todo
        },
        inProgress: {
            id: "1",
            status: "In Progress",
            items: progress
        },
        done: {
            id: "2",
            status: "Done",
            items: done
        }
    };

    const [columns, setColumns] = useState(taskStatus);

    useEffect(() => {
        if (taskStatus) {
            setColumns(taskStatus)
        }
    }, [todo])


    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const updateObj = (TodoList.find((x: any) => x.TodoId == result.draggableId))
            const updateStatus = ({ ...updateObj, Status: destination.droppableId })
            dispatch(UpdateTodo(result.draggableId, updateStatus, Projectid))

        }

    };

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        padding: 5,
        margin: '20px',
        background: isDragging ? "#4a2975" : "white",
        color: isDragging ? "white" : "black",
        // border: `1px solid black`,
        fontSize: `15px`,
        borderRadius: `5px`,

        ...draggableStyle
    })


    return (
        <div>
            <div>
                <h2 style={{ textAlign: "left" }}>{projectname}</h2>
                <h5>Add Todo <Button size="sm" onClick={() => showTaskModal(true)} disabled={!projectname}><FontAwesomeIcon icon={faPlus} /></Button></h5>

                <div className='container'
                    style={{ display: "flex", justifyContent: "center", height: "100%" }}
                >
                    <DragDropContext
                        onDragEnd={(result) => onDragEnd(result)}
                    >
                        {Object.entries(columns).map(([columnName, columnList]) => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "left"
                                    }}
                                    key={columnName}
                                >
                                    <div style={{ margin: 8 }} >
                                        <Droppable droppableId={columnList.id} key={columnName}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            background: snapshot.isDraggingOver
                                                                ? "lightblue"
                                                                : "lightgrey",
                                                            padding: 4,
                                                            width: 250,
                                                            minHeight: 500
                                                        }}
                                                    ><h4>{columnList.status}</h4><hr />
                                                        {columnList.items.map((t: any, index: any) => {
                                                            return (
                                                                <Draggable
                                                                    key={t.TodoId}
                                                                    draggableId={`${t.TodoId}`}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                                            >
                                                                                <div><h5>{t.TodoName}
                                                                                    <PopupState variant="popover" popupId="demo-popup-menu">
                                                                                        {(popupState) => (
                                                                                            <React.Fragment>
                                                                                                <Button size="sm" variant="contained" {...bindTrigger(popupState)}>
                                                                                                    <FontAwesomeIcon icon={faEllipsis} />
                                                                                                </Button>
                                                                                                <Menu {...bindMenu(popupState)} onClick={popupState.close}>
                                                                                                    <MenuItem onClick={() => updateTodo(t.TodoId)} sx={{ color: "Green" }}><FontAwesomeIcon icon={faEdit} />Edit</MenuItem>
                                                                                                    <MenuItem onClick={() => deleteTodoTask(t.TodoId)} sx={{ color: "red" }}><FontAwesomeIcon icon={faTrashAlt} />Delete</MenuItem>
                                                                                                </Menu>
                                                                                            </React.Fragment>
                                                                                        )}
                                                                                    </PopupState>
                                                                                </h5>
                                                                                </div>
                                                                                <div>{t.Description}</div>
                                                                                <div>{t.Status}</div>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </div>
            </div>
            <MyModal show={show} handleClose={() => showOrHideDialog(false)} title={'Update Todo'}>
                <AddTaskForm projectid={Projectid} todoid={editTodo} handleClose={(open1) => showOrHideDialog(open1)} />
            </MyModal>

            <MyModal show={open} handleClose={() => showTaskModal(false)} title={'Add Todo'}>
                <AddTaskForm projectid={Projectid} todoid={undefined} handleClose={(open) => showTaskModal(open)} />
            </MyModal>

        </div>

    )
}

export default DisplayTodoList