import os
from os import listdir
from os.path import isfile, join

# path = 'E:/madan/models/'
path = 'models'
folders = [f for f in listdir(path) if join(path, f)]
path += folders[-1] + '/'
files = [f for f in listdir(path) if join(path, f)]
files.pop()
for file in files:
    if os.path.isfile(path +file):
        os.remove(path+file)