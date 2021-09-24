import './starVoter.css';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

import { useCookies } from 'react-cookie';

const StartVoter = ({ imdbID, rate }) => {
    const stars = 5
    const [cookies, setCookies] = useCookies(['favorites'])

    //----------------------------------------------------------------
    //Components functions
    //----------------------------------------------------------------
    //Converts rate into starArray
    const converter = (rate) => {
        const buffer = new Array(stars)
        return buffer.fill(true, 0, rate).fill(false, rate, stars)      
    }

    //----------------------------------------------------------------
    return(
        <div className="StarVoter">
            {converter(rate).map((star, rate) => 
                <div className="StarVoter-star" key={rate}
                onClick={() => {
                    cookies.favorites.forEach((fav, index) => {
                        if(fav.imdbID === imdbID) {
                            const buffer = cookies.favorites
                            buffer[index] = { 
                                imdbID: fav.imdbID, 
                                rate: rate+1, 
                                watched:  buffer[index].watched}
                            setCookies('favorites',  buffer, { path: '/' })
                        }
                    })
                }}>

                    {star ? <AiFillStar size={'10vh'} color={'yellow'}/>: <AiOutlineStar size={'10vh'}/>}
               
                </div>
            )}
            
        </div>
    )
}

export default StartVoter;