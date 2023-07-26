
import { Table } from '@mui/material'
import { useEffect, useState } from 'react'
import { db } from '../../../Fire-config'
import AdminDashboard from '../Admin/AdminDashboard'
import { useNavigate } from 'react-router-dom'

const MemberList = () => {

    
    const navigate = useNavigate()
    const [info, setInfo] = useState<any[]>([]);

    useEffect(() => {
        Fetchdata();
    }, [])

    const Fetchdata = () => {
        db.collection("users").where("role","==", "User").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var userdata = element.data();
                setInfo(arr => [...arr, userdata]);
            });
        })
    }

    const UserData = (userid: string, userName: string) => {
        navigate(`/Admindashboard/member/${userid}/${userName}`)
      }

    return (
        <div>
            <div><AdminDashboard/></div>
            <div className='container'>
                <Table className="table">
                    <tr>
                        <th>UserName</th>
                    </tr>
                    <tbody>
                        {info.map((u: any, index: number) =>
                            <tr key={"row" + index}>
                                <td onClick={() => UserData(u.id, u.userName)}>{u.userName}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MemberList

