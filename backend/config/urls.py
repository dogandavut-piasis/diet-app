from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # Uploaded pictures
    re_path(r'^pictures/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
]
