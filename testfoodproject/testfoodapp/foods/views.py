from rest_framework import viewsets, generics, permissions, parsers, status
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import FoodCategory, Food, FoodDetail, Tag, Comment, Like, Rating, User, Store, OrderDetail
from .paginators import FoodPaginator
from .perms import CommentOwner
from .serializers import (FoodCategorySerializer, FoodSerializer, FoodDetailsSerializer,
                          AuthorizedFoodDetailsSerializer, CommentSerializer, UserSerializer,
                          StoreSerializer, OrderDetailSerializer)


class FoodCategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer


class FoodViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Food.objects.filter(active=True)
    serializer_class = FoodSerializer
    pagination_class = FoodPaginator

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(subject__icontains=kw)

        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            q = q.filter(category_id=cate_id)

        return q

    @action(methods=['get'], detail=True, url_path='food_details')
    def food_details(self, request, pk):
        menu = self.get_object()
        food_details = menu.food_set.filter(active=True)

        kw = request.query_params.get('kw')
        if kw:
            food_details = food_details.filter(subject__icontains=kw)

        return Response(FoodDetailsSerializer(food_details, many=True).data)


class FoodDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = FoodDetail.objects.filter(active=True)
    serializer_class = FoodDetailsSerializer

    def get_permissions(self):
        if self.action in ['assign_tags', 'comments', 'like', 'rating']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return AuthorizedFoodDetailsSerializer

        return self.serializer_class

    @action(methods=['post'], detail=True, url_path='tags')
    def assign_tags(self, request, pk):
        food = self.get_object()
        tags = request.data['tags']
        for t in tags:
            tag, _ = Tag.objects.get_or_create(name=t)
            food.tags.add(tag)
        food.save()

        return Response(FoodDetailsSerializer(food, context={'request': request}).data)

    @action(methods=['post'], detail=True, url_path='comments')
    def comments(self, request, pk):
        c = Comment(content=request.data['content'], food=self.get_object(), user=request.user)
        c.save()

        return Response(CommentSerializer(c).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True, url_path='like')
    def like(self, request, pk):
        l, created = Like.objects.get_or_create(food=self.get_object(), user=request.user)
        if not created:
            l.liked = not l.liked
        l.save()

        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rating')
    def rating(self, request, pk):
        r, _ = Rating.objects.get_or_create(food=self.get_object(), user=request.user)
        r.rate = request.data['rate']
        r.save()

        return Response(status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'put'], detail=False, url_path='current-user')
    def current_user(self, request):
        u = request.user
        if request.method.__eq__('PUT'):
            for k, v in request.data.items():
                setattr(u, k, v)
            u.save()

        return Response(UserSerializer(u, context={'request': request}).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CommentSerializer
    permission_classes = [CommentOwner, ]


class StoreViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class OrderDetailViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
