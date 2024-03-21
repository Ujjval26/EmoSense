from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from keras.models import load_model
from keras.preprocessing.image import img_to_array
import numpy as np
import cv2

# Load the pre-trained model and cascade classifier
classifier = load_model('/Users/sarjan/Documents/GitHub/emosense/backend/emosense/api/model.h5')
face_classifier = cv2.CascadeClassifier('/Users/sarjan/Documents/GitHub/emosense/backend/emosense/api/haarcascade_frontalface_default.xml')
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

@csrf_exempt
def predict_emotion(request):
    if request.method == 'POST' and request.FILES.get('image'):
        # Get the uploaded image
        image_file = request.FILES['image']
        nparr = np.fromstring(image_file.read(), np.uint8)
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
                roi = img_to_array(roi)
                roi = np.expand_dims(roi, axis=0)

                # Predict emotion for the face
                prediction = classifier.predict(roi)[0]
                label = emotion_labels[prediction.argmax()]
                emotions.append(label)

            return JsonResponse({'emotions': emotions})
        else:
            return JsonResponse({'error': 'No faces detected in the image.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method or no image uploaded.'}, status=400)
