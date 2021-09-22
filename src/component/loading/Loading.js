import './loading.css'
import { FcSynchronize } from "react-icons/fc";
import { useSelector } from 'react-redux';

const Loading = () => {
    const isLoading = useSelector((state) => state.loading)

    return(
        <div className="Loading"
        style={{display: isLoading ? 'flex' : 'none'}}>
            <FcSynchronize className="Loading-arrow" size={"150px"}/>
        </div>
    )
}

export default Loading;