import os
from matplotlib import pyplot as plt
import numpy as np
from PIL import Image
from scipy import ndimage

source = 'processed'
destination = 'processed3'

shape = np.array([2135, 2118])
tile = np.array([10, 10])

def main():
    threshold = int(input('enter threshold'))
    image_files = os.listdir(source)
    for image_file in image_files:
        img = Image.open(os.path.join(source, image_file))
        img = (np.asarray(img) == 255).astype(int)
        final = ndimage.gaussian_filter(img, sigma=(0.5,0.5))
        img = ndimage.binary_closing(img, iterations=2)
        # final = final * 255
        final = Image.fromarray(np.uint8(final))
        final.save(os.path.join(destination, image_file))

if __name__ == '__main__':
    main()