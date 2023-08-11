import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../AppContext'
import {useState, useEffect} from 'react'
import UserObject from '../../utils/userObject'
import login from '../../utils/login'
import Hero from '../Hero/Hero'
import StyledHomePageButton from './StyledHomePageButton'
import backgroundImage from '../../assets/flowing-purple-mountain-small.jpg'

import './test-button.css'



const HomePage: React.FC = ({}) => {
    const [buttonOpacity, setButtonOpacity] = useState(true)
    const {setUser} = useAppContext()
    const navigate = useNavigate()

    useEffect(()=>{
        setButtonOpacity(false)
    },[])

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
        <div style={{position: 'relative'}}>
            <Hero title="Dall-E Dash" subTitle="Expand Your Creativity" background={backgroundImage}/>
            <div style={{position: 'fixed', top: 0, right: 0, marginRight: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', gap: 10}}>
                    <StyledHomePageButton text="Sign In" link="/login"/>
                    <StyledHomePageButton text="Sign Up" link="/signup" isSignUp={true}/>
                </div>
            </div>
            <div style={{position: 'fixed', bottom: 0, right: 0, marginRight: '20px', marginBottom: '20px'}}>
                <button
                    className='test-button' 
                    style={{
                    padding: '10px',
                    fontFamily: "sans-serif",
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 900,
                    transition: 'background 0.3s ease-in-out, border-radius 0.3s ease-in-out, scale 0.2s ease-in-out, color 0.3s ease-in-out, border 0.2s ease-in-out',
                    color: 'white',
                    opacity: buttonOpacity ? 0 : 100,
                }}onClick={handleLogin}>Sign In With Test Account</button>
            </div>
        </div>
    )
}

export default HomePage