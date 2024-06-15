import Post from '../components/Post';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import PostSocket from '../sockets/PostSocket';

function Social() {
    const { socket, data } = PostSocket();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data) {
            if (data.data_type === 'post') {
                setPosts(posts => [...posts, {
                    index: data.index,
                    username: data.username,
                    post: data.post,
                    timestamp: data.timestamp,
                    likes: data.likes
                }]);
            } else if (data.data_type === 'increment') {
                setPosts(posts => posts.map((post, id) => id === data.index ? {
                    ...post, likes: post.likes + 1
                } : post));
            }
        }
    }, [data]);

    return (
        <div>
            <Navbar />
            {
                posts.map((post, index) =>
                    <Post key={index} username={post.username} post_text={post.post} likes={post.likes} date={post.timestamp} index={index} />
                )
            }
        </div>
    );
}

export default Social;