import { useState, useEffect } from "react"

const Pixelated = () => {
    const [renderPixelated, setRenderPixelated] = useState(true)
    const [cascade, setCascade] = useState(false)
    const [didRender, setDidRender] = useState(false)
    const [tempBg, setTempBg] = useState(true)
    const [divArr, setDivArr] = useState<number[]>([])


    const didRenderSetter = () => {
        setDidRender(true)
    }

    useEffect(()=>{
        if (!didRender){
            didRenderSetter()
            let divArr1 = []
            for (let i = 0; i < 625; i++){
                const rand = Math.floor(Math.random() * 16)
                divArr1.push(rand / 10)
                setDivArr(divArr1)
            }
        }
        setTimeout(()=>{
            setCascade(true)
            setTempBg(false)
            setTimeout(()=>{
                setRenderPixelated(false)
            },2000)
        }, 1000)
    },[])

    if (!renderPixelated) {
        return null
    }

    return (
        <div style={{position: 'fixed', height: '100vh', width: '100vw', top: 0, left: 0, zIndex: 1, display: 'flex', flexWrap: 'wrap', pointerEvents: 'none', background: tempBg ? "black" : '',}}>
            {divArr.map((item, i) => <div key={`fade_in_${i}`}style={{height: '4vh', width: '4vw', background: 'black', opacity: cascade ? 0 : 1, transition: `opacity ${item}s ease-in-out`, flexGrow: 1}}></div>)}
        </div>
    )
}

export default Pixelated