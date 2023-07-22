"""intsureview_be URL Configuration"""

from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from intsureview_be.apps.api import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/form-submission/", views.form_submission_view, name="form-submission"),
]

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns += [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
