from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import FormDataSerializer


@api_view(["POST"])
def form_submission_view(request):
    if request.method == "POST":
        serializer = FormDataSerializer(data=request.data)
        if serializer.is_valid():
            # Return a success response
            return Response({"message": "Form data submitted successfully."}, status=201)
        # Return a failure response with validation errors
        return Response(serializer.errors, status=400)
