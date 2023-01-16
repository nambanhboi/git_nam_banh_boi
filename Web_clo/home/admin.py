from django.contrib import admin
from .models import product, buyer, seller
# Register your models here.
admin.site.register(product)
admin.site.register(buyer)
admin.site.register(seller)