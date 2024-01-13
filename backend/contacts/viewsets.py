from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Contact
from .serializers import ContactSerializer
from core.utils import delete_cache


class ContactViewSet(viewsets.ModelViewSet):
    CACHE_KEY_PREFIX = 'contacts-api'

    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['name', 'email', 'phone']

    @method_decorator(cache_page(600, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        """Cache listing the contacts for 10 minutes"""
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """Delete the `CACHE_KEY_PREFIX` after creating new contact"""
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

    def update(self, request, *args, **kwargs):
        """Delete the `CACHE_KEY_PREFIX` after updating contact"""
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

    def partial_update(self, request, *args, **kwargs):
        """Delete the `CACHE_KEY_PREFIX` after partial updating contact"""
        response = super().partial_update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

    def destroy(self, request, *args, **kwargs):
        """Delete the `CACHE_KEY_PREFIX` after deleting contact"""
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
