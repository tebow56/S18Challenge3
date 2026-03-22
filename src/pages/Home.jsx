import { useState } from "react";
import {Link} from 'react-router-dom'
const API_KEY = import.meta.env.VITE_API_KEY;

function Home () {
    const [coins, setCoins] = useState([])
    const [error, setError] = useState(null)

    async function getCoins() {
        try {
            const newcoins = await fetch("https://rest.coincap.io/v3/assets", {
                headers: {Authorization: `Bearer ${API_KEY}`}
            });
            const responseNewCoins = await newcoins.json()
            const data = responseNewCoins.data
            setCoins(data) 
            
            
        } catch (error) {
            setError('Error fetching coins: ' + error.message); 
        }
    }

    function favoriteCoin(coin) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(coin.id)) {
            favorites.push(coin.id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }


    return (

        <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2> Home</h2>
                <button onClick={getCoins}>Get Coins</button>
                <ul>
                    {coins.map((coin) => {
                        return (
                            <>
                            <li key={coin.id}><Link to={`/coin/${coin.id}`}><strong>{coin.name}</strong> - {coin.priceUsd}$</Link>        <button onClick={() => favoriteCoin(coin)}>Favorite</button></li>
                            </>
                        )   
                    })}
                </ul>

        </>
    )
}

export default Home