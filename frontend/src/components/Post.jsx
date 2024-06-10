import React from 'react';

const websocket_url = 'http://localhost:8000/ws/posts/code/';
const websocket = new WebSocket(websocket_url);    

function Post({ username, post_text, likes, date, index }) {

    const incrementLike = () => {
        websocket.send(JSON.stringify({
            'data_type' : 'increment',
            'index' : index
        }));
    }

    return (
        <div className="post">
            <h2 className="post-username">@{username}</h2>
            <h6 className="post-date">{date}</h6>
            <p className="post-text">{post_text}</p>
            <button className="post-likes" onClick={ () => {incrementLike()} }>♡ {likes}</button>
        </div>
    );
}

export default Post;
