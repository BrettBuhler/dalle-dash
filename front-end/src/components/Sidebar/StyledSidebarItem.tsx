import { ReactNode, useEffect, useState } from 'react'
import { useAppContext } from '../AppContext'
import Theme from '../../utils/themeProvider'

interface StyledSidebarItemProps {
    children: ReactNode
    click: () => void
}

const StyledSidebarItem: React.FC<StyledSidebarItemProps> = ({ children, click }) => {
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
        <div 
            style={{
                marginTop: '10px',
                background: `#${theme.dark}`,
                borderRadius: isHighlighted ? '5px' : '15px',
                width: '50px',
                height: '50px',
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scale: isHighlighted ? '1.1' : '1',
                transition: 'scale 0.3s ease-in-out, border-radius 0.2s ease-in-out',
                cursor: 'pointer',
                border: `2px solid #${theme.light}`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={click}
        >
            {children}
        </div>
    )
}

export default StyledSidebarItem