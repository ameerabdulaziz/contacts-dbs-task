from django.contrib.auth.models import AnonymousUser
from django.db.models.signals import pre_save
from django.dispatch import receiver

from core.middleware import get_current_user
from contacts.models import Contact


@receiver(pre_save, sender=Contact)
def set_created_updated_by(sender, instance, **kwargs):
    # Get the current user who saving the contact
    user = get_current_user()

    if not user:
        return

    # Check if the user is authenticated (not an AnonymousUser)
    if not isinstance(user, AnonymousUser):
        if instance.id is None:
            instance.created_by = user
        else:
            instance.updated_by = user
