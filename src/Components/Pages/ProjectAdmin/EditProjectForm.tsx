import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Stores/ConfigureStore';
import { AllProject, GetAllProject, GetByIdProject, UpdateProject } from '../../../Stores/Project/Project.action';

interface Project {
    projectName: string,
    userId: string | null;
}

export interface Props {
    projectid: string | undefined;
    handleClose: (open: any) => void;
    userid: string | undefined;
}

const EditProjectForm = (props: Props) => {

    const { projectid, userid, handleClose } = props
    const UserId = String(userid)

    const dispatch: any = useDispatch();
    const initialState = {
        projectName: '',
        userId: UserId
    };
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
        if (projectid) {
            if (ProjectName) {
                setInputs({ ...inputs, projectName: ProjectName })
            }
        }
    }, [ProjectName])

    const EditProject = (inputs: Project) => {
        if (projectid) {
            dispatch(UpdateProject(projectid, inputs, UserId))
            handleClose(false)
            dispatch(AllProject())
        }
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        return EditProject(inputs) 

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>ProjectName:</label>
                <input className="form-control" type="text" name="projectName" placeholder="Enter Project Name" value={inputs.projectName} onChange={handleChange} />
                <br />
                <button type="submit" className='btn btn-primary' >Save</button>
            </form>

        </div>
    )
}

export default EditProjectForm