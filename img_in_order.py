import os
from matplotlib import pyplot as plt
import numpy as np
from PIL import Image

image_files = os.listdir('data/')
image_files.sort()
for image_file in image_files:
    print(image_file)
    img = Image.open(os.path.join('data', image_file))
    img = np.asarray(img)
    plt.imshow((img -128)/128, cmap='BrBG')
    plt.show()