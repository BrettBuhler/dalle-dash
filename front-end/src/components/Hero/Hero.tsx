import { useEffect, useState } from "react"
import Pixelated from "../LoadIn/Pixelated"
import './HeroStyles.css'
interface HeroProps {
    title: string
    subTitle: string
    background: string
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, background }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const updateScreen = () => {
        setScreenWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', updateScreen)
        return () => {
            window.removeEventListener('resize', updateScreen)
        }
    },[])

    return (
        <section id="home" className="h-screen flex items-center justify-center" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundColor: 'black', backgroundPosition: "center", position: 'relative'}}>
            <Pixelated />
            <div className="top-0 left-0 w-full h-full bg-black absolute opacity-50"></div>
            <fieldset style={{transform: "rotateX(180deg)", border: '10px solid white', zIndex: 10}}className="rounded-br-2xl rounded-tl-2xl border-8 border-white bg-transparent p-4 flex justify-center items-center">
                <div className="bg-transparent p-2 mb-4">
                    <h1 style={{transform: "rotateX(180deg)"}} className={`${screenWidth > 450 ? "text-6xl" : "text-4xl"} font-bold text-white`}>{title}</h1>
                </div>
                <legend className={`${screenWidth > 450 ? "text-2xl" : screenWidth > 400 ? "text-xl" : screenWidth > 350 ? "text-lg" : "text-sm"} font-bold text-white mx-auto pb-3 pl-2 pr-2`} style={{transform: "rotateX(180deg)", color: 'white'}}>{subTitle}</legend>
            </fieldset>

        </section>
    )
}

export default Hero