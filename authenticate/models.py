from django.db import models


class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)


class Keystroke(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    keystroke = models.CharField(max_length=200)
    time_vector = models.CharField(max_length=200)
