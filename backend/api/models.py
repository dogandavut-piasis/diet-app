from django.db import models


class HeroSlide(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id')
    title = models.CharField(max_length=200, db_column='Title')
    description = models.TextField(blank=True, default='', db_column='Description')
    image_url = models.CharField(max_length=500, blank=True, default='', db_column='ImageUrl')
    button_text = models.CharField(max_length=100, blank=True, default='', db_column='ButtonText')
    button_link = models.CharField(max_length=500, blank=True, default='', db_column='ButtonLink')
    order = models.IntegerField(default=0, db_column='Order')
    is_active = models.BooleanField(default=True, db_column='IsActive')
    created_at = models.DateTimeField(auto_now_add=True, db_column='CreatedAt')
    updated_at = models.DateTimeField(auto_now=True, db_column='UpdatedAt')

    class Meta:
        db_table = 'HeroSlides'
        managed = False
        ordering = ['order']

    def __str__(self):
        return self.title


class BlogPost(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id')
    title = models.CharField(max_length=300, db_column='Title')
    content = models.TextField(blank=True, default='', db_column='Content')
    excerpt = models.CharField(max_length=500, blank=True, default='', db_column='Excerpt')
    image_url = models.CharField(max_length=500, blank=True, default='', db_column='ImageUrl')
    author = models.CharField(max_length=200, blank=True, default='', db_column='Author')
    published_date = models.DateTimeField(auto_now_add=True, db_column='PublishedDate')
    is_published = models.BooleanField(default=True, db_column='IsPublished')
    view_count = models.IntegerField(default=0, db_column='ViewCount')
    created_at = models.DateTimeField(auto_now_add=True, db_column='CreatedAt')
    updated_at = models.DateTimeField(auto_now=True, db_column='UpdatedAt')

    class Meta:
        db_table = 'BlogPosts'
        managed = False
        ordering = ['-published_date']

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id')
    title = models.CharField(max_length=200, db_column='Title')
    description = models.TextField(blank=True, default='', db_column='Description')
    image_url = models.CharField(max_length=500, blank=True, default='', db_column='ImageUrl')
    order = models.IntegerField(default=0, db_column='Order')
    is_active = models.BooleanField(default=True, db_column='IsActive')
    created_at = models.DateTimeField(auto_now_add=True, db_column='CreatedAt')
    updated_at = models.DateTimeField(auto_now=True, db_column='UpdatedAt')

    class Meta:
        db_table = 'GalleryImages'
        managed = False
        ordering = ['order']

    def __str__(self):
        return self.title


class Recipe(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id')
    title = models.CharField(max_length=300, db_column='Title')
    description = models.TextField(blank=True, default='', db_column='Description')
    excerpt = models.CharField(max_length=500, blank=True, default='', db_column='Excerpt')
    image_url = models.CharField(max_length=500, blank=True, default='', db_column='ImageUrl')
    ingredients = models.TextField(blank=True, default='', db_column='Ingredients')
    instructions = models.TextField(blank=True, default='', db_column='Instructions')
    prep_time = models.IntegerField(null=True, blank=True, db_column='PrepTime')
    cook_time = models.IntegerField(null=True, blank=True, db_column='CookTime')
    servings = models.IntegerField(null=True, blank=True, db_column='Servings')
    difficulty = models.CharField(max_length=50, blank=True, default='', db_column='Difficulty')
    order = models.IntegerField(default=0, db_column='Order')
    is_active = models.BooleanField(default=True, db_column='IsActive')
    created_at = models.DateTimeField(auto_now_add=True, db_column='CreatedAt')
    updated_at = models.DateTimeField(auto_now=True, db_column='UpdatedAt')

    class Meta:
        db_table = 'Recipes'
        managed = False
        ordering = ['order']

    def __str__(self):
        return self.title


class NutritionProgram(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id')
    title = models.CharField(max_length=300, db_column='Title')
    description = models.TextField(blank=True, default='', db_column='Description')
    image_url = models.CharField(max_length=500, blank=True, default='', db_column='ImageUrl')
    order = models.IntegerField(default=0, db_column='Order')
    is_active = models.BooleanField(default=True, db_column='IsActive')
    created_at = models.DateTimeField(auto_now_add=True, db_column='CreatedAt')
    updated_at = models.DateTimeField(auto_now=True, db_column='UpdatedAt')

    class Meta:
        db_table = 'NutritionPrograms'
        managed = False
        ordering = ['order']

    def __str__(self):
        return self.title


class AppointmentRequest(models.Model):
    STATUS_CHOICES = [
        ('Beklemede', 'Beklemede'),
        ('Onaylandı', 'Onaylandı'),
        ('İptal', 'İptal'),
        ('Tamamlandı', 'Tamamlandı'),
    ]

    id = models.AutoField(primary_key=True, db_column='Id')
    full_name = models.CharField(max_length=200, db_column='FullName')
    phone = models.CharField(max_length=50, db_column='Phone')
    email = models.CharField(max_length=200, db_column='Email')
    appointment_preference = models.CharField(max_length=200, blank=True, default='', db_column='AppointmentPreference')
    goal = models.CharField(max_length=500, blank=True, default='', db_column='Goal')
    message = models.TextField(blank=True, default='', db_column='Message')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Beklemede', db_column='Status')
    created_at = models.DateTimeField(auto_now_add=True, db_column='CreatedAt')
    updated_at = models.DateTimeField(auto_now=True, db_column='UpdatedAt')

    class Meta:
        db_table = 'AppointmentRequests'
        managed = False
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.status}"
