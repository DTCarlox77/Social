import Navbar from "../components/Navbar";
import { useEffect } from "react";

function Network() {
    useEffect(() => {
        document.title = 'Social';
        
        const handleScroll = () => {
            const sections = document.querySelectorAll('.description-section');
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight - 50) {
                    section.classList.add('in-view');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className="presentation">
                <h2>Bienvenido a Social</h2>
                <div className="description-section">
                    <p className="fade-in">Social es tu red social para compartir pensamientos, interactuar con amigos y descubrir contenido interesante. ¡Únete a la comunidad y empieza a conectar!</p>
                    <img src="../public/images/1.png" alt="Descripción de la imagen" className="responsive-image" />
                </div>
                <div className="description-section">
                    <p className="fade-in">Explora publicaciones de otros usuarios, dale me gusta a lo que te encanta y comparte tus propios momentos. La simplicidad y la diversión están a solo un clic de distancia.</p>
                    <img src="../public/images/2.png" alt="Descripción de la imagen" className="responsive-image" />
                </div>
                <div className="description-section">
                    <p className="fade-in">Con Social, tus conexiones son más significativas. Únete hoy y experimenta una forma nueva de estar en contacto con tus seres queridos.</p>
                    <img src="../public/images/3.png" alt="Descripción de la imagen" className="responsive-image" />
                </div>
                <h3>Por: DTCarlox77</h3>
                <ul>
                    <li>Inspirado en Network: Project 4 CS50W.</li>
                </ul>
                <h3>Elaborado con React y Django Rest Framework.</h3>
            </div>
        </>
    );
}

export default Network;
