import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
const User = () => {
    const [currentUser, setcurrentUser] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage['smartflow_id']) {
            setcurrentUser(JSON.parse(localStorage['smartflow_id']) || null)   
        }else{
            navigate('/')
        }
    },[])
    return currentUser
}

export default User

