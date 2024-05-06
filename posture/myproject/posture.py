from flask import Flask, request, jsonify
from ultralytics import YOLO
from utils import *
from PIL import Image, ImageDraw, ImageFont
import io
from postureUtils import process_images

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 设置最大请求大小为16MB
# 加载模型
model = YOLO('best.pt')  # 预训练的 YOLOv8n 模型


@app.route('/predict', methods=['POST'])
def predict():
    # 获取请求的 JSON 数据
    request_data = request.get_json()
    front_image_bytes = request_data['front_image']
    side_image_bytes = request_data['side_image']

    # 将二进制数据流转换为图片
    front_image = Image.open(io.BytesIO(front_image_bytes.encode('latin1')))
    side_image = Image.open(io.BytesIO(side_image_bytes.encode('latin1')))

    # # 保存上传的文件
    front_image_path = 'front_image.jpg'
    side_image_path = 'side_image.jpg'
    front_image.save(front_image_path)
    side_image.save(side_image_path)
    results = process_images()
    return results

if __name__ == '__main__':
    app.run(debug=True)