import Gallery from "./Gallery"
import Sidebar from "../Sidebar/Sidebar"
import Theme from "../../utils/themeProvider"
import { useRef, useState, useEffect} from 'react'
import { useAppContext } from "../AppContext"

const CommunityGallery = () => {
    const {darkMode} = useAppContext()
    const [theme, setTheme] = useState(new Theme(darkMode))
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

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    },[darkMode])

    return (
        <div ref={screenRef}style={{position: 'relative', width: '100%', minHeight:'100vh', overflowX: 'hidden', background: `#${theme.light}`}}>
            <Sidebar />
            <div style={{width: `${width - 75}px`, maxWidth: `${width - 75}px`, marginLeft: '75px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                <h2 style={{fontFamily: "monospace", fontWeight: '900', fontSize:'2rem', color: `#${theme.dark}`}}>Community Gallery</h2>
                <Gallery />
            </div>
        </div>
    )
}

export default CommunityGallery