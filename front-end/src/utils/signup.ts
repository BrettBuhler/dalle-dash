import axios from "axios"

const signup = async (email: string, password: string) => {
    const response = await axios.post('/api/signup', {email: email, password: password})
    console.log("response in sign up:", response)
    if (response.data.user){
        return response.data.user
    } else {
        return false
    }
}

export default signup