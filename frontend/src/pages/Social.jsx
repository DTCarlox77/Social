import Post from '../components/Post'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';

const websocket_url = 'http://localhost:8000/ws/posts/code/';
const websocket = new WebSocket(websocket_url);    

function Social() {

    const [posts, setPosts] = useState([]);
    const [contador, setContador] = useState(0);

    useState(() => {
        websocket.onopen = () => {
            setPosts([]);
        }

        document.title = `contador: ${contador}`;
        setContador(contador => contador + 1)

    }, [posts]);

    websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.data_type == 'post') {
            setPosts(posts => [...posts, {
                index : data.index,
                username : data.username,
                post : data.post,
                timestamp : data.timestamp,
                likes : data.likes
            }]);
        }
        else if (data.data_type == 'increment') {
            setPosts(posts => posts.map((post, id) => id === data.index ? {
                ...post, likes: post.likes + 1
            } : post));
        }
    }
    
    return (
        <div>
            <Navbar/>
            
            {
                posts.map((post, index) =>
                    <Post key={index} username={post.username} post_text={post.post} likes={post.likes} date={post.timestamp} index={index}/>
                )
            }
            
        </div>
    )
}

export default Social