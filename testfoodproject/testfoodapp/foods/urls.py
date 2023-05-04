from django.urls import path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('food_categories', views.FoodCategoryViewSet, basename='food_category')
r.register('foods', views.MenuViewSet, basename='food')
r.register('food_details', views.FoodDetailViewSet, basename='food_detail')
r.register('users', views.UserViewSet, basename='user')
r.register('comments', views.CommentViewSet, basename='comment')
r.register('stores', views.StoreViewSet, basename='store')
r.register('order_details', views.OrderDetailViewSet, basename='order_detail')


urlpatterns = [
    path('', include(r.urls)),
]
