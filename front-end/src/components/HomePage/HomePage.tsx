import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = ({}) => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>HOME</h1>
            <button onClick={()=>navigate('/login')}>Log In</button>
            <button onClick={()=>navigate('/signup')}>Sign Up</button>
        </div>
    )
}

export default HomePage