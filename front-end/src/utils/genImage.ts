import axios from "axios"

const genImage = async (id: number, prompt: string, n: number, size: string) => {

    const setSides = size === "256x256" ? size : size === "512x512" ? size : "1024x1024"

    const response = await axios.post('/api/genimage',
    {
        id: id,
        prompt: prompt,
        n: n,
        size: setSides
    })
    console.log("from genImg", response)
    return response
}

export default genImage