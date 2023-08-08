import { useAppContext } from "../AppContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Theme from "../../utils/themeProvider"

import './TokensStyle.css'

const Tokens = () => {
    const {darkMode, user} = useAppContext()
    const [theme, setTheme] = useState(new Theme(darkMode))
    const [isHovered, setIsHovered] = useState(false)

    const navigate = useNavigate()

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const handleNavigate = () => {
        navigate('/shop')
    }

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    }, [darkMode])

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{position: 'fixed', top: 10, right: 10, padding: '10px', background: `#${theme.mid_light}`, borderRadius: '25px', display: 'flex', justifyContent:'center', alignItems: 'center', color: `#${theme.dark}`, border: `2px solid #${theme.dark}`}}>
            <span>Tokens: {user ? user.tokens : 0}</span>
                <div className="buy_more" onClick={handleNavigate} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent:'center', alignItems: 'center', borderRadius: '25px', background: `#${theme.dark}`, color: `#${theme.mid_light}`, zIndex: 10, opacity: isHovered ? 100 : 0, transition: 'opacity 0.5s ease-in-out'}}>
                    Buy More
                </div>
        </div>
    )
}

export default Tokens