import React, { useState, useEffect } from "react"
import { useAppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import Theme from "../../utils/themeProvider"
import StyledButton from "../StyledButton/StyledButton"
import coinImg from '../../assets/coins.jpg'

interface ProductDisplayProps {
    user_id: number
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({user_id}) => {
    const {darkMode, user} = useAppContext()
    const navigate = useNavigate()
    const [theme, setTheme] = useState(new Theme(darkMode))

    useEffect(() => {
      setTheme(new Theme(darkMode))
    },[darkMode])
    useEffect(() => {
      if (!user) {
        navigate('/dashboard')
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
                    <h3 style={{fontFamily: "monospace", fontWeight: '900', fontSize:'1.5rem', color: `#${theme.light}`, marginBottom: 0}}>Dall E Dash Tokens (50)</h3>
                    <h5 style={{fontFamily: "monospace", fontWeight: '900', fontSize:'1.2rem', color: `#${theme.light}`, marginBottom: 0}}>$5.00</h5>
                </div>
                <form action="/create-checkout-session" method="POST">
                  <input
                      type="number"
                      id="user_id"
                      value={user_id}
                      name="user_id"
                      readOnly
                      style={{display: 'none'}}
                  />
                  <button type="submit" role="link">
                      Checkout
                  </button>
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