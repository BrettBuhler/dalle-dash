import signup from "../../utils/signup"

const Signup = ({}) => {

    const handleSignup = async () => {
        try {
            await signup('testemail@email.com', 'testpassword123')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>SIGN UP PAGE</h1>
            <button onClick={handleSignup}>TEST SIGNUP</button>
        </div>
    )
}

export default Signup