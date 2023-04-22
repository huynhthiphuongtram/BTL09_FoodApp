from django.contrib.auth.models import AbstractUser
from django.db import models
from ckeditor.fields import RichTextField


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    avatar = models.ImageField(upload_to='users/%Y/%m', null=True)


class FoodCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Store(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    location = models.CharField(max_length=255)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Food(BaseModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="foods/%Y/%m", null=True)
    price = models.IntegerField()
    description = RichTextField()
    category = models.ForeignKey(FoodCategory, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class FoodDetail(BaseModel):
    name = models.CharField(max_length=255)
    content = RichTextField()
    image = models.ImageField(upload_to="foods/%Y/%m", null=True)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag', related_name='details')

    def __str__(self):
        return self.name


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Comment(BaseModel):
    content = models.CharField(max_length=255)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class OrderDetail(BaseModel):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ship_price = models.FloatField(blank=False)
    total_sum = models.FloatField(blank=False)


class ActionBase(BaseModel):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True
        unique_together = ('food', 'user')


class Rating(ActionBase):
    rate = models.SmallIntegerField(default=0)


class Like(ActionBase):
    liked = models.BooleanField(default=True)
