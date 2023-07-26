import { Hidden } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Stores/ConfigureStore';
import { addTodo, GetByIdTodo, UpdateTodo } from '../../../Stores/Todo/Todo.action';


interface Todoitem {
    TodoName: string,
    Description: string,
    Status: string,
    projectId: string
}

export interface Props {
    projectid: string;
    todoid: string | undefined;
    handleClose: (open: any) => void;
}

const AddTaskForm = (props: Props) => {

    const { projectid, todoid, handleClose } = props;

    const initaialvalue = {
        TodoName: "",
        Description: "",
        Status: "0",
        projectId: projectid
    }

    const [inputs, setInputs] = useState(initaialvalue)

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value })
    }

    const dispatch: any = useDispatch()
      const TodoList = useSelector((state: RootState) => state.TodoReducer.todoname)

      useEffect(() => {
        if (todoid) {
          dispatch(GetByIdTodo(todoid))
          // console.log(todoid)
        }
      }, [todoid])

      useEffect(() => {
        if (todoid) {
          if (TodoList) {
            setInputs({ ...inputs, TodoName: TodoList.TodoName, Description: TodoList.Description, Status: TodoList.Status })
          }
        }
      }, [TodoList])

      const AddTask = (inputs: Todoitem) => {
        dispatch(addTodo(inputs, projectid))
        handleClose(false)
      }

      const EditTodo = (inputs: Todoitem) => {
        if (todoid) {
          dispatch(UpdateTodo(todoid, inputs, projectid))
          handleClose(false)
        }
      }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        return todoid == undefined ? AddTask(inputs) : EditTodo(inputs)
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>

                <label>TodoName:</label>
                <input className="form-control" type="text" name="TodoName" placeholder="Enter Todo" value={inputs.TodoName} onChange={handleChange} />
                <br />
                <label>Description:</label>
                <input className="form-control" type="text" name="Description" placeholder="Enter Description" value={inputs.Description} onChange={handleChange} />
                <br />
                <label>Task Status:</label>
                <select className='form-control' name="Status" value={inputs.Status} onChange={handleChange}>
                    <option value="0">Todo</option>
                    <option value="1">Progress</option>
                    <option value="2">Done</option>
                </select>
                {/* <input type="hidden" name="Status" value={inputs.Status} onChange={handleChange} readOnly /> */}
                <br />

                <button type="submit" className='btn btn-primary' >Save</button>
            </form>
        </div>
    )
}

export default AddTaskForm