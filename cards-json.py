#!/usr/bin/env python

import glob
import json

paths = glob.glob('assets/img/*.jpg')
images = []

for p in paths:
    images.append({
        'name': '',
        'path': p})

with open('cards.json', 'w') as f:
    json.dump(images, f, sort_keys=True, indent=2)
