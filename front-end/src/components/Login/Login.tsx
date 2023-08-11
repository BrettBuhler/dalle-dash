import login from "../../utils/login"
import UserObject from "../../utils/userObject"
import { useAppContext } from "../AppContext"
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from "react"
import ErrorMessage from "../Error/Error"
import backgroundImage from '../../assets/flowing-purple-mountain-small.jpg'

import './LoginCSS.css'

const Login: React.FC = () => {
    const { setUser} = useAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("false")
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()
    const handleLogin = async () => {
        if (checkEmpty()) {
            setErrMsg("User Name & Password Cannot be Empty")
            setShowError(true)
            return
        }
        try {
            const response = await login(email, password)
            if (response.id) {
                const newUser: UserObject = {
                    id: response.id,
                    created_at: response.created_at,
                    email: response.email,
                    password: response.password,
                    tokens: response.tokens
                }
                setUser(newUser)
                navigate('/dashboard')
            } else {
                setErrMsg("Invalid Email or Password")
                setShowError(true)
            }
        } catch (error) {
            setErrMsg("Invalid Email or Password")
            setShowError(true)
            console.error('catch error:', error)
        }
    }

    const checkEmpty = () => {
        if (email === "" || password === "") {
            return true
        }
        return false
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value
        setEmail(newEmail)
    }
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value
        setPassword(newPassword)
    }

    return (
        <div style={{height: '100vh', width: '100%', backgroundImage: `url(${backgroundImage})`, display: 'flex', alignItems:'center', justifyContent: 'center', backgroundSize: "cover", backgroundPosition: "center", position: 'relative'}}>
            <ErrorMessage text={errMsg} showError={showError} setShowError={setShowError}/>
            <div style={{border: '2px solid black', overflow: 'auto', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '25px', padding: '20px'}}>
                <h2 style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily:'monospace', fontSize: '30px', fontWeight:'bold', textAlign: 'center'}}>Sign In</h2>
                <div style={{display: 'flex', flexDirection:'column', gap: 10}}>
                <input style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px'}} type="email" placeholder="Email:" value={email} onChange={handleEmailChange}></input>
                <input style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px', marginBottom: '20px'}}type="password" placeholder="Password:" value={password} onChange={handlePasswordChange}></input>
                <button className="login-button" style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px', transition: 'background 0.3s ease-in-out', cursor: 'pointer'}} onClick={handleLogin}>Continue</button>
                <button className="login-button" style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px', transition: 'background 0.3s ease-in-out', cursor: 'pointer'}} onClick={()=>navigate('/')}>Back</button>
                </div>
                <p style={{fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', textAlign: 'center'}}>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    )
}

export default Login