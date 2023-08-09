import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../AppContext'
import { useState } from 'react'
import UserObject from '../../utils/userObject'
import login from '../../utils/login'
import MetaPrompt from '../MetaPrompt/MetaPrompt'


const HomePage: React.FC = ({}) => {
    const {setUser} = useAppContext()
    const [textValue, setTextValue] = useState('')
    const [isVis, setIsVis] = useState(false)
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
        <div>
            <h1>HOME</h1>
            <button onClick={()=>navigate('/login')}>Log In</button>
            <button onClick={()=>navigate('/signup')}>Sign Up</button>
            <button onClick={handleLogin}>TEST ACCOUNT</button>
            <button onClick={()=>setIsVis(!isVis)}>Text meta prompt</button>
            <div style={{display: 'flex', gap:10}}>
            </div>
            <textarea value={textValue}/>
            <div style={{position: 'relative'}}>
                <MetaPrompt setText={setTextValue} isVisible={isVis} setIsVisible={setIsVis}/>
            </div>
        </div>
    )
}

export default HomePage