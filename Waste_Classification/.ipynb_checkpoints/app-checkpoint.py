from flask import Flask, request, jsonify
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)

model = load_model('model.h5')

def classify_image(image):
    image = cv2.resize(image, (224, 224))
    image = image / 255.0
    image = np.expand_dims(image, axis=0)


    prediction = model.predict(image)


    label = np.argmax(prediction)
    
    if label == 0:
        return 'Recyclable'
    elif label == 1:
        return 'Compostable'
    else:
        return 'Hazardous'


@app.route('/classify', methods=['POST'])
def classify():
    
    image = request.files['image']


    image = cv2.imdecode(np.frombuffer(image.read(), np.uint8), cv2.IMREAD_COLOR)


    label = classify_image(image)


    return jsonify({'label': label})

if __name__ == '__main__':
    app.run(debug=True)
