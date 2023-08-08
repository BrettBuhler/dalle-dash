import { useNavigate } from 'react-router-dom'
//import PictureFrameFromDB from '../PictureFrame/PictureFrameFromDB'
import Gallery from '../Gallery/Gallery'

const HomePage: React.FC = ({}) => {
    const navigate = useNavigate()
    //const imageArray = ['image_1691295487372.jpg','image_1691294381879.jpg','image_1691293596240.jpg']
    return (
        <div>
            <h1>HOME</h1>
            <button onClick={()=>navigate('/login')}>Log In</button>
            <button onClick={()=>navigate('/signup')}>Sign Up</button>
            <div style={{display: 'flex', gap:10}}>
            {/*imageArray.map((url)=><PictureFrameFromDB img_name={url} h={400} w={400}/>)*/}
            </div>
            <Gallery userId={21}/>
        </div>
    )
}

export default HomePage