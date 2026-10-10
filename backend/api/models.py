"""
Django Models for the API.
"""

from django.db import models


class ContactSubmission(models.Model):
    """Model for storing contact form submissions."""

    name = models.CharField(max_length=200)
    email = models.EmailField()
    company = models.CharField(max_length=200, blank=True)
    interest = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"{self.name} - {self.email}"


class DemoRequest(models.Model):
    """Model for storing demo requests."""

    name = models.CharField(max_length=200)
    email = models.EmailField()
    company = models.CharField(max_length=200, blank=True)
    role = models.CharField(max_length=100, blank=True)
    use_case = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"{self.name} - {self.company or 'N/A'}"