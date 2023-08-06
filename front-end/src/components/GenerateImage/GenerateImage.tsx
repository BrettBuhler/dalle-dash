import { useAppContext } from "../AppContext"
import { useState } from "react"

const GenerateImage = () => {
    //const {user, setUser} = useAppContext()
    const [prompt, setPrompt] = useState("")

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        setPrompt(newText)
    }

    return (
        <div>
            <div>
                <h2>Generate Image</h2>
                <textarea placeholder="Write your image promt here:" value={prompt} onChange={(handleTextAreaChange)}/>
                <div>
                    <button>Make Image</button>
                    <button>Back</button>
                </div>
            </div>
        </div>
    )
}

export default GenerateImage