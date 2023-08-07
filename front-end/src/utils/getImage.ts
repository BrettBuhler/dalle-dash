import axios from "axios"

const getImage = async (img_url: string) => {
    const response = await axios.post('/api/getimage', {img_name: img_url})
    if (response.data.data.signedUrl){
        console.log(response.data.data.signedUrl)
        return response.data.data.signedUrl
    } else {
        console.log('get image fail')
        return false
    }
}

export default getImage