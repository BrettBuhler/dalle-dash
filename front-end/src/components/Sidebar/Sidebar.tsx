import { useAppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import {BsBrightnessHighFill} from "react-icons/bs"
import {RiGalleryFill} from "react-icons/ri"
import {TfiGallery} from "react-icons/tfi"
import {HiShoppingCart} from "react-icons/hi"
import {MdAddPhotoAlternate} from "react-icons/md"
import {RiLogoutBoxRFill} from 'react-icons/ri'

import logout from "../../utils/logout"

import Theme from "../../utils/themeProvider"

import StyledSidebarItem from "./StyledSidebarItem"

const Sidebar = () => {
    const {darkMode, toggleDarkMode} = useAppContext()
    const [theme, setTheme] = useState(new Theme(darkMode))

    const navigate = useNavigate()

    useEffect(()=>{
        setTheme(new Theme(darkMode))
    },[darkMode])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleCommunityGallery = () => {
        navigate('/communitygallery')
    }

    const handleMyGallery = () => {
        navigate('/mygallery')
    }

    const handleGenerate = () => {
        navigate('/generate')
    }

    const handleShop = () => {
        navigate('/shop')
    }


    return (
        <div style={{position: 'fixed', top: 0, left: 0, height: '100vh', width: '75px', background: `#${theme.mid_dark}`, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: "space-evenly", overflowY: 'auto',}}>
            <StyledSidebarItem click={handleGenerate}><MdAddPhotoAlternate style={{fontSize: '40px', color: `#${theme.light}`}}/></StyledSidebarItem>
            <StyledSidebarItem click={handleShop}><HiShoppingCart style={{fontSize: '40px', color: `#${theme.light}`}}/></StyledSidebarItem>
            <StyledSidebarItem click={handleMyGallery}><RiGalleryFill style={{fontSize: '40px', color: `#${theme.light}`}}/></StyledSidebarItem>
            <StyledSidebarItem click={handleCommunityGallery}><TfiGallery style={{fontSize: '40px', color: `#${theme.light}`}}/></StyledSidebarItem>
            <StyledSidebarItem click={toggleDarkMode}><BsBrightnessHighFill style={{fontSize: '40px', color: `#${theme.light}`}}/></StyledSidebarItem>
            <StyledSidebarItem click={handleLogout}><RiLogoutBoxRFill style={{fontSize: '40px', color: `#${theme.light}`}}/></StyledSidebarItem>
        </div>
    )
}

export default Sidebar