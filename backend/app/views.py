from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from .authentication import UsersJWTAuthentication
from django.contrib.auth.hashers import make_password, check_password

from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Users,
    Employees,
    Products,
    Sales,
    Todos,
)
from .serializers import (
    LoginSerializer,
    UsersSerializer,
    EmployeesSerializer,
    ProductsSerializer,
    SalesSerializer,
    TodosSerializer
)



class TodosAPIView(APIView):

    # 전체 조회 / 단건 조회
    def get(self, request, pk=None):

        if pk is None:
            todos = Todos.objects.all()
            serializer = TodosSerializer(todos, many=True)
            return Response(serializer.data)

        todo = get_object_or_404(Todos, pk=pk)
        serializer = TodosSerializer(todo)

        return Response(serializer.data)

    # 등록
    def post(self, request):

        serializer = TodosSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 수정
    def put(self, request, pk):

        todo = get_object_or_404(Todos, pk=pk)

        serializer = TodosSerializer(
            todo,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 삭제
    def delete(self, request, pk):

        todo = get_object_or_404(Todos, pk=pk)

        todo.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )



class SalesAPIView(APIView):

    # 전체 조회 / 단건 조회
    def get(self, request, pk=None):

        if pk is None:
            sales = Sales.objects.all()
            serializer = SalesSerializer(sales, many=True)
            return Response(serializer.data)

        sale = get_object_or_404(Sales, pk=pk)
        serializer = SalesSerializer(sale)

        return Response(serializer.data)

    # 등록
    def post(self, request):

        serializer = SalesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 수정
    def put(self, request, pk):

        sale = get_object_or_404(Sales, pk=pk)

        serializer = SalesSerializer(
            sale,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 삭제
    def delete(self, request, pk):

        sale = get_object_or_404(Sales, pk=pk)

        sale.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )




class ProductsAPIView(APIView):

    # 전체 조회 / 단건 조회
    def get(self, request, pk=None):

        if pk is None:
            products = Products.objects.all()
            serializer = ProductsSerializer(products, many=True)
            return Response(serializer.data)

        product = get_object_or_404(Products, pk=pk)
        serializer = ProductsSerializer(product)

        return Response(serializer.data)

    # 등록
    def post(self, request):

        serializer = ProductsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 수정
    def put(self, request, pk):

        product = get_object_or_404(Products, pk=pk)

        serializer = ProductsSerializer(
            product,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 삭제
    def delete(self, request, pk):

        product = get_object_or_404(Products, pk=pk)

        product.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )



class EmployeesAPIView(APIView):

    # 전체 조회 / 단건 조회
    def get(self, request, pk=None):

        if pk is None:
            employees = Employees.objects.all()
            serializer = EmployeesSerializer(employees, many=True)
            return Response(serializer.data)

        employee = get_object_or_404(Employees, pk=pk)
        serializer = EmployeesSerializer(employee)

        return Response(serializer.data)

    # 등록
    def post(self, request):

        serializer = EmployeesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 수정
    def put(self, request, pk):

        employee = get_object_or_404(Employees, pk=pk)

        serializer = EmployeesSerializer(
            employee,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # 삭제
    def delete(self, request, pk):

        employee = get_object_or_404(Employees, pk=pk)

        employee.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )


class LoginAPIView(APIView):

    authentication_classes = []

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]
        print("login", username, password)

        try:
            user = Users.objects.get(username=username)

        except Users.DoesNotExist:

            return Response(
                {"message": "아이디가 존재하지 않습니다."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 암호화된 비밀번호 비교
        if not check_password(password, user.password):
            return Response(
                {"message": "비밀번호가 일치하지 않습니다."},
                status=status.HTTP_400_BAD_REQUEST
            )
        refresh = RefreshToken()
        refresh["user_id"] = user.id

        return Response({

            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UsersSerializer(user).data

        })


class MeAPIView(APIView):
    authentication_classes = [UsersJWTAuthentication]
    def get(self, request):
        serializer = UsersSerializer(request.user)
        return Response(serializer.data)


class UsersAPIView(APIView):

    # 전체 조회 / 단건 조회
    def get(self, request, pk=None):

        if pk is None:
            users = Users.objects.all()
            serializer = UsersSerializer(users, many=True)
            return Response(serializer.data)

        user = get_object_or_404(Users, pk=pk)
        serializer = UsersSerializer(user)
        return Response(serializer.data)

    # 회원 등록
    def post(self, request):

        data = request.data.copy()
        data["password"] = make_password(data["password"])

        serializer = UsersSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 회원 수정
    def put(self, request, pk):

        user = get_object_or_404(Users, pk=pk)

        data = request.data.copy()

        # 비밀번호를 수정하는 경우만 암호화
        if "password" in data and data["password"]:
            data["password"] = make_password(data["password"])
        else:
            data["password"] = user.password

        serializer = UsersSerializer(user, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 회원 삭제
    def delete(self, request, pk):

        user = get_object_or_404(Users, pk=pk)
        user.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )

