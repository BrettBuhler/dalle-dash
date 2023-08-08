import axios from "axios"

const getImgUrlsById = async (id: number) => {
    try {
        const response = await axios.post('/api/getimagesbyid', {id})
        if (response.data) {
            return response.data
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

export default getImgUrlsById