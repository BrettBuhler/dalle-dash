import { useState, useEffect } from "react"
import Loading from "../Loading/Loading"

interface PictureFrameFromUrlProps {
    url: string
    h: number
    w: number
}

const PictureFrameFromUrl: React.FC<PictureFrameFromUrlProps> = ({ url, h, w }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [loadFade, setLoadFade] = useState(false)
    const [didRender, setDidRender] = useState<boolean>(false)
    const [imgUrl, setImgUrl] = useState("")

    useEffect(()=>{
        if (didRender === false && isLoading){
            setDidRender(true)
        }
    },[])

    useEffect(()=> {
        if (isLoading && !didRender) {
            const image = new Image()
            image.src = url
            image.onload = () => {
                setImgUrl(url)
                loadingFade()
            }
        }
    }, [didRender])

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
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }

    return (
        <div style={{height: `${h}px`, width: `${w}px`, maxWidth: `${w}px`, maxHeight: `${h}px`, position: 'relative'}}>
            {isLoading && (
                <div style={{height: "100%", width: "100%", position: "absolute", top: 0, left: 0, opacity: loadFade ? 0 : 1, transition: 'opacity 1s ease-in-out', zIndex: 10}}>
                    <Loading />
                </div>
            )}
            {imgUrl && (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: `100%`, width: `100%`, overflow: 'hidden', position: 'relative'}}>
                    <img src={imgUrl} alt="Picture by AI" style={imageStyle} />
                </div>
            )}
        </div>
    )
}

export default PictureFrameFromUrl