import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../AppContext'

import './DashboardStyles.css'

import Loading from '../Loading/Loading'
import Tokens from '../Tokens/Tokens'
import Sidebar from '../Sidebar/Sidebar'
import StyledButton from '../StyledButton/StyledButton'

import Theme from '../../utils/themeProvider'
import logout from "../../utils/logout"
import getAuth from '../../utils/getAuth'

const Dashboard = () => {
    const { setUser, user, darkMode, toggleDarkMode } = useAppContext()
    const [isLoading, setIsLoading] = useState(true)
    const [loadFade, setLoadFade] = useState(false)
    const [didRender, setDidRender] = useState<boolean>(false)
    const [theme, setTheme] = useState<Theme>(new Theme(darkMode))
    const [width, setWidth] = useState(0)
    const screenRef = useRef<HTMLDivElement>(null)

    const handleResize = () => {
        if (screenRef.current) {
            const newWidth = screenRef.current.offsetWidth
            setWidth(newWidth)
        }
    }

    useEffect(()=>{
        if (screenRef.current) {
            handleResize()
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

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
        <div ref={screenRef} style={{backgroundColor: `#${theme.light}`, position: 'relative', minHeight: '100vh'}}>
            <Tokens />
            <Sidebar />
            {isLoading && (
                <div style={{height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0, opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out'}}>
                    <Loading />
                </div>
            )}
            <div style={{width: `${width - 75}px`, height: '100vh', marginLeft: '75px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `2px solid #${theme.dark}`, borderRadius: '5px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
                    <div style={{display: 'flex', flexDirection:'column', gap: '10px'}}>
                        <h1 className="dashboard-h1" style={{fontFamily: "monospace", fontWeight: '900', color: `#${theme.dark}`}}>Dall - E2 Dashboard</h1>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <StyledButton text="Make Image" click={()=>navigate('/generate')} />
                            <StyledButton text="Shop" click={()=>navigate('/shop')}/>
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <StyledButton text="My Gallery" click={()=>navigate('/mygallery')}/>
                            <StyledButton text="Community Gallery" click={()=>navigate('/communitygallery')}/>
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>   
                            <StyledButton text="Logout" click={handleLogout} />
                            <StyledButton text={darkMode ? "Light Mode" : "Dark Mode"} click={toggleDarkMode} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard