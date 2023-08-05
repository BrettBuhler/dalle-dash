import axios from "axios"

const signup = async (email: string, password: string) => {
    const response = await axios.post('/api/signup', {email: email, password: password})
    console.log("response in sign up:", response)
}

export default signup