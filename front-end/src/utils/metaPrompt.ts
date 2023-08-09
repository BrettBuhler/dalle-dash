import axios from "axios"

const metaPrompt = async (prompt: string) => {
    try {
        const response = await axios.post('/api/metaprompt', {prompt: prompt})
        if (response.data.data.choices[0].message.content){
            return response.data.data.choices[0].message.content
        }
        return false
    } catch (error) {
        console.error(error)
        return false
    }
}

export default metaPrompt