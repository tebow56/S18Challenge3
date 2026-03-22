
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;


function Favorites() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [coinsData, setCoinsData] = useState([]) 

    async function getCoin(coin) {
        try {
            const newcoins = await fetch("https://rest.coincap.io/v3/assets", {
                headers: {Authorization: `Bearer ${API_KEY}`}
            });
            const responseNewCoins = await newcoins.json()
            const data = responseNewCoins.data
            const filteredData = data.filter((item) => item.id === coin)
            filteredData.forEach((item) => {
                if (!coinsData.some((coin) => coin.id === item.id)) {
                    setCoinsData((prevData) => [...prevData, item]);
                }
            });
        } catch (error) {
            setError('Error fetching coins: ' + error.message); 
        }
    }

    useEffect(() => {
        if (loading === true) {
        favorites.forEach((coin) => {
            if (!coinsData.some((item) => item.id === coin)) {
                getCoin(coin)
            }
        setLoading(false)
        }); 
        }   
    }, [favorites ])


     function deleteFavorite(coin) {
        if (favorites.includes(coin.id)) {
            const updatedFavorites = favorites.filter((fav) => fav !== coin.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites)
            setCoinsData(coinsData.filter((item) => item.id !== coin.id))
            window.location.reload()
        }
    }



    return (    
        
        <>
            <h2>Favorites</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {coinsData.map((coin) => {
                        return (
                            <>
                            <li key={coin.id}><strong>{coin.name}</strong> - {coin.priceUsd}$<button onClick={() => deleteFavorite(coin)}>Delete</button></li>
                            </>
                        )   
                    })}
                </ul>
        </>
    )
}

export default Favorites