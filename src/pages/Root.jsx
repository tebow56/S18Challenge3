import { Outlet, Link } from 'react-router-dom';



function Root() {
    return (
        <>
            <header>
                <nav id= 'navBar'>
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </nav>
            </header>
            <main>
            <Outlet/>
            </main>
            
        </>
    )
}

export default Root