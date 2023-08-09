import { useAppContext } from "../AppContext"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import Tokens from "../Tokens/Tokens"

import updateTokens from "../../utils/updateTokens"
import genImage from "../../utils/genImage"
import uploadImage from "../../utils/uploadImage"
import Theme from "../../utils/themeProvider"

import PictureFrameFromUrl from "../PictureFrame/PictureFrameFromUrl"
import StyledButton from "../StyledButton/StyledButton"
import MetaPrompt from "../MetaPrompt/MetaPrompt"
import Loading from "../Loading/Loading"

const GenerateImage = () => {
    const {user, setUser, darkMode} = useAppContext()
    const [theme, setTheme] = useState(new Theme(darkMode))
    const [prompt, setPrompt] = useState("")
    const [imgArr, setImgArr] = useState<string[]>([])
    const [isMetaPromptVisible, setIsMetaPromptVisible] = useState(false)
    const [galleryWidth, setGalleryWidth] = useState(0)
    const [isGallery, setGallery] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loadFade, setLoadFade] = useState(false)
    const elementRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        const updateGallaryWidth = () => {
            if (elementRef.current) {
                const width = elementRef.current.offsetWidth
                console.log(width)
                setGalleryWidth(width)
            }
        }

        if (elementRef.current) {
            const width = elementRef.current.offsetWidth
            setGalleryWidth(width)
        }

        window.addEventListener('resize', updateGallaryWidth)

        return () => {
            window.removeEventListener('resize', updateGallaryWidth)
        }
    },[])

    useEffect(()=>{
        if (imgArr.length > 0){
            setGallery(true)
        }
    }, [imgArr])

    const navigate = useNavigate()

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    },[darkMode])

    const loadingFade = () => {
        setLoadFade(true)
        setTimeout(()=>{
            setIsLoading(false)
            setLoadFade(false)
        },1000)
    }

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
                setIsLoading(true)
                const response = await genImage(user.id, prompt, 1, '512x512')
                if (response.data.url) {
                    const url = response.data.url
                    setImg(url)
                    loadingFade()
                    const update = await updateTokens(user.id, -1)
                    if (update.data.data) {
                        setUser(update.data.data)
                    }
                    const uploaded = await uploadImage(user.id, prompt, url)
                    if (!uploaded) {
                        console.log('error in image upload')
                    }
                } else {
                    console.error('Error in genImage')
                }
            }
        }
    }

    return (
        <div style={{display: 'flex', position: 'relative', flexDirection:'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: `#${theme.light}`}}>
            <Tokens />
            <MetaPrompt isVisible={isMetaPromptVisible} setIsVisible={setIsMetaPromptVisible} setText={setPrompt}/>
            {isLoading && (
                <div style={{height: "100%", width: "100%", position: "fixed", top: 0, left: 0, opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out', zIndex: 10}}>
                    <Loading />
                </div>)}
            <div style={{border: `2px solid #${theme.dark}`, padding: '10px', width: '60%', maxWidth: '800px', minWidth: '300px', height: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', background: `#${theme.light}`, borderRadius:5, marginTop: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                <h2 style={{fontFamily: "monospace", fontWeight: '900', fontSize:'2rem', color: `#${theme.dark}`, marginBottom: 20}} >Generate Image</h2>
                <textarea style={{width: '90%', resize: 'none', marginBottom: '10px', flexGrow: '1', minHeight: '100px', border: `2px solid #${theme.dark}`, borderRadius:5, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', background:`#${theme.light}`, fontFamily: "monospace", fontWeight: '900', fontSize: '.9rem', color: `#${theme.dark}`}} placeholder="Write your image promt here:" value={prompt} onChange={(handleTextAreaChange)}/>
                <div style={{display: 'flex', gap: '10px', width: '90%'}}>
                    <StyledButton text={'Make Image'} click={handleMake}/>
                    <StyledButton text={'Meta Prompt'} click={()=>setIsMetaPromptVisible(true)} />
                    <StyledButton text={'Back'} click={()=>navigate('/dashboard')} />
                </div>
            </div>
            <div ref={elementRef} style={{width:'60%', maxWidth: '800px', minWidth: '300px', opacity: isGallery ? 100 : 0, transition: 'opacity 0.5s ease-in-out'}}>
                {imgArr.length > 0 && (
                    <h2 style={{textAlign: 'center', fontFamily: "monospace", fontWeight: '900', fontSize:'2rem', color: `#${theme.dark}`}}>Recent Images</h2>
                )}
                {imgArr.length > 0 &&(
                    <div style={{padding: '10px' ,width: '100%', background: `#${theme.light}`, border: `2px solid #${theme.dark}`, borderRadius: 5, marginTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px'}}>
                        {imgArr.map((url) => <PictureFrameFromUrl url={url} h={galleryWidth / 2 - 15} w={galleryWidth / 2 - 15}/>)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default GenerateImage