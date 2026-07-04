from django.urls import path, include
from .views import (
    UsersAPIView,
    LoginAPIView,
    MeAPIView,
    EmployeesAPIView,
    ProductsAPIView,
    SalesAPIView,
    TodosAPIView
)

urlpatterns = [

    path("auth/login/", LoginAPIView.as_view()),
    path("auth/me/", MeAPIView.as_view()),

    path("users/", UsersAPIView.as_view()),  # GET(전체), POST
    path("users/<int:pk>/", UsersAPIView.as_view()),  # GET(단건), PUT, DELETE

    path("employees/", EmployeesAPIView.as_view()),
    path("employees/<int:pk>/", EmployeesAPIView.as_view()),

    path("products/", ProductsAPIView.as_view()),
    path("products/<int:pk>/", ProductsAPIView.as_view()),

    path("sales/", SalesAPIView.as_view()),
    path("sales/<int:pk>/", SalesAPIView.as_view()),

    path("todos/", TodosAPIView.as_view()),
    path("todos/<int:pk>/", TodosAPIView.as_view()),
]

