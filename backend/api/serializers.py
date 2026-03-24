from rest_framework import serializers
from .models import HeroSlide, BlogPost, GalleryImage, Recipe, NutritionProgram, AppointmentRequest


class HeroSlideSerializer(serializers.ModelSerializer):
    imageUrl = serializers.CharField(source='image_url', allow_blank=True, default='')
    buttonText = serializers.CharField(source='button_text', allow_blank=True, default='')
    buttonLink = serializers.CharField(source='button_link', allow_blank=True, default='')
    isActive = serializers.BooleanField(source='is_active', default=True)

    class Meta:
        model = HeroSlide
        fields = ['id', 'title', 'description', 'imageUrl', 'buttonText', 'buttonLink', 'order', 'isActive']


class BlogPostSerializer(serializers.ModelSerializer):
    imageUrl = serializers.CharField(source='image_url', allow_blank=True, default='')
    publishedDate = serializers.DateTimeField(source='published_date', required=False)
    isPublished = serializers.BooleanField(source='is_published', default=True)
    viewCount = serializers.IntegerField(source='view_count', default=0, required=False)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'author', 'excerpt', 'content', 'imageUrl', 'publishedDate', 'isPublished', 'viewCount']


class GalleryImageSerializer(serializers.ModelSerializer):
    imageUrl = serializers.CharField(source='image_url', allow_blank=True, default='')
    isActive = serializers.BooleanField(source='is_active', default=True)

    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'description', 'imageUrl', 'order', 'isActive']


class RecipeSerializer(serializers.ModelSerializer):
    imageUrl = serializers.CharField(source='image_url', allow_blank=True, default='')
    prepTime = serializers.IntegerField(source='prep_time', allow_null=True, required=False)
    cookTime = serializers.IntegerField(source='cook_time', allow_null=True, required=False)
    isActive = serializers.BooleanField(source='is_active', default=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'excerpt', 'description', 'ingredients', 'instructions',
                  'imageUrl', 'prepTime', 'cookTime', 'servings', 'difficulty', 'order', 'isActive']


class NutritionProgramSerializer(serializers.ModelSerializer):
    imageUrl = serializers.CharField(source='image_url', allow_blank=True, default='')
    isActive = serializers.BooleanField(source='is_active', default=True)

    class Meta:
        model = NutritionProgram
        fields = ['id', 'title', 'description', 'imageUrl', 'order', 'isActive']


class AppointmentRequestSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='full_name')
    appointmentPreference = serializers.CharField(source='appointment_preference', allow_blank=True, default='')
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = AppointmentRequest
        fields = ['id', 'fullName', 'phone', 'email', 'appointmentPreference', 'goal',
                  'message', 'status', 'createdAt', 'updatedAt']
