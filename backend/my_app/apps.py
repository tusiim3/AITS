from django.apps import AppConfig


class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'my_app' # This is the name of your app, change it to your app's name
