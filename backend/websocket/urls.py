from .routing import websocket_urlpatterns
from django.urls import path, include

urlpatterns = [
    path('ws/', include(websocket_urlpatterns))
]
