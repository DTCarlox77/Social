import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function PostSocket() {
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Toma el token de autenticación de usuario desde la localstorage.
        const auth_token = localStorage.getItem('auth_token');
        const websocket = new WebSocket('ws://localhost:8000/ws/posts/code/?token=' + auth_token);

        websocket.onmessage = (event) => {
            const json_data = JSON.parse(event.data);
            setData(json_data);
        }

        websocket.onclose = (event) => {

            // Código personalizado de desconexión en el middleware para pedir un token de usuario.
            if (event.code === 4001) {
                console.log("Invalid token. Redirecting to login...");
                localStorage.removeItem('auth_token');

                // Redirige al usuario a la pestaña de inicio de sesión.
                navigate('/login');
            } else {
                console.log('Conexión cerrada.');
            }
        }

        setSocket(websocket);

        return () => {
            websocket.close();
        }
    }, [navigate]);


    return { socket, data }
}

export default PostSocket