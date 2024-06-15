import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    useEffect(() => {
        document.title = '404';
    }, []);

    return (
        <div className="not-found">
            <h2>404 - Página No Encontrada</h2>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/">Volver a la página principal</Link>
        </div>
    );
}

export default NotFound;
