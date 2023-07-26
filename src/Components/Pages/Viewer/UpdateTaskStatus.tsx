import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Stores/ConfigureStore';
import { AllTodos, GetByIdTodo, UpdateTodo } from '../../../Stores/Todo/Todo.action';

interface Todoitem {
    TodoName: string,
    Description: string,
    Status: string,
    projectId: string
}

export interface Props {
    projectid: string | undefined;
    todoid: string | undefined;
    handleClose: (open: any) => void;
}


const UpdateTaskStatus = (props:Props) => {

    const { projectid, todoid, handleClose } = props;
    const ProjectId=String(projectid)

    const initaialvalue = {
        TodoName: "",
        Description: "",
        Status: "0",
        projectId: ProjectId
    }

    const dispatch: any = useDispatch()

    const [inputs, setInputs] = useState(initaialvalue)

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value })
    }

    const TodoList = useSelector((state: RootState) => state.TodoReducer.todoname)

      useEffect(() => {
        if (todoid) {
          dispatch(GetByIdTodo(todoid))
        }
      }, [todoid])

      useEffect(() => {
        if (todoid) {
          if (TodoList) {
            setInputs({ ...inputs, TodoName: TodoList.TodoName, Description: TodoList.Description, Status: TodoList.Status })
          }
        }
      }, [TodoList])

    const EditTodo = (inputs: Todoitem) => {
        if (todoid) {
          dispatch(UpdateTodo(todoid, inputs, ProjectId))
          handleClose(false)
          dispatch(AllTodos())
        }
        
      }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        return EditTodo(inputs)
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>

            <label>TodoName:</label>
                <input className="form-control" type="text" name="TodoName" placeholder="Enter Todo" value={inputs.TodoName} />
                <br />
                <label>Description:</label>
                <input className="form-control" type="text" name="Description" placeholder="Enter Description" value={inputs.Description} />
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

export default UpdateTaskStatus