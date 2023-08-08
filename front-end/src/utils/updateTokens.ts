import axios from "axios"

const updateTokens =async (id: number, tokens: number) => {
    const response = await axios.post('/api/updatetoken', {id, tokens})
    return response
}

export default updateTokens