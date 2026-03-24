import os
import uuid
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from .models import HeroSlide, BlogPost, GalleryImage, Recipe, NutritionProgram, AppointmentRequest
from .serializers import (
    HeroSlideSerializer, BlogPostSerializer, GalleryImageSerializer,
    RecipeSerializer, NutritionProgramSerializer, AppointmentRequestSerializer
)


class ReadOnlyOrAdmin(BasePermission):
    """GET herkes icin acik, POST/PUT/DELETE icin login gerekli"""
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated


class HeroSlideViewSet(viewsets.ModelViewSet):
    serializer_class = HeroSlideSerializer
    permission_classes = [ReadOnlyOrAdmin]

    def get_queryset(self):
        return HeroSlide.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = HeroSlide.objects.filter(is_active=True).order_by('order')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='All')
    def all_slides(self, request):
        queryset = HeroSlide.objects.all().order_by('order')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    permission_classes = [ReadOnlyOrAdmin]

    def get_queryset(self):
        return BlogPost.objects.all()

    @action(detail=False, methods=['get'], url_path='Latest/(?P<count>[0-9]+)')
    def latest(self, request, count=3):
        count = int(count)
        queryset = BlogPost.objects.filter(is_published=True).order_by('-published_date')[:count]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='All')
    def all_posts(self, request):
        queryset = BlogPost.objects.all().order_by('-published_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GalleryImageViewSet(viewsets.ModelViewSet):
    serializer_class = GalleryImageSerializer
    permission_classes = [ReadOnlyOrAdmin]

    def get_queryset(self):
        return GalleryImage.objects.all()

    @action(detail=False, methods=['get'], url_path='Latest/(?P<count>[0-9]+)')
    def latest(self, request, count=3):
        count = int(count)
        queryset = GalleryImage.objects.filter(is_active=True).order_by('-id')[:count]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='All')
    def all_images(self, request):
        queryset = GalleryImage.objects.all().order_by('order')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    permission_classes = [ReadOnlyOrAdmin]

    def get_queryset(self):
        return Recipe.objects.all()

    @action(detail=False, methods=['get'], url_path='Latest/(?P<count>[0-9]+)')
    def latest(self, request, count=3):
        count = int(count)
        queryset = Recipe.objects.filter(is_active=True).order_by('-id')[:count]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='All')
    def all_recipes(self, request):
        queryset = Recipe.objects.all().order_by('order')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class NutritionProgramViewSet(viewsets.ModelViewSet):
    serializer_class = NutritionProgramSerializer
    permission_classes = [ReadOnlyOrAdmin]

    def get_queryset(self):
        return NutritionProgram.objects.all()

    @action(detail=False, methods=['get'], url_path='All')
    def all_programs(self, request):
        queryset = NutritionProgram.objects.all().order_by('order')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class AppointmentRequestViewSet(viewsets.ModelViewSet):
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestSerializer

    def get_permissions(self):
        # POST (randevu gonderme) herkese acik, geri kalan admin
        if self.action == 'create':
            return [AllowAny()]
        return [ReadOnlyOrAdmin()]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    if 'file' not in request.FILES:
        return Response({'message': 'Dosya bulunamadı!'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']

    if file.size > 5 * 1024 * 1024:
        return Response({'message': 'Dosya boyutu 5MB\'dan büyük olamaz!'}, status=status.HTTP_400_BAD_REQUEST)

    allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if file.content_type not in allowed_types:
        return Response({'message': 'Sadece JPG, PNG, GIF ve WEBP dosyaları kabul edilir!'}, status=status.HTTP_400_BAD_REQUEST)

    ext = os.path.splitext(file.name)[1]
    filename = f"{uuid.uuid4()}{ext}"
    filepath = os.path.join(settings.MEDIA_ROOT, filename)

    os.makedirs(settings.MEDIA_ROOT, exist_ok=True)

    with open(filepath, 'wb+') as dest:
        for chunk in file.chunks():
            dest.write(chunk)

    image_url = f"/pictures/{filename}"
    return Response({'imageUrl': image_url})
