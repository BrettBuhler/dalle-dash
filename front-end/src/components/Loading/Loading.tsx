import { useAppContext } from "../AppContext"
import { useEffect, useState } from "react"
import Theme from "../../utils/themeProvider"
import './LoadingStyle.css'

const Loading = () => {
    const {darkMode} = useAppContext()
    const [theme, setTheme] = useState(new Theme(darkMode))

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    },[darkMode])

    const spinnerStyle = {
        border: `5px solid #${theme.light}`,
        borderTop: `5px solid #${theme.dark}`
    }


    return (

        <div className="loading-circle-container">
            <div className="background"></div>
            <div className="loading-circle">
                <div className="spinner" style={spinnerStyle}></div>
            </div>
        </div>
    )
}

export default Loading