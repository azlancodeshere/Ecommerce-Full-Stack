from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes 
from shop_app.models import  Product, CartItem, Cart
from .serializers import ProductSerializer, DetailProductSerializer, CartItemSerializer,SimpleCartSerializer, CartSerializer, UserSerializer, OrderSerializer,RegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db import transaction
from .models import Order, OrderItem
from django.conf import settings


# Create your views here.

BASE_URL= settings.REACT_BASE_URL




@api_view(['GET'])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer =DetailProductSerializer(product)
    return Response(serializer.data)

 
from django.db import transaction, IntegrityError

@api_view(['POST'])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")

        if not cart_code or not product_id:
            return Response({"error": "cart_code and product_id required"}, status=400)

        with transaction.atomic():
            
            cart = Cart.objects.select_for_update().filter(
                cart_code=cart_code, paid=False
            ).first()

            
            if not cart:
                try:
                    cart = Cart.objects.create(cart_code=cart_code, paid=False)
                except IntegrityError:
                    # Someone already created it (or stale code exists) → fetch it
                    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()

          
            if not cart:
                return Response(
                    {"error": "Cart already checked out. Create a new cart."},
                    status=400
                )

            product = Product.objects.get(id=product_id)

            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product
            )

            if not created:
                cart_item.quantity += 1
                cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response({
            "data": serializer.data,
            "message": "CartItem created successfully"
        }, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.query_params.get('cart_code')

    if not cart_code:
        return Response({"num_of_items": 0})

    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()
    if not cart:
        return Response({"num_of_items": 0})

    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get('cart_code')

  
    if not cart_code:
        return Response({"error": "cart_code is required"}, status=400)

   
    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()

   
    if not cart:
        return Response({"items": [], "total": 0})

    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['PATCH'])
def update_quantity(request):
    try:
        cartitem_id = request.data.get("item_id")
        quantity = request.data.get("quantity")

        quantity = int(quantity)

        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()

        serializer = CartItemSerializer(cartitem)

        return Response({
            "data": serializer.data,
            "message": "Cartitem updated successfully"
        })

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=400)
    

@api_view(['POST'])
def delete_cartitem(request):
    try:
        cartitem_id = request.data.get("item_id")

        if not cartitem_id:
            return Response({"error": "item_id required"}, status=400)

        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.delete()

        return Response({"message": "Item deleted successfully"}, status=200)

    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({'username': user.username})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data = request.data
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method', 'COD')
        cart_code = data.get('cart_code')

      
        if not phone or not phone.isdigit() or len(phone) < 10:
            return Response({'error': 'Invalid phone number'}, status=400)

      
        cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()

        if not cart:
            return Response({'error': 'Cart not found'}, status=400)

       
        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        
        total = sum(item.product.price * item.quantity for item in cart_items)

        with transaction.atomic():

            order = Order.objects.create(
                user=request.user,
                total_amount=total,
                name=name,
                address=address,
                phone=phone,
                payment_method=payment_method
            )

            for item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price
                )

           
            cart.paid = True
            cart.save()

        return Response({
            'message': 'Order created successfully',
            'order_id': order.id
        })

    except Exception as e:
        print("ERROR:", str(e))   # 🔥 IMPORTANT
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def product_in_cart(request, cart_code, product_id):

    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()

    if not cart:
        return Response({'product_in_cart': False})

    exists = CartItem.objects.filter(
        cart=cart,
        product_id=product_id
    ).exists()

    return Response({'product_in_cart': exists})




@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created"}, status=201)

    return Response(serializer.errors, status=400)