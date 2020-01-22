import os
from matplotlib import pyplot as plt
import numpy as np
from PIL import Image
from scipy import ndimage

source = 'processed'
destination = 'processed2'

shape = np.array([2135, 2118])
tile = np.array([10, 10])

def main():
    threshold = int(input('enter threshold'))
    image_files = os.listdir(source)
    image_files.sort()
    conv = np.ones((10, 10))
    for image_file in image_files:
        img = Image.open(os.path.join(source, image_file))
        img = (np.asarray(img) == 255).astype(int)
        img = ndimage.convolve(img, conv)
        # img = np.zeros((int(shape[0]/tile[0]), int(shape[1]/tile[1])), dtype=np.int)
        img = img > threshold
        img = img.astype(int)
        # for r in range(0, int(shape[0]/tile[0])):
        #     for c in range(0, int(shape[1]/tile[1])):
        #         s = int(np.sum(img[r*tile[0]:(r+1)*tile[0], c * tile[1]:(c+1) * tile[1]]).item())
        #         img[r, c] = 1 if s > threshold else 0

        img = ndimage.binary_closing(img, iterations=2)
        img = img * 255
        img = ndimage.gaussian_filter(img, sigma=(5, 5))
        img = img > 150
        img = img.astype(int) * 255
        img = Image.fromarray(np.uint8(img))
        img.save(os.path.join(destination, image_file))

if __name__ == '__main__':
    main()