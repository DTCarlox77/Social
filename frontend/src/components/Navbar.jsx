import { Link } from 'react-router-dom';
import { useState } from 'react';
import NewPost from '../pages/NewPost';

function Navbar() {

    const [newPostActivo, setNewPostActivo] = useState(false);
    const condicion = true;

    return (
        <>        
        <div className="navbar">
            <h2 className="navbar-title">Network</h2>
            <div className="navbar-urls">
                <Link to="/posts">
                    <button className="navbar-button">Posts</button>
                </Link>
                
                {condicion ? (
                    <>                    
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
        {newPostActivo && ( <NewPost activo={newPostActivo} setActivo={setNewPostActivo} /> )}
        </>
    );
}

export default Navbar;
