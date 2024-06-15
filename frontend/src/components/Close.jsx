import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Close() {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <p>Cerrando sesión...</p>
        </div>
    )
}

export default Close