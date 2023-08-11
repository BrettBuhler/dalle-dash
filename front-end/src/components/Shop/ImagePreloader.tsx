import { useEffect } from 'react'
import img from '../../assets/coins.jpg'

const ImagePreloader = () => {
    useEffect(()=>{
        const preloadedImage = new Image()
        preloadedImage.src = img
    },[])
    return (
        <div style={{ display: 'none'}}>
            <img
                src={img}
                alt="preloaded"
            />
        </div>
    )
}

export default ImagePreloader