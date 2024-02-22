from django.urls import path
from .views import RegisterView, AnonymousView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('anonymous/',AnonymousView.as_view()),
    path('login/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]