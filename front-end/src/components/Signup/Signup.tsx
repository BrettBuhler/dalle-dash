import signup from "../../utils/signup"
//import UserObject from "../../utils/userObject"
import { useAppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Signup = ({}) => {
    const { setUser } = useAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confrimPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    const handleSignup = async () => {
        if (password === confrimPassword) {
            try {
                const response = await signup(email, password)
                if (response.id){
                    setUser(response)
                    navigate('/dashboard')
                }
            } catch (error) {
                console.error(error)
            }
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

    return (
        <div className="bg-full">
            <div className="form-60">
                <h2>Dalle Dash</h2>
                <span>sign up with email</span>
                <input type="text" placeholder="Email:" value={email} onChange={handleEmailChange}></input>
                <input type="password" placeholder="Password:" value={password} onChange={handlePasswordChange}></input>
                <input type="password" placeholder="Confirm Password:" value={confrimPassword} onChange={handleConfirmPasswordChange}></input>
                <div>
                    <button onClick={handleSignup}>Sign Up</button>
                    <button onClick={()=>navigate('/')}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Signup