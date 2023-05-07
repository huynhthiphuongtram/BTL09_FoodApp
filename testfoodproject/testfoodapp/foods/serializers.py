from rest_framework import serializers
from .models import FoodCategory, Food, Tag, User, Comment, OrderDetail, FoodDetail, Store


class FoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = ['id', 'name']


class MenuSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, menu):
        if menu.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % menu.image.name) if request else ''

    class Meta:
        model = Food
        fields = ['id', 'name', 'image', 'price', 'description', 'created_date', 'category_id']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class FoodSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, food):
        if food.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % food.image.name) if request else ''

    class Meta:
        model = FoodDetail
        fields = ['id', 'name', 'created_date', 'updated_date', 'image']


class FoodDetailsSerializer(FoodSerializer):
    food = FoodSerializer()
    tags = TagSerializer(many=True)

    class Meta:
        model = FoodSerializer.Meta.model
        fields = FoodSerializer.Meta.fields + ['content', 'tags', 'food']


class AuthorizedFoodDetailsSerializer(FoodDetailsSerializer):
    liked = serializers.SerializerMethodField()
    rate = serializers.SerializerMethodField()

    def get_liked(self, food):
        request = self.context.get('request')
        if request:
            return food.like_set.filter(user=request.user, liked=True).exists()

    def get_rate(self, food):
        request = self.context.get('request')
        if request:
            r = food.rating_set.filter(user=request.user).first()
            return r.rate if r else 0

    class Meta:
        model = FoodSerializer.Meta.model
        fields = FoodSerializer.Meta.fields + ['liked', 'rate']


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='avatar')

    def get_image(self, user):
        if user.avatar:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % user.avatar.name) if request else ''

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()
        return u

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email', 'avatar', 'image']
        extra_kwargs = {
            'avatar': {'write_only': True},
            'password': {'write_only': True}
        }


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ["id", "content", "created_date", "user"]


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ["id", "name", "location", "phone"]


class OrderDetailSerializer(serializers.ModelSerializer):
    food = FoodSerializer()
    user = UserSerializer()

    class Meta:
        model = OrderDetail
        fields = ['id', 'food', 'user', 'created_date', 'ship_price', 'total_sum']
