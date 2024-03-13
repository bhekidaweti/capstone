from . import views
from  django.urls import path
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('', views.quiz, name='quiz'),
    path('get_next_questions/', views.get_next_questions, name='get_next_questions'),
    path('howto/', views.howto, name='howto'),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)