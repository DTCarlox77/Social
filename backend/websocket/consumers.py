from channels.generic.websocket import AsyncWebsocketConsumer
import json
from network.models import Post, User
from datetime import datetime

class PostConsumer(AsyncWebsocketConsumer):
    
    posts = []
    
    async def connect(self):
        
        self.room_name = self.scope['url_route']['kwargs']['code']
        self.room_group_name = f'network_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
        
        for post in self.posts:
        
            await self.send(text_data=json.dumps({
                'data_type' : post['data_type'],
                'post' : post['post'],
                'username' : post['username'],
                'likes' : post['likes'],
                'timestamp' : post['timestamp'],
            }))
    
    async def disconnect(self, close_code):
        
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        
        await self.close()
    
    async def receive(self, text_data):
        
        data = json.loads(text_data)
        
        if data['data_type'] == 'post':
            
            self.posts.append({
                'type' : 'send_posts',
                'data_type' : 'post',
                'post' : data['post'],
                'username' : 'default',
                'likes' : data['likes'],
                'timestamp' : '14 Jul 2024'
            })
            
            await self.channel_layer.group_send(
                self.room_group_name, {
                    'type' : 'send_posts',
                    'data_type' : 'post',
                    'post' : data['post'],
                    'username' : 'default',
                    'likes' : data['likes'],
                    'timestamp' : '14 Jul 2024'
                }
            )
            
        elif data['data_type'] == 'increment':
            self.posts[data['index']]['likes'] += 1
            
            await self.channel_layer.group_send(
                self.room_group_name, {
                    'type' : 'update_like',
                    'data_type' : 'increment',
                    'index' : data['index']
                }
            )
            
    async def update_like(self, event):
        
        data_type = event['data_type']
        index = event['index']
        
        await self.send(text_data=json.dumps({
            'data_type' : data_type,
            'index' : index
        }))
            
    async def send_posts(self, event):
        
        data_type = event['data_type']
        post = event['post']
        username = event['username']
        likes = event['likes']
        timestamp = event['timestamp']
        
        await self.send(text_data=json.dumps({
            'data_type' : data_type,
            'post' : post,
            'username' : username,
            'likes' : likes,
            'timestamp' : timestamp,
        }))