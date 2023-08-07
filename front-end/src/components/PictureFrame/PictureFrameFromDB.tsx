import { useState, useEffect } from "react"
import { useAppContext } from "../AppContext"
import Loading from "../Loading/Loading"
import Theme from "../../utils/themeProvider"
import getImage from "../../utils/getImage"

interface PictureFrameFromDBProps {
    img_name: string
    h: number
    w: number
}

const PictureFrameFromDB: React.FC<PictureFrameFromDBProps> = ({ img_name, h, w }) => {
    const {darkMode} = useAppContext()
    const [isLoading, setIsLoading] = useState(true)
    const [loadFade, setLoadFade] = useState(false)
    const [didRender, setDidRender] = useState<boolean>(false)
    const [theme, setTheme] = useState<Theme>(new Theme(darkMode))
    const [tempImageUrl, setTempImageUrl] = useState("")

    useEffect(()=>{
        if (didRender === false && isLoading){
            setDidRender(true)
        }
    },[])

    useEffect(()=> {
        const getImageByName = async (url: string) => {
            const response = await getImage(url)
            if (response){
                const image = new Image()
                image.src = response
                image.onload = () => {
                    setTempImageUrl(response)
                    loadingFade()
                }
            }
        }
        if (isLoading && !didRender) {
            console.log("fetching data")
            getImageByName(img_name)
        }
    }, [didRender])

    useEffect(()=> {
        setTheme(new Theme(darkMode))
    }, [darkMode])

    const loadingFade = () => {
        setLoadFade(true)
        setTimeout(()=>{
            setIsLoading(false)
            setLoadFade(false)
        },1000)
    }

    return (
        <div style={{height: `${h}px`, width: `${w}px`, border: `5px solid #${theme.dark}`, position: 'relative'}}>
            {isLoading && (
                <div style={{height: "100%", width: "100%", position: "absolute", top: 0, left: 0, opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out', zIndex: 10}}>
                    <Loading />
                </div>
            )}
            {tempImageUrl && (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: `${h}px`, width: `${w}px`, overflow: 'hidden', position: 'relative'}}>
                    <img src={tempImageUrl} alt="Picture by AI" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
            )}
        </div>
    )
}

export default PictureFrameFromDB