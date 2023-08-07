import axios from "axios"

const uploadImage = async (id: number, prompt: string, url: string) => {
    try {
        const response = await axios.post('/api/uploadimage', {id, prompt, url})
        if (response.status == 200) {
            return true
        }
        return false
    } catch (error) {
        console.log('catch error:', error)
        return false
    }
}

export default uploadImage