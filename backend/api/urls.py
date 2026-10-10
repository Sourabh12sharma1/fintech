"""
API URL Configuration.
"""

from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('contact/', views.contact_submit, name='contact_submit'),
    path('demo/', views.demo_request, name='demo_request'),
    path('market/overview/', views.market_overview, name='market_overview'),
    path('features/', views.get_features, name='get_features'),
    path('testimonials/', views.get_testimonials, name='get_testimonials'),
    path('models/', views.get_models_info, name='get_models_info'),
    path('solutions/', views.get_solutions, name='get_solutions'),
    path('security/features/', views.get_security_features, name='get_security_features'),
]
