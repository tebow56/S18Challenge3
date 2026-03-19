import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coin from './pages/Coin';
import Favorites from './pages/Favorites';
import Root from './pages/Root'
import './App.css'


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Root/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/coin/:id' element={<Coin/>}/>
                    <Route path='/favorites' element={<Favorites/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App