import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext'
import Theme from '../../utils/themeProvider'
import logout from "../../utils/logout"
import getAuth from '../../utils/getAuth'

const Dashboard = () => {
    const { setUser, user, darkMode, toggleDarkMode } = useAppContext()

    const [didRender, setDidRender] = useState<boolean>(false)
    const [theme, setTheme] = useState<Theme>(new Theme(darkMode))

    const navigate = useNavigate()

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    }, [darkMode])

    useEffect(()=>{
        const getAuthHelper = async () => {
            const response = await getAuth()
            if (response.id){
                setUser(response)
            } else {
                console.error("User is Authenticated but getAuth failed")
            }
        }
        if (user === null && !didRender) {
            setDidRender(true)
            getAuthHelper()
        }
    },[])

    const handleLogout = () => {
        logout()
        setUser(null)
        navigate('/')
    }

    return (
        <div style={{backgroundColor: `#${theme.light}`}}>
            <h1>You're logged In</h1>
            <button onClick={handleLogout}>Log out</button>
            <button onClick={()=>console.log(user)}>Get User</button>
            <button onClick={toggleDarkMode}>Dark toggle</button>
        </div>
    )
}

export default Dashboard