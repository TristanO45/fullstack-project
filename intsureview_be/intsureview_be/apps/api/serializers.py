from rest_framework import serializers


class FormDataSerializer(serializers.Serializer):
    name = serializers.CharField()
    type = serializers.CharField()
    age = serializers.IntegerField()
    email = serializers.EmailField()
