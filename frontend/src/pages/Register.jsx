import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

function Register() {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = data => {
        console.log(data); // Aquí puedes enviar los datos a tu backend para autenticación.
    };

    return (
        <div>
            <Navbar />
            <div className='login-container'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <h2>Crear cuenta</h2>
                    <div>
                        <h3>Nombre de usuario</h3>
                        {errors.username && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu nombre de usuario' type="text" name="username" {...register('username', { required: true })} />
                    </div>

                    <div>
                        <h3>Correo</h3>
                        {errors.username && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu correo' type="text" name="email" {...register('email', { required: true })} />
                    </div>

                    <div>
                        <h3>Contraseña</h3>
                        {errors.password && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu contraseña' type="password" name="password" {...register('password', { required: true })} />
                    </div>
                    <br />
                    <button type="submit">Registrarme</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
