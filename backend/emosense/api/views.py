from rest_framework.response import Response    
from rest_framework.decorators import api_view
from emotion.models import Users,Images
from .serializers import UserSerializer,ImagesSerializer
from rest_framework import status
from django.contrib.auth.hashers import check_password
import jwt,datetime
from django.http import JsonResponse
import base64
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt


# Load pre-trained InceptionResnetV1 model


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = Users.objects.get(email=email) if Users.objects.filter(email=email).exists() else None    
    
    if user:
        if check_password(password, user.password):
                
            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=48),
                'iat': datetime.datetime.utcnow()
            }
                                
            token = jwt.encode(payload, key='secret', algorithm="HS256")
            response = Response()
            response.data = {
                'jwt':token,
                'status':'success',
                'id':user.id,
                }
            return response
        else:
            return Response({'status': 'error', 'message': 'Wrong Password'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view(['POST'])
def signup(request):
    email = request.data.get('email')       
    try:
        user_email = Users.objects.get(email=email) 
    except:
        user_email= None
   
    if user_email is None:

        serializer = UserSerializer(data=request.data)
        print(serializer)
        print(request.data)
        if serializer.is_valid():    
            serializer.save()
            print(serializer.is_valid())
            return Response({'status': 'success', 'message': 'Data added successfully','email':email}, status=status.HTTP_201_CREATED)
        return Response({'status': 'error', 'message': 'Failed to add data'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        if user_email is not None:
            return Response({'status': 'error', 'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'status': 'error', 'message': 'Failed to add data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
def photo_upload(request):
    if request.method == 'POST':
        image_data = request.data.get('image_data')

        if image_data is None:
            return JsonResponse({'error': 'Image data not found in the request.'}, status=400)

        format, imgstr = image_data.split(';base64,')
        ext = format.split('/')[-1]

        image_data_decoded = base64.b64decode(imgstr)
        image_file = ContentFile(image_data_decoded, name='temp.' + ext)
        image = Images(image_data=image_file)
        image.save()

        return JsonResponse({'message': 'Image saved successfully.'})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=400)


@api_view(['GET'])
def profile(request, pk):
    user = Users.objects.get(id=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)