import { useEffect, useState } from "react"

interface ErrorMessageProps {
    text: string
    showError: boolean
    setShowError: React.Dispatch<React.SetStateAction<boolean>>
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({text, showError, setShowError}) => {
    const [isVis, setIsVis] = useState(false)

    useEffect(()=>{
        if (showError){
            setIsVis(true)
            setTimeout(()=>{
                closeError()
            }, 2000)
        }
    },[showError])

    const closeError = () => {
        setIsVis(false)
        setTimeout(()=>{
            setShowError(false)
        },1000)
    }

    if (!showError) return null
    return (
        <div style={{
            position: 'fixed',
            top: 0, right: 0, 
            marginTop: '20px', 
            marginRight: '20px',
            marginLeft: '20px',
            border: '2px solid black', 
            background: 'rgba(0, 0, 0, 0.5)', 
            borderRadius: '15px',
            opacity: isVis ? 100 : 0,
            transition: 'opacity 1s ease-in-out',
            color: 'red',
            fontFamily: 'monospace',
            fontSize: '24px',
            padding: '5px'
        }}>
            {text}
        </div>
    )
}

export default ErrorMessage