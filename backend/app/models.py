from django.db import models


class Todos(models.Model):

    subject = models.CharField(max_length=200)
    checked = models.BooleanField(default=False)

    class Meta:
        db_table = "todos"

    def __str__(self):
        return self.subject



class Sales(models.Model):

    user_id = models.IntegerField()
    product_id = models.IntegerField()
    quantity = models.IntegerField()
    discount_rate = models.FloatField()
    total_price = models.IntegerField()
    created_at = models.DateField()

    class Meta:
        db_table = "sales"

    def __str__(self):
        return f"Sale #{self.id}"


class Products(models.Model):

    product_name = models.CharField(max_length=100)
    color = models.CharField(max_length=30)
    price = models.IntegerField()
    sale_price = models.IntegerField()
    product_category_code = models.CharField(max_length=20)

    class Meta:
        db_table = "products"

    def __str__(self):
        return self.product_name




class Users(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=128)
    age = models.IntegerField()
    email = models.EmailField()
    city = models.CharField(max_length=50)

    class Meta:
        db_table = 'users'
    def __str__(self):
        return self.username



class Employees(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    job = models.CharField(max_length=100)
    pay = models.IntegerField()

    class Meta:
        db_table = "employees"

    def __str__(self):
        return self.name


