import signup from "../../utils/signup"
import UserObject from "../../utils/userObject"
import { useAppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ErrorMessage from "../Error/Error"
import backgroundImage from '../../assets/flowing-purple-mountain-small.jpg'
import login from "../../utils/login"

const Signup = ({}) => {
    const { setUser } = useAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confrimPassword, setConfirmPassword] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()

    const isValidEmail = () => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/
        return emailPattern.test(email)
    }

    const handleSignup = async () => {
        if (checkEmpty()){
            setErrMsg("Inputs Cannot Be Empty")
            setShowError(true)
            return
        }
        if (!isValidEmail()) {
            setErrMsg("Invalid Email")
            setShowError(true)
            return
        }
        if (!isValidPassword()){
            return
        }
        if (password === confrimPassword) {
            try {
                const response = await signup(email, password)
                if (response.id){
                    const response2 = await login(email, password)
                    if (response2.id) {
                        const newUser: UserObject = {
                            id: response2.id,
                            created_at: response2.created_at,
                            email: response2.email,
                            password: response2.password,
                            tokens: response2.tokens
                        }
                        setUser(newUser)
                        navigate('/dashboard')
                    } else {
                        setErrMsg("Server Error")
                        setShowError(true)
                    }
                }
            } catch (error) {
                console.error(error)
                setErrMsg("Server Error")
                setShowError(true)
            }
        } else {
            setErrMsg("Passwords Do Not Match")
            setShowError(true)
        }
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value
        setEmail(newEmail)
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value
        setPassword(newPassword)
    }
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = event.target.value
        setConfirmPassword(newConfirmPassword)
    }

    const checkEmpty = () => {
        if (email === "" || password === "" || confrimPassword === "") {
            return true
        }
        return false
    }

    const isValidPassword = () => {
        if (password.length < 8) {
            setErrMsg("Passwords must contain at least 8 characters.")
            setShowError(true)
            return false
        } else if (!/[A-Z]/.test(password)){
            setErrMsg("Passwords must contain at least 1 uppercase letter.")
            setShowError(true)
            return false
        } else if (!/[a-z]/.test(password)){
            setErrMsg("Passwords must contain at least 1 lowercase letter.")
            setShowError(true)
        } else if (!/\d/.test(password)){
            setErrMsg("Passwords must contain at least 1 number.")
            setShowError(true)
        } else if (/\s/.test(password)){
            setErrMsg("Passwords cannot contain empty space.")
            setShowError(true)
        } else {
            return true
        }
    }

    return (
        <div className="bg-full" style={{height: '100vh', width: '100%', backgroundImage: `url(${backgroundImage})`, display: 'flex', alignItems:'center', justifyContent: 'center', backgroundSize: "cover", backgroundPosition: "center", position: 'relative'}}>
            <ErrorMessage text={errMsg} showError={showError} setShowError={setShowError} />
            <div className="form-60" style={{border: '2px solid black', overflow: 'auto', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '25px', padding: '20px'}}>
                <h2 style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily:'monospace', fontSize: '30px', fontWeight:'bold', textAlign: 'center'}}>Sign Up</h2>
                <div style={{display: 'flex', flexDirection:'column', gap: 10}}>
                <input style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px'}} type="text" placeholder="Email:" value={email} onChange={handleEmailChange}></input>
                <input style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px'}} type="password" placeholder="Password:" value={password} onChange={handlePasswordChange}></input>
                <input style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px', marginBottom: '20px'}} type="password" placeholder="Confirm Password:" value={confrimPassword} onChange={handleConfirmPasswordChange}></input>
                <button className="login-button" style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px', transition: 'background 0.3s ease-in-out', cursor: 'pointer'}} onClick={handleSignup}>Continue</button>
                <button className="login-button" style={{borderRadius: '15px', fontFamily:'monospace', fontSize: '20px', fontWeight:'bold', padding: '5px', transition: 'background 0.3s ease-in-out', cursor: 'pointer'}} onClick={()=>navigate('/')}>Back</button>
                </div>
                <p style={{fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', textAlign: 'center'}}>Already have an account? <a href="/login">Sign In</a></p>
            </div>
        </div>
    )
}

export default Signup