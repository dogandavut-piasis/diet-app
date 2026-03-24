from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from . import authentication

router = DefaultRouter(trailing_slash=False)
router.register(r'HeroSlide', views.HeroSlideViewSet, basename='heroslide')
router.register(r'BlogPost', views.BlogPostViewSet, basename='blogpost')
router.register(r'GalleryImage', views.GalleryImageViewSet, basename='galleryimage')
router.register(r'Recipe', views.RecipeViewSet, basename='recipe')
router.register(r'NutritionProgram', views.NutritionProgramViewSet, basename='nutritionprogram')
router.register(r'AppointmentRequest', views.AppointmentRequestViewSet, basename='appointmentrequest')

urlpatterns = [
    path('Auth/login', authentication.login_view, name='login'),
    path('Auth/logout', authentication.logout_view, name='logout'),
    path('Auth/me', authentication.me_view, name='me'),
    path('FileUpload/upload-image', views.upload_image, name='upload-image'),
    path('', include(router.urls)),
]
