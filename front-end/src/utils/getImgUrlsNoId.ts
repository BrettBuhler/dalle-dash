import axios from "axios"

const getImgUrlsNoId = async () => {
    try {
        const response = await axios.post('/api/getimagesnoid')
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

export default getImgUrlsNoId