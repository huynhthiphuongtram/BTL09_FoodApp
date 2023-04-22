from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import Food, FoodDetail, FoodCategory, Tag, User, Store, Comment, Rating, OrderDetail


class FoodForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Food
        fields = '__all__'


class FoodDetailForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = FoodDetail
        fields = '__all__'


class FoodAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'created_date', 'category']
    search_fields = ['name']
    list_filter = ['id', 'name', 'created_date']
    form = FoodForm


class LessonTagInlineAdmin(admin.StackedInline):
    model = FoodDetail.tags.through


class FoodDetailAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'created_date']
    search_fields = ['name']
    form = FoodDetailForm
    inlines = [LessonTagInlineAdmin, ]


admin.site.register(FoodCategory)
admin.site.register(Food, FoodAdmin)
admin.site.register(FoodDetail, FoodDetailAdmin)
admin.site.register(User)
admin.site.register(Store)
admin.site.register(Comment)
admin.site.register(Rating)
admin.site.register(OrderDetail)
admin.site.register(Tag)
