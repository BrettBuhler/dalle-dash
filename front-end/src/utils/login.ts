import axios from "axios"

const login = async (username: string, password: string) => {
    const response = await axios.post('/api/login', {username: username, password: password})
    if (response.data.user){
        return response.data.user
    } else {
        return false
    }
}

export default login