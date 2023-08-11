import { useRef, useEffect, useState } from 'react'
import { useAppContext } from '../AppContext'
import { useNavigate } from 'react-router-dom'
import PictureFrameFromDB from '../PictureFrame/PictureFrameFromDB'
import StyledButton from '../StyledButton/StyledButton'
import Theme from '../../utils/themeProvider'
import "./GalleryStyles.css"

import getImgUrlsById from '../../utils/getImgUrlsById'
import getImgUrlsNoId from '../../utils/getImgUrlsNoId'

interface GalleryProps {
    userId?: number
}

const Gallery: React.FC<GalleryProps> = ({userId}) => {
    const {darkMode} = useAppContext()
    const [theme, setTheme] = useState(new Theme(darkMode))
    const [width, setWidth] = useState<number | undefined>(undefined)
    const [smallWidth, setSmallWidth] = useState<number | undefined>(undefined)
    const divRef = useRef<HTMLDivElement | null>(null)
    const smallDivRef = useRef<HTMLDivElement | null>(null)

    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [didRender, setDidRender] = useState(false)
    const [getImgFail, setGetImgFail] = useState(false)
    const [noImage, setNoImage] = useState(false)
    const [noImageOpacity, setNoImageOpacity] = useState(0)
    const [galleryPosition, setGalleryPosition] = useState(0)
    const [galleryIndexs, setGalleryIndexs] = useState<number[]>([])
    const [firstUrls, setFirstUrls] = useState(false)

    const navigate=useNavigate()

    useEffect(() => {
        if (imageUrls.length > 0) {
            const newGalleryIndexs = [getImageIndex(0), getImageIndex(1), getImageIndex(2), getImageIndex(3), getImageIndex(4)]
            setGalleryIndexs(newGalleryIndexs)
        }
    }, [galleryPosition])

    useEffect(()=> {
        if (imageUrls.length > 0) {
            const newGalleryIndexs = [getImageIndex(0), getImageIndex(1), getImageIndex(2), getImageIndex(3), getImageIndex(4)]
            setGalleryIndexs(newGalleryIndexs)
            setFirstUrls(true)
        }
    }, [imageUrls])

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    },[darkMode])

    const getImageIndex = (n: number):number => {
        if (galleryPosition >= 0) {
            if (galleryPosition + n >= imageUrls.length){
                return (galleryPosition + n) % imageUrls.length
            } else {
                return galleryPosition + n
            }
        } else {
            const effectiveIndex = galleryPosition - n
            return (effectiveIndex % imageUrls.length + imageUrls.length) % imageUrls.length
        }
    }

    useEffect(()=>{
        const getUrlsById = async () => {
            const id = userId ? userId : 0
            const response = await getImgUrlsById(id)
            if (response.data){
                const arr:string[] = [...response.data]
                for (let i:number = arr.length - 1; i > 0; i--) {
                    const j: number = Math.floor(Math.random() * (i + 1))
                    const mid: string = arr[i]
                    arr[i] = arr[j]
                    arr[j] = mid
                }
                if (arr.length === 0){
                    setNoImage(true)
                    makeVisible()
                } else {
                    setImageUrls(arr)
                }
            } else {
                setGetImgFail(true)
            }
        }
        const getUrlsNoId = async () => {
            const response = await getImgUrlsNoId()
            if (response.data) {
                const arr:string[] = [...response.data]
                for (let i:number = arr.length - 1; i > 0; i--) {
                    const j: number = Math.floor(Math.random() * (i + 1))
                    const mid: string = arr[i]
                    arr[i] = arr[j]
                    arr[j] = mid
                }
                if (arr.length === 0){
                    setNoImage(true)
                    makeVisible()
                } else {
                    setImageUrls(arr)
                }
            } else {
                setGetImgFail(true)
            }
        }
        if (!didRender){
            toggleRenger()
            if (userId) {
                getUrlsById()
            } else {
                getUrlsNoId()
            }
        }
    },[])

    const toggleRenger = () => {
        setDidRender(false)
    }

    const handleResize = () => {
        if(divRef.current) {
            setWidth(divRef.current.offsetWidth)
        }
        if (smallDivRef.current) {
            setSmallWidth(smallDivRef.current.offsetWidth)
        }
    }

    useEffect(()=>{
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

    const makeVisible = () => {
        setTimeout(()=>{
            setNoImageOpacity(100)
        }, 50)
    }
    return (
        <div style={{flexDirection: 'column', width: '100%', display: 'flex', alignItems: 'center', justifyContent:'center', position:'relative'}}>
            {getImgFail && (
                <div style={{position: 'absolute', height: '100%', width: '100%', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                    <h1>Unable to fetch Images</h1>
                </div>
            )}
            {noImage && (
                <div style={{ position: 'absolute', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center', background:`#${theme.light}`, zIndex: 20, opacity: noImageOpacity, transition: 'opacity 1s ease-in-out'}}>
                    <div style={{width: '50%', maxWidth: '600px', background:`#${theme.mid_light}`, display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center', padding: '20px', borderRadius: '20px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)' }}>
                        <h2 style={{fontFamily: "monospace", fontWeight: '900', fontSize:'2rem', color: `#${theme.dark}`}}>No Images Saved</h2>
                        <p style={{marginBottom: '15px', fontFamily: "monospace", fontWeight: '900', fontSize:'1rem', color: `#${theme.dark}`}}>Create images from the make image menu or return to dashboard</p>
                        <div style={{width: '100%', display: 'flex', gap: '10px'}}>
                            <StyledButton text={"Make Image"} click={()=>navigate('/generate')}/>
                            <StyledButton text={"Dashboard"} click={()=>navigate('/dashboard')}/>
                        </div>
                    </div>
                </div>
            )}
            <div style={{width: '100%', maxWidth: "1200px", display: 'flex', justifyContent: 'center', gap: '5px'}}>
                <div ref={divRef} style={{height: width ? width: 0, width: '48%', maxWidth: '48%'}}>
                    <PictureFrameFromDB img_name={firstUrls ? imageUrls[galleryIndexs[0]] : ''} h={width?width:0} w={width?width:0}/>
                </div>
                <div style={{height: width ? width: 0, width: '48%', maxWidth: '48%', display: 'flex', justifyContent: 'center', gap: '10px'}}>
                    <div style={{height: width ? width: 0, width: '48%', maxWidth: '48%'}}>
                        <div ref={smallDivRef} style={{width: '100%', display: 'flex', flexDirection:'column', gap: '10px'}}>
                            <PictureFrameFromDB img_name={firstUrls ? imageUrls[galleryIndexs[1]] : ''} h={width?width/2-5:0} w={smallWidth?smallWidth:0}/>
                            <PictureFrameFromDB img_name={firstUrls ? imageUrls[galleryIndexs[2]] : ''} h={width?width/2-5:0} w={smallWidth?smallWidth:0}/>
                        </div>
                    </div>
                    <div style={{height: width ? width: 0, width: '48%', maxWidth: '48%'}}>
                        <div ref={smallDivRef} style={{width: '100%', display: 'flex', flexDirection:'column', gap: '10px'}}>
                            <PictureFrameFromDB img_name={firstUrls ? imageUrls[galleryIndexs[3]] : ''} h={width?width/2-5:0} w={smallWidth?smallWidth:0}/>
                            <PictureFrameFromDB img_name={firstUrls ? imageUrls[galleryIndexs[4]] : ''} h={width?width/2-5:0} w={smallWidth?smallWidth:0}/>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', gap: '10px', margin: '10px'}}>
                <div style={{width: '1px'}}></div>
                <StyledButton text="Previous" click={()=>setGalleryPosition(galleryPosition - 5)} />
                <StyledButton text="Next" click={()=>setGalleryPosition(galleryPosition + 5)} />
                <div style={{width: '1px'}}></div>
            </div>
        </div>
    )
}

export default Gallery