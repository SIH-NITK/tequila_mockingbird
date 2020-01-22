from PIL import Image
import os
import numpy as np
from matplotlib import pyplot as plt

original_path = 'colored'
overlay_path = 'processed2'

def main():
    image_files = os.listdir(original_path)
    for image_file in image_files:
        background = Image.open(os.path.join(original_path, image_file)).convert('RGB')
        background = np.array(background)

        overlay = Image.open(os.path.join(overlay_path, image_file)[:-3] + 'tif')
        overlay = np.array(overlay)
        print(background[:,:,1].shape, overlay.shape)
        background[:,:,1] = np.maximum(background[:,:,1], overlay)
        # new_image = Image.blend(o, background, 0.5)
        new_image = Image.fromarray(background).convert('RGB')
        print(new_image)
        new_image.save(os.path.join('overlayed', image_file)[:-3] + 'jpg')

main()