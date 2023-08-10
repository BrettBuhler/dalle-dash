import Display from "./ProductDisplay"
import Sidebar from "../Sidebar/Sidebar"

const Shop = () => {
    return (
        <div style={{minHeight: '100vh', minWidth: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Sidebar />
            <Display />
        </div>
    )
}

export default Shop