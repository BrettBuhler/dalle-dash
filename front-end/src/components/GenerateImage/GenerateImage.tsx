import { useAppContext } from "../AppContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Tokens from "../Tokens/Tokens"

import updateTokens from "../../utils/updateTokens"
import genImage from "../../utils/genImage"
import uploadImage from "../../utils/uploadImage"
import PictureFrameFromUrl from "../PictureFrame/PictureFrameFromUrl"

const GenerateImage = () => {
    const {user, setUser} = useAppContext()
    const [prompt, setPrompt] = useState("")
    const [imgArr, setImgArr] = useState<string[]>([])

    const navigate = useNavigate()

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        setPrompt(newText)
    }

    const setImg = (url: string) => {
        const prevArr = [...imgArr]
        prevArr.push(url)
        setImgArr(prevArr)
    }

    const handleMake = async () => {
        if (user) {
            if (user.tokens > 0) {
                const response = await genImage(user.id, prompt, 1, '512x512')
                if (response.data.url) {
                    const url = response.data.url
                    setImg(url)
                    const update = await updateTokens(user.id, -1)
                    if (update.data.data) {
                        setUser(update.data.data)
                    }
                    const uploaded = await uploadImage(user.id, prompt, url)
                    console.log('in handle make uploaded:',uploaded)
                } else {
                    console.error('Error in genImage')
                }
            }
        }
    }

    return (
        <div>
            <Tokens />
            <div>
                <h2>Generate Image</h2>
                <textarea placeholder="Write your image promt here:" value={prompt} onChange={(handleTextAreaChange)}/>
                <div>
                    <button onClick={handleMake}>Make Image</button>
                    <button onClick={()=>navigate('/dashboard')}>Back</button>
                </div>
            </div>
            {imgArr.length > 0 && (<div>
                {imgArr.map((url) => <PictureFrameFromUrl url={url} h={400} w={400}/>)}
            </div>)}
        </div>
    )
}

export default GenerateImage