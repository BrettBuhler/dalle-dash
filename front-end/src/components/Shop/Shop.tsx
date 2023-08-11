import {useState, useEffect, useRef} from 'react'

import Display from "./ProductDisplay"
import Sidebar from "../Sidebar/Sidebar"

const Shop = () => {
    const [width, setWidth] = useState(0)
    const screenRef = useRef<HTMLDivElement>(null)

    const handleResize = () => {
        if (screenRef.current){
            setWidth(screenRef.current.offsetWidth)
        }
    }

    useEffect(()=>{
        document.addEventListener('resize', handleResize)
        return () => {
            document.removeEventListener('resize', handleResize)
        }
    },[])
    return (
        <div ref={screenRef} style={{minHeight: '100vh', width: `${width - 75}px`, maxWidth: `${width - 75}px`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '75px'}}>
            <Sidebar />
            <Display />
        </div>
    )
}

export default Shop