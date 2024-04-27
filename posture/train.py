from ultralytics import YOLO

model = YOLO('yolov8n-pose.pt')

model.train(data='pose.yaml',epochs=100,images=640)