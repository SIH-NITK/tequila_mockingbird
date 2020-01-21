from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import numpy as np
from PIL import Image
from scipy.ndimage.filters import gaussian_filter1d
from json import dumps
from scipy.signal import chirp, find_peaks, peak_widths, find_peaks_cwt, peak_prominences

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

image_path = './data'
image_files = sorted(os.listdir(image_path))
images = []
for image_file in image_files:
    images.append(np.asarray(Image.open(os.path.join(image_path, image_file))))

def agriculture_period(y_gauss):
    peaks, _ = find_peaks(y_gauss)
    peak_prominences(y_gauss, peaks) # -> (prominences, left_bases, right_bases)
    sowTime = peak_prominences(y_gauss, peaks)[1]
    harvestTime = peak_prominences(y_gauss, peaks)[2]
    sowHarvest = []
    for i in range(len(sowTime)):
        p, _ = find_peaks(y_gauss[sowTime[i]: harvestTime[i]])
        for interval in p:
            if y_gauss[interval + sowTime[i]] > 120:
                l = int(0.125 * (harvestTime[i] - sowTime[i]) + sowTime[i])
                r = int(0.875 * (harvestTime[i] - sowTime[i]) + sowTime[i])
                sowHarvest.append([l, r])
                # print('peaks', [sowTime[i], harvestTime[i]], y_gauss[interval + sowTime[i]], interval + sowTime[i])
                break

    return sowHarvest
    

@app.route('/', methods=['GET'])
@cross_origin()
def hello_world():
    r = int(request.args.get('r'))
    c = int(request.args.get('c'))
    print(r, c)

    response = {}

    data = []
    for image in images:
        data.append(image[r, c])
    
    response['graph_data'] = gaussian_filter1d(data, sigma=2)
    res = agriculture_period(response['graph_data'])
    print(res)

    response['graph_data'] = response['graph_data'].tolist()
    response['crop_interval'] = []
    
    for r in res:
        response['crop_interval'].append({
            'img_idx': r,
            'interval_in_months': (r[1] - r[0])/2
        })

    return dumps(response)


if __name__ == '__main__':
   app.run(host='0.0.0.0')
