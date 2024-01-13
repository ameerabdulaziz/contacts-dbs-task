from rest_framework import serializers

from contacts.models import Contact


class ContactSerializer(serializers.ModelSerializer):
    updated_at = serializers.SerializerMethodField(method_name='get_updated_at')
    updated_by = serializers.SerializerMethodField(method_name='get_updated_by', read_only=True)

    class Meta:
        model = Contact
        fields = ['name', 'email', 'phone', 'updated_at', 'updated_by']

    def get_updated_at(self, instance):
        """ Custom method to format 'updated_at' as a nice datetime format"""
        return instance.updated_at.strftime("%Y-%m-%d %H:%M") if instance.updated_at else None

    def get_updated_by(self, instance):
        """Custom method to get the username for 'updated_by'"""
        return instance.updated_by.username if instance.updated_by else None
