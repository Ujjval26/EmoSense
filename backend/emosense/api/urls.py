from django.urls import path
from . import views
from . import Modelview

urlpatterns = [
    path('api/signup/',views.signup),
    path('api/login/',views.login),
    path('api/photo/',views.photo_upload),
    path('api/profile/<int:pk>',views.profile),
    path('api/model/',Modelview.predict_emotion),
    path('api/editProfile/<int:pk>',views.edit_profile),
   
    
    
]


