import os
import cv2
from matplotlib import pyplot as plt
import numpy as np
import imutils
import easyocr

def rsolve(imgf):
    # img = cv2.imread('SS.jpg')
    img = cv2.imread(imgf)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # plt.imshow(cv2.cvtColor(gray, cv2.COLOR_BGR2RGB))

    bfilter = cv2.bilateralFilter(gray, 11, 17, 17) #Noise reduction
    edged = cv2.Canny(bfilter, 30, 200) #Edge detection
    # plt.imshow(cv2.cvtColor(edged, cv2.COLOR_BGR2RGB))

    keypoints = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(keypoints)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

    location = None
    for contour in contours:
        approx = cv2.approxPolyDP(contour, 10, True)
        if len(approx) == 4:
            location = approx
            break
    try:
      mask = np.zeros(gray.shape, np.uint8)
      new_image = cv2.drawContours(mask, [location], 0,255, -1)
      new_image = cv2.bitwise_and(img, img, mask=mask)

      (x,y) = np.where(mask==255)
      (x1, y1) = (np.min(x), np.min(y))
      (x2, y2) = (np.max(x), np.max(y))
      cropped_image = gray[x1:x2+1, y1:y2+1]

      reader = easyocr.Reader(['en'])
      result = reader.readtext(cropped_image)
      # if result[0][1]:
      #     ans = result[0][1]
      #     return ans
      return result

    except:
      return []

    # return len(result)

def nss(ip):
    files = os.listdir('/content/drive/MyDrive/Colab Notebooks/sihhag/frames') # depends on variable ip
    answer=set()
 
    # c = 0
    # for i in files:
    #     imgf = '/content/drive/MyDrive/Colab Notebooks/sihhag/frames/' + i
    #     a = rsolve(imgf)
    #     if len(a)!= 0:
    #         answer.add(a[0][1])
            # print(answer)
    # imgf = '/content/drive/MyDrive/Colab Notebooks/sihhag/7.jpg'
    imgf = '/content/drive/MyDrive/Colab Notebooks/sihhag/' + ip + '.jpg'
    a = rsolve(imgf)
    if len(a)!= 0:
        answer.add(a[0][1])
        # print(answer)
    return answer
# ip = '7'
# ans = nss(ip)
# print(ans)
