import os
from matplotlib import pyplot as plt
import numpy as np
from PIL import Image

image_files = os.listdir('data/')
image_files.sort()
images = []
for image_file in image_files:
    img = Image.open(os.path.join('data', image_file))
    