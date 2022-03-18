import cv2
import mediapipe
import os
path = 'frames'
isExist = os.path.exists(path)
if not isExist:
  os.makedirs(path)
  print("The new directory is created!")
drawingModule = mediapipe.solutions.drawing_utils
handsModule = mediapipe.solutions.hands
capture = cv2.VideoCapture('video.MOV')
frameNr = 0
with handsModule.Hands() as hands:
    while (True):
        success, frame = capture.read()
        if not success:
            break
        results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        if results.multi_hand_landmarks != None:
            for handLandmarks in results.multi_hand_landmarks:
                drawingModule.draw_landmarks(frame, handLandmarks, handsModule.HAND_CONNECTIONS)
        if frameNr%5==0:        
            cv2.imwrite(f'frames/{frameNr//5}.jpg', frame)
        frameNr = frameNr+1
capture.release()
