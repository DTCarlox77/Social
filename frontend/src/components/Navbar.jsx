import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewPost from '../pages/NewPost';

function Navbar() {

    const [newPostActivo, setNewPostActivo] = useState(false);
    const [logueado, setLogueado] = useState(false);

    const auth_token = localStorage.getItem('auth_token');

    useEffect(() => {
        document.title = 'Posts';
        if (auth_token) {
            setLogueado(true);
        }
    }, [auth_token]);

    return (
        <>
            <div className="navbar">
                <Link to='/'>
                    <h2 className="navbar-title">Social</h2>
                </Link>
                <div className="navbar-urls">

                    {logueado ? (
                        <>
                            <Link to="/posts">
                                <button className="navbar-button">Posts</button>
                            </Link>
                            <Link to="#">
                                <button className="navbar-button" onClick={() => setNewPostActivo(!newPostActivo)}>Nuevo Post</button>
                            </Link>
                            <Link to="/close">
                                <button className="navbar-button">Cerrar sesión</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register">
                                <button className="navbar-button">Registro</button>
                            </Link>
                            <Link to="/login">
                                <button className="navbar-button">Iniciar sesión</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {newPostActivo && (<NewPost activo={newPostActivo} setActivo={setNewPostActivo} />)}
        </>
    );
}

export default Navbar;
