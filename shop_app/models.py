from django.db import models
from django.utils.text import slugify
from django.conf import settings



class Product(models.Model):
    CATEGORY = (
        ("Electronics", "ELECTRONICS"),
        ("Groceries", "GROCERIES"),
        ("Clothings", "CLOTHINGS"),
    )

    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True, null=True)
    image = models.ImageField(upload_to="img")
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(
        max_length=15,
        choices=CATEGORY,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name

    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
            unique_slug = self.slug
            counter = 1

            while Product.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{self.slug}-{counter}"
                counter += 1

            self.slug = unique_slug

        super().save(*args, **kwargs)


class Cart(models.Model):
    cart_code = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True,  null=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.cart_code
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ['cart', 'product']

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart {self.cart.id}"
    


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=15)

    payment_method = models.CharField(max_length=20, default="COD")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.user.username}"
    


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"