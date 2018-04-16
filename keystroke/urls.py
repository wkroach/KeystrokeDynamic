from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('authenticate/', include('authenticate.urls')),
    path('admin/', admin.site.urls),
]