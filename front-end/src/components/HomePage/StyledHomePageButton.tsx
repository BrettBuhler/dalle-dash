import { useState, useEffect } from "react"


interface StyledHomePageButtonProps {
    text: string
    link: string
    isSignUp?: boolean
}

const StyledHomePageButton: React.FC<StyledHomePageButtonProps> = ({text, link, isSignUp = false}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [buttonOpacity, setButtonOpacity] = useState(true)

    useEffect(()=>{
        setButtonOpacity(false)
    },[])

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <a
            href={link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                padding: '10px',
                fontSize: '24px',
                fontFamily: "sans-serif",
                background: isSignUp ? isHovered ? "#800080" : '#00CED1' : isHovered ? "#800080" : "",
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 900,
                transition: 'background 0.3s ease-in-out, border-radius 0.3s ease-in-out, scale 0.2s ease-in-out, color 0.3s ease-in-out, border 0.2s ease-in-out',
                borderRadius: isHovered ? '5px' : '25px',
                scale: isHovered ? '1.1' : '1',
                color: 'white',
                opacity: buttonOpacity ? 0 : 100
            }}>
            {text}
        </a>
        )
}

export default StyledHomePageButton