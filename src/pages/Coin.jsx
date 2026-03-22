const API_KEY = import.meta.env.VITE_API_KEY;
import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

function Coin() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    async function getCoin() {
        try {
            const newcoins = await fetch(`https://rest.coincap.io/v3/assets?search=${id}`, {
                headers: {Authorization: `Bearer ${API_KEY}`}
            });
            const responseNewCoins = await newcoins.json()
            const data = responseNewCoins.data[0]
            setCoin(data)
        } catch (error) {
            setError('Error fetching coins: ' + error.message); 
        }
    }
    useEffect(() => {
        getCoin()
        return() => {
            setCoin(null)
        }
    }, [id])    
    



    return (
        <> {coin && (
            <>
            <h2> {coin.name}</h2>
                <p>Price: {coin.priceUsd}</p>
                <p>Market Cap: {coin.marketCapUsd}</p>
                <p>Volume (24Hr): {coin.volumeUsd24Hr}</p>
            </>

        )}</>

    )
}

export default Coin