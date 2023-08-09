import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../AppContext'
import UserObject from '../../utils/userObject'
import login from '../../utils/login'

import Sidebar from '../Sidebar/Sidebar'


const HomePage: React.FC = ({}) => {
    const {setUser} = useAppContext()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await login('testuser@test.com', '#TestPassword123')
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
        <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>HOME</h1>
            <button onClick={()=>navigate('/login')}>Log In</button>
            <button onClick={()=>navigate('/signup')}>Sign Up</button>
            <button onClick={handleLogin}>TEST ACCOUNT</button>
        </div>
    )
}

export default HomePage