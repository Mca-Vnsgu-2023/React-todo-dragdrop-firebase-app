import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Stores/ConfigureStore';
import { addproject, GetByIdProject, UpdateProject } from '../../../Stores/Project/Project.action';

interface Project {
    projectName: string,
    userId: string | null
  }

export interface Props {
    projectid: string | undefined;
    handleClose: (open: any) => void;
    // handleAfterSubmit: () => void
}

const AddProject = (props: Props) => {
    const { projectid,handleClose} = props
    const userid:any = localStorage.getItem("UserId")

    const initialState = {
        projectName: '',
        userId: userid
    };
    const dispatch: any = useDispatch();
    const [inputs, setInputs] = useState(initialState);

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value })
    }
    
    const ProjectName = useSelector((state: RootState) => state.ProjectReducer.projectname.projectName)

    useEffect(() => {
        if (projectid) {
          dispatch(GetByIdProject(projectid))
        }
      }, [projectid])
    
      useEffect(() => {
        if(projectid){
          if (ProjectName) {
            setInputs({...inputs,projectName:ProjectName})
          }
        }
      }, [ProjectName])

    const AddProject = (inputs:Project) => {
        dispatch(addproject(inputs,userid));
        handleClose(false)
    }

    const EditProject = (inputs: Project) => {
        if (projectid) {
          dispatch(UpdateProject(projectid, inputs,userid))
          handleClose(false)
          
        }
      }

    const submitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        return projectid == undefined ? AddProject(inputs) : EditProject(inputs)

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>ProjectName:</label>
                <input className="form-control" type="text" name="projectName" placeholder="Enter Project Name" value={inputs.projectName} onChange={handleChange} />
                <br />
                <button type="submit" className='btn btn-primary'>Save</button>
            </form>

        </div>
    )
}

export default AddProject

