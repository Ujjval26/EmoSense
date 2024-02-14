from django.urls import path
from . import views

urlpatterns = [
    path('api/signup/',views.signup),
    path('api/login/',views.login),
    path('api/photo/',views.photo_upload),
    path('api/profile/<int:pk>',views.profile),
    path('api/profile/<int:pk>',views.profile),
    
    
    
]


