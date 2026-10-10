from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'healthy', 'message': 'Fintech API is running'})

def serve_frontend(request):
    import os
    template_path = os.path.join(os.path.dirname(__file__), '..', 'fintech_backend', 'templates', 'index.html')
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    return HttpResponse(content, content_type='text/html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('health/', health_check),
    path('', serve_frontend),
]
