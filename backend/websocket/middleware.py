from urllib.parse import parse_qs
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token
import json

@database_sync_to_async
def get_user(token_key):
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return None

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope['query_string'].decode())
        token_key = query_string.get('token', [None])[0]
        user = None
        if token_key:
            user = await get_user(token_key)
        if user is None:
            accept = {
                'type': 'websocket.accept'
            }
            await send(accept)
            
            error_message = {
                'type': 'websocket.send',
                'text': json.dumps({'error': 'Invalid token'})
            }
            await send(error_message)
            
            close = {
                'type': 'websocket.close',
                'code': 4001  # Código de cierre personalizado
            }
            await send(close)
            return
        scope['user'] = user
        return await super().__call__(scope, receive, send)
