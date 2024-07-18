from rest_framework import generics
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import MyTokenObtainPairSerializer, UserSerializer, NoteSerializer
from .models import Note
from rest_framework.permissions import IsAuthenticated

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegistrationAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NoteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

