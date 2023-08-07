import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext'

import Loading from '../Loading/Loading'

import Theme from '../../utils/themeProvider'
import logout from "../../utils/logout"
import getAuth from '../../utils/getAuth'

const Dashboard = () => {
    const { setUser, user, darkMode, toggleDarkMode } = useAppContext()
    const [isLoading, setIsLoading] = useState(true)
    const [loadFade, setLoadFade] = useState(false)
    const [didRender, setDidRender] = useState<boolean>(false)
    const [theme, setTheme] = useState<Theme>(new Theme(darkMode))

    const navigate = useNavigate()

    const loadingFade = () => {
        setLoadFade(true)
        setTimeout(()=>{
            setIsLoading(false)
            setLoadFade(false)
        },1000)
    }

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    }, [darkMode])

    useEffect(()=>{
        const getAuthHelper = async () => {
            const response = await getAuth()
            if (response.id){
                setUser(response)
                loadingFade()
            } else {
                console.error("User is Authenticated but getAuth failed")
            }
        }
        if (user === null && !didRender) {
            setDidRender(true)
            getAuthHelper()
        } else {
            setIsLoading(false)
        }
    },[])

    const handleLogout = () => {
        logout()
        setUser(null)
        navigate('/')
    }

    return (
        <div style={{backgroundColor: `#${theme.light}`, position: 'relative'}}>
            {isLoading && (
                <div style={{height: "100vh", width: "100vw", position: "absolute", top: 0, left: 0, opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out'}}>
                    <Loading />
                </div>
            )}
            <h1>You're logged In</h1>
            <button onClick={handleLogout}>Log out</button>
            <button onClick={()=>console.log(user)}>Get User</button>
            <button onClick={toggleDarkMode}>Dark toggle</button>
            <button onClick={()=>navigate("/generate")}>genimg</button>
        </div>
    )
}

export default Dashboard