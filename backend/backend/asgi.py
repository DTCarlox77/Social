"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from websocket.middleware import TokenAuthMiddleware
from django.core.asgi import get_asgi_application

from websocket.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = ProtocolTypeRouter({
    'http' : get_asgi_application(),
    'websocket' : TokenAuthMiddleware(
        URLRouter(
            websocket_urlpatterns
        )
    )
})
