from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from keras.models import load_model
from .serializers import EmotionHistorySerializer
from keras.preprocessing.image import img_to_array
import numpy as np
import cv2
import base64
from django.core.files.base import ContentFile

# Load the pre-trained model and cascade classifier
classifier = load_model('C:/Users/shahp/Desktop/Ujjval/emosense/backend/emosense/api/model.h5')
face_classifier = cv2.CascadeClassifier('C:/Users/shahp/Desktop/Ujjval/emosense/backend/emosense/api/haarcascade_frontalface_default.xml')
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

@api_view(['POST'])
@csrf_exempt
def predict_emotion(request):
    if request.method == 'POST' and request.data.get('image'):
        # Get the base64 encoded image data from the request
        image_data = request.data['image']
        user_id = request.data['user_id']
        # Decode the base64 image data
        format, imgstr = image_data.split(';base64,')
        ext = format.split('/')[-1]
        image_data = ContentFile(base64.b64decode(imgstr), name=f'uploaded_image.{ext}')

        # Process the image data
        # Load the pre-trained model and cascade classifier
        classifier = load_model('C:/Users/shahp/Desktop/Ujjval/emosense/backend/emosense/api/model.h5')
        face_classifier = cv2.CascadeClassifier('C:/Users/shahp/Desktop/Ujjval/emosense/backend/emosense/api/haarcascade_frontalface_default.xml')
        emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

        # Convert image data to OpenCV format
        nparr = np.frombuffer(image_data.read(), np.uint8)
        image_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect faces in the image
        gray = cv2.cvtColor(image_cv, cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray)

        if len(faces) > 0:
            # Process each detected face
            emotions = []
            for (x, y, w, h) in faces:
                roi_gray = gray[y:y+h, x:x+w]
                roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

                roi = roi_gray.astype('float') / 255.0
                roi = np.expand_dims(roi, axis=0)
                roi = np.expand_dims(roi, axis=3)

                # Predict emotion for the face
                prediction = classifier.predict(roi)[0]
                label = emotion_labels[prediction.argmax()]
                emotions.append(label)
                
                data = {
                    'image': request.data['image'],
                    'emotion': label,
                    'userId': user_id
                }
                print(data)
                serializer = EmotionHistorySerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    print(serializer.errors)  
                    return JsonResponse({'error': 'Failed to save emotion data.'}, status=400)

            return JsonResponse({'emotions': emotions})
        else:
            return JsonResponse({'error': 'No faces detected in the image.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method or no image uploaded.'}, status=400)