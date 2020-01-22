import os
from matplotlib import pyplot as plt
import numpy as np
from PIL import Image

source = 'data'
destination = 'processed'
threshold = 140

def main():
    image_files = os.listdir(source)
    for image_file in image_files:
        img = np.asarray(Image.open(os.path.join(source, image_file)))
        img = img > threshold
        img = img.astype(int)
        img = 255 * img
        img = Image.fromarray(np.uint8(img))
        img.save(os.path.join(destination, image_file))

if __name__ == '__main__':
    main()