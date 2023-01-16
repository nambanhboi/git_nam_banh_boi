from django.urls import path 
from . import views
urlpatterns = [
    path('', views.index),
    path('buy/<int:pk>/', views.buy, name='buy'),
    # path('bill/',views.bill, name ='bill'),
]
 