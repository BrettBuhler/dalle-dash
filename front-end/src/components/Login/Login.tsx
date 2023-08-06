import login from "../../utils/login"
import UserObject from "../../utils/userObject"
import { useAppContext } from "../AppContext"
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from "react"

const Login: React.FC = () => {
    const { setUser} = useAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const handleLogin = async () => {
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
            }
        } catch (error) {
            console.error(error)
        }
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
        <div className="bg-full">
            <div className="form-60">
                <h2>Dalle Dash</h2>
                <input type="text" placeholder="Email:" value={email} onChange={handleEmailChange}></input>
                <input type="text" placeholder="Password:" value={password} onChange={handlePasswordChange}></input>
                <div>
                    <button onClick={handleLogin}>Log In</button>
                    <button onClick={()=>navigate('/')}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Login