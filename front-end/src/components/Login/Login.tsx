import login from "../../utils/login"
import UserObject from "../../utils/userObject"
import { useAppContext } from "../AppContext"
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const { setUser} = useAppContext()
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const response = await login('testemail@email.com', 'testpassword123')
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

    return (
        <div>
            <h1>LOG IN PAGE</h1>
            <button onClick={handleLogin}>TEST LOGIN</button>
        </div>
    )
}

export default Login