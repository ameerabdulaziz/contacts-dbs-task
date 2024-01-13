import threading

_thread_locals = threading.local()


def get_current_user():
    return getattr(_thread_locals, 'user', None)


class CurrentUserMiddleware:
    """
    Middleware to store the current user in thread-local storage.

    This middleware sets the 'user' attribute in thread-local storage to the current user
    extracted from the request. It allows easy access to the current user throughout the
    request-response cycle.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Save the requested user to the local thread user variable
        _thread_locals.user = request.user
        return self.get_response(request)
