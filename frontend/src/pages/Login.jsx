import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { networkLogin } from '../api/network';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [created, setCreated] = useState(false);
    const [error, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState('');

    useEffect(() => {
        document.title = 'Inicio de sesión';
        const auth_token = localStorage.getItem('auth_token');
        if (auth_token) {
            navigate('/posts');
        }
    }, [navigate]);

    const onSubmit = async data => {
        try {
            const response = await networkLogin(data);
            if (response.status === 200) {
                setError(false);
                setCreated(true);
                setErrorDetail('');
                localStorage.setItem('auth_token', response.data.token);
                navigate('/posts');
            }
        } catch (error) {
            setError(true);
            setCreated(false);
            if (error.response && error.response.data) {
                console.log('Datos del error:', error.response.data);
                const errorData = error.response.data;

                // Verificar si hay un mensaje de error general.
                if (errorData.error) {
                    setErrorDetail(errorData.error);
                } else {
                    // Recopilar todos los mensajes de error de los campos individuales.
                    const fieldErrors = [];
                    for (const field in errorData) {
                        if (Array.isArray(errorData[field])) {
                            fieldErrors.push(...errorData[field]);
                        } else if (typeof errorData[field] === 'string') {
                            fieldErrors.push(errorData[field]);
                        }
                    }
                    // Asignar los mensajes de error detallados si existen, de lo contrario un error desconocido.
                    if (fieldErrors.length > 0) {
                        setErrorDetail(fieldErrors.join(' '));
                    } else {
                        setErrorDetail('Error desconocido');
                    }
                }
            } else if (error.message) {
                setErrorDetail('Error de conexión');
            } else {
                console.log('Datos del error:', Object.values(error.response.data));
                setErrorDetail('Error en la comunicación con el servidor');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className='login-container'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <h2>Inicia sesión</h2>
                    {created &&
                        <div>
                            <h2 style={{ color: 'green' }}>Has iniciado sesión :D</h2>
                        </div>
                    }
                    {error &&
                        <div>
                            <h2 style={{ color: 'red' }}>{errorDetail}</h2>
                        </div>
                    }

                    <div>
                        <h3>Nombre de usuario</h3>
                        {errors.username && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu nombre de usuario' type="text" name="username" {...register('username', { required: true })} />
                    </div>

                    <div>
                        <h3>Contraseña</h3>
                        {errors.password && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu contraseña' type="password" name="password" {...register('password', { required: true })} />
                    </div>
                    <br />
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Login;