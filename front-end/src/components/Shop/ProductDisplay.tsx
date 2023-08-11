import React, { useState, useEffect } from "react"
import { useAppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import Theme from "../../utils/themeProvider"
import StyledButton from "../StyledButton/StyledButton"
import coinImg from '../../assets/coins.jpg'
import getAuth from "../../utils/getAuth"

import './ShopStyles.css'

interface ProductDisplayProps {
    user_id: number
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({user_id}) => {
    const {darkMode, user, setUser} = useAppContext()
    const navigate = useNavigate()
    const [theme, setTheme] = useState(new Theme(darkMode))
    const [isHovered, setIsHovered] = useState(false)
    const [isHovered2, setIsHovered2] = useState(false)

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const handleMouseEnter2 = () => {
      setIsHovered2(true)
    }

    const handleMouseLeave2 = () => {
      setIsHovered2(false)
    }

    useEffect(() => {
      setTheme(new Theme(darkMode))
    },[darkMode])

    useEffect(() => {
      const getAuthHelper = async () => {
        const response = await getAuth()
        if (response.id) {
          setUser(response)
        } else {
          console.error("User is Authenticated but getAuth failed")
        }
      }
      if (!user) {
        getAuthHelper()
      }
    },[])

    return (
        <section style={{background: `#${theme.light}`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100vh'}}>
            <div className="product" style={{background: `#${theme.dark}`, borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems:'center', padding:'20px', marginRight:'10px', marginLeft: '10px'}}>
                <img
                    src={coinImg}
                    alt="DallE Dash Token"
                    style={{maxHeight: '60vh', maxWidth: '40vh', height: '60vh', width: '40vh'}}
                />
                <div className="description" style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
                    <h3 className="shop-title" style={{textAlign: 'center', fontFamily: "monospace", fontWeight: '900', color: `#${theme.light}`,}}>DallE Dash Tokens(50)</h3>
                    <h3 className="shop-title" style={{fontFamily: "monospace", fontWeight: '900', color: `#${theme.light}`,}}>$5.00</h3>
                </div>
                <form action="/create-checkout-session" method="POST" style={{width: '100%'}}>
                  <input
                      type="number"
                      id="user_id"
                      value={user_id}
                      name="user_id"
                      readOnly
                      style={{display: 'none'}}
                  />
                  <div style={{display: 'flex', gap: '10px', width:'100%'}}>
                    <button onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="check-out-button"
                    type="submit"
                    role="link"
                    style={{
                      width: "100%",
                      padding: '5px',
                      backgroundColor: isHovered ? `#${theme.dark}` : `#${theme.light}`,
                      color: isHovered ? `#${theme.light}` : `#${theme.dark}`,
                      transition: 'background-color 0.3s ease-in-out',
                      border: `2px solid #${isHovered ? theme.light : theme.dark}`,
                      borderRadius: '5px',
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                    >
                      Checkout
                  </button>
                  <button onMouseEnter={handleMouseEnter2}
                    onMouseLeave={handleMouseLeave2}
                    className="check-out-button"
                    type="button"
                    onClick={()=>navigate('/dashboard')}
                    style={{
                      width: "100%",
                      padding: '5px',
                      backgroundColor: isHovered2 ? `#${theme.dark}` : `#${theme.light}`,
                      color: isHovered2 ? `#${theme.light}` : `#${theme.dark}`,
                      transition: 'background-color 0.3s ease-in-out',
                      border: `2px solid #${isHovered2 ? theme.light : theme.dark}`,
                      borderRadius: '5px',
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                    >
                      Back
                  </button>
                  </div>
                </form>
            </div>
        </section>
    )
}

  

interface MessageProps {
    message: string
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const {darkMode} = useAppContext()
  const [theme, setTheme] = useState(new Theme(darkMode))
  const navigate = useNavigate()

  useEffect(()=>{
    setTheme(new Theme(darkMode))
  },[darkMode])

  return (
      <section style={{width: '100%', minHeight:'100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `#${theme.light}`}}>
        <div style={{padding: '25px', display: 'flex', flexDirection: 'column', gap: '10px', background: `#${theme.mid_light}`}}>
          <h2 style={{fontFamily: "monospace", fontWeight: '900', fontSize:'2rem', color: `#${theme.dark}`, marginBottom: 0}}>Welcome Back!</h2>
          <p style={{fontFamily: "monospace", fontWeight: '900', fontSize:'1rem', color: `#${theme.dark}`, marginBottom: 0}}>{message}</p>
          <StyledButton text="Dashboard" click={()=>navigate('/dashboard')}/>
        </div>
      </section>
    )
  }

export default function Display() {
  const [message, setMessage] = useState("");
  const {user} = useAppContext()
  const [userId, setUserId] = useState(18)
  useEffect(()=>{
    if (user) {
        setUserId(user.id)
    }
  },[])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay user_id={userId}/>
  );
}