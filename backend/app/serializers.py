from rest_framework import serializers
from .models import (
    Users,
    Employees,
    Products,
    Sales,
    Todos
)



class TodosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todos
        fields = "__all__"


class SalesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sales
        fields = "__all__"


class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = "__all__"


class EmployeesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employees
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"