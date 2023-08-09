import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";

interface ProductDisplayProps {
    user_id: number
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({user_id}) => {
    return (
        <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
        <input
            type="number"
            id="user_id"
            value={user_id}
            name="user_id"
            readOnly
        />
        <button type="submit" role="link">
        Checkout
      </button>
        </form>
  </section>
    )
}

  

interface MessageProps {
    message: string
}

const Message: React.FC<MessageProps> = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

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
    // Check to see if this is a redirect back from Checkout
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