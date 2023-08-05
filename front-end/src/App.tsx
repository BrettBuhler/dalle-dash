import { Routes, Route} from 'react-router-dom'

import Signup from "./components/Signup/Signup"
import Login from "./components/Login/Login"
import HomePage from './components/HomePage/HomePage'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={ <HomePage /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/signup' element={ <Signup /> } />
                <Route path='/dashboard' element={ <Dashboard />} />
            </Routes>
        </div>
    )
}

export default App
