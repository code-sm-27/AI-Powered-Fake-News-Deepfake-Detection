from tensorflow.keras.applications import Xception
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
import numpy as np

# Constants
FRAME_SIZE = (128, 128)  # Image dimensions
MODEL_PATH = "xception_pretrained_model.keras"  # Model save path

# Load pre-trained Xception model
print("Loading pre-trained Xception model...")
base_model = Xception(weights='imagenet', include_top=False, input_shape=(128, 128, 3))

# Freeze base model layers
for layer in base_model.layers:
    layer.trainable = False

# Add custom layers on top
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(64, activation='relu')(x)
predictions = Dense(2, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.summary()

# Save the model
print("Saving the pre-trained model...")
model.save(MODEL_PATH)

# Function for prediction
from tensorflow.keras.preprocessing import image

def predict_image(image_path, model):
    img = image.load_img(image_path, target_size=FRAME_SIZE)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize
    prediction = model.predict(img_array)
    label = "FAKE" if np.argmax(prediction) == 1 else "REAL"
    confidence = prediction[0][np.argmax(prediction)]
    print(f"Prediction: {label} (Confidence: {confidence:.2f})")

# Test the pre-trained model on a single image
sample_image_path = r"C:\Users\Shivamani\deepfake_detection\0.jpg"  # Replace with an actual image path
print("Testing pre-trained model...")
predict_image(sample_image_path, model)
