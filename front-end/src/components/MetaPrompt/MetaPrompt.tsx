import { useState, useEffect } from "react"
import { useAppContext } from "../AppContext"
import Theme from "../../utils/themeProvider"
import Loading from "../Loading/Loading"
import StyledButton from "../StyledButton/StyledButton"
import metaPrompt from "../../utils/metaPrompt"

interface MetaPromptProps {
    setText: React.Dispatch<React.SetStateAction<string>>
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    isVisible: boolean
}

const MetaPrompt: React.FC<MetaPromptProps> = ({setText, setIsVisible, isVisible}) => {
    const {darkMode} = useAppContext();
    const [theme, setTheme] = useState(new Theme(darkMode))
    const [metaPromptText, setMetaPromptText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [loadFade, setLoadFade] = useState(false)

    useEffect(()=> {
        setTheme(new Theme(darkMode))
    },[darkMode])

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value
        setMetaPromptText(newValue)
    }

    if (!isVisible) {
        return null
    }

    const loadingFade = (str: string) => {
        setLoadFade(true)
        setText(str)
        setTimeout(()=>{
            setIsLoading(false)
            setLoadFade(false)
            setIsVisible(false)
            setMetaPromptText("")
        },1000)
    }

    const makePrompt = async () => {
        setIsLoading(true)
        const response = await metaPrompt(metaPromptText)
        if (response){
            loadingFade(response)
        } else {
            console.log('error here')
        }

    }

    const closeMetaPrompt = () => {
        setMetaPromptText('')
        setIsLoading(false)
        setLoadFade(false)
        setIsVisible(false)
    }

    return (
        <div style={{position: 'fixed', left: '0', top: '0', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out', background: "linear-gradient(rgba(20,20,20, .5), rgba(20,20,20, .5))", zIndex: 50}}>
            <div style={{border: `2px solid #${theme.dark}`, padding: '10px', width: '60%', maxWidth: '500px', minWidth: '300px', height: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', background: `#${theme.light}`, borderRadius:5}}>
                {isLoading && (
                    <div style={{height: "100%", width: "100%", position: "fixed", top: 0, left: 0, opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out', zIndex: 10}}>
                        <Loading />
                    </div>
                )}
                <h2 style={{fontFamily: "monospace", fontWeight: '900', fontSize:'2rem', color: `#${theme.dark}`, marginBottom: 0}}>Meta Promt</h2>
                <p style={{textAlign:'center', fontFamily: "monospace", fontWeight: '900', fontSize:'1rem', width: '90%', color: `#${theme.dark}`}}>Elevate your ideas with a tailored DALL·E-2 meta prompt. Describe your vision, and watch as AI brings it to life.</p>
                <textarea value={metaPromptText} placeholder="Write your prompt idea:" onChange={handleTextAreaChange} style={{width: '90%', resize: 'none', marginBottom: '10px', flexGrow: '1', minHeight: '100px', border: `2px solid #${theme.dark}`, borderRadius:5, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', background:`#${theme.light}`, fontFamily: "monospace", fontWeight: '900', fontSize: '.9rem', color: `#${theme.dark}`,}}/>
                <div style={{width: '90%', display: 'flex', gap: '10px'}}>
                    <StyledButton text="Make Prompt" click={makePrompt} />
                    <StyledButton text="Back" click={closeMetaPrompt} />
                </div>
            </div>
        </div>
    )
}

export default MetaPrompt