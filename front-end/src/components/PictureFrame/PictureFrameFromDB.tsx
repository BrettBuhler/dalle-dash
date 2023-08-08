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
    const [lastUrl, setLastUrl] = useState("place holder")

    useEffect(()=>{
        if (didRender === false && isLoading){
            setDidRender(true)
        }
    },[])
    const changeLastUrl = () => {
        setLastUrl(tempImageUrl)
    }
    if (theme.dark === 'green') console.log('typescript error')
    useEffect(()=>{
        if (img_name !== "" && tempImageUrl != lastUrl){
            const getImageByName = async (url: string) => {
                const response = await getImage(url)
                if (response){
                    changeLastUrl()
                    const image = new Image()
                    image.src = response
                    image.onload = () => {
                        setTempImageUrl(response)
                        loadingFade()
                    }
                }
            }
            console.log("fetching data")
            setIsLoading(true)
            getImageByName(img_name)
        }
    }, [img_name])

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

    const imageStyle: React.CSSProperties = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        minWidth: `${w}px`,
        minHeight: `${h}px`,
      }

    return (
        <div style={{height: `${h}px`, width: `${w}px`, position: 'relative'}}>
            {isLoading && (
                <div style={{height: "100%", width: "100%", position: "absolute", top: 0, left: 0, opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out', zIndex: 10}}>
                    <Loading />
                </div>
            )}
            {tempImageUrl && (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: `${h}px`, width: `${w}px`, overflow: 'hidden', position: 'relative'}}>
                    <img src={tempImageUrl} alt="Picture by AI" style={imageStyle} />
                </div>
            )}
        </div>
    )
}

export default PictureFrameFromDB