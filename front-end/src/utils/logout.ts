import axios from "axios"

const logout = async () => {
    await axios.post('/api/logout')
}

export default logout
