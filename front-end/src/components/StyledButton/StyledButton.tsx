import { useAppContext } from "../AppContext"
import { useState, useEffect } from 'react'
import Theme from "../../utils/themeProvider"

interface StyledButtonProps {
    text: string
    click: () => void
}

const StyledButton: React.FC<StyledButtonProps> = ({text, click}) => {
    const {darkMode} = useAppContext()
    const [theme, setTheme] = useState(new Theme(darkMode))
    const [isHighlighted, setIsHighlighted] = useState(false)

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    },[darkMode])

    const handleMouseEnter = () => {
        setIsHighlighted(true)
    }
    
    const handleMouseLeave = () => {
        setIsHighlighted(false)
    }

    return (
        <button onClick={click} style={{
            width: '100%',
            padding: '5px',
            backgroundColor: isHighlighted ? `#${theme.dark}` : `#${theme.light}`,
            color: isHighlighted ? `#${theme.light}` : `#${theme.dark}`,
            transition: 'background-color 0.3s ease-in-out',
            border: `2px solid #${theme.dark}`,
            borderRadius: '5px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            fontSize: '1rem',
            cursor: 'pointer'
        }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >{text}</button>
    )
}

export default StyledButton