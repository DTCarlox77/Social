from django.urls import path
from .consumers import PostConsumer

websocket_urlpatterns = [
    path(r'ws/posts/<str:code>/', PostConsumer.as_asgi())
]