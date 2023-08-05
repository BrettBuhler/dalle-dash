import axios from 'axios'

const getAuth = async () => {
    const response = await axios.post('/api/getauth')
    if (response.data.user) {
        return response.data.user
    } else {
        return false
    }
}

export default getAuth