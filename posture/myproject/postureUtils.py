from ultralytics import YOLO
from PIL import Image, ImageDraw, ImageFont
from utils import *

def process_images():
    # 加载模型
    model = YOLO('best.pt')  # 预训练的 YOLOv8n 模型

    # 在图片列表上运行批量推理.你要预测
    results_front = model(['front_image.jpg'], save=True)  # 返回 Results 对象列表，正面图片
    results_side = model(['side_image.jpg'], save=True)  # 返回 Results 对象列表，反面图片

    # 处理结果列表
    for result in results_front:
        boxes_front = result.boxes  # 边界框输出的 Boxes 对象
        keypoints_front = result.keypoints  # 姿态输出的 Keypoints 对象
    # 处理结果列表
    for result in results_side:
        boxes_side = result.boxes  # 边界框输出的 Boxes 对象
        keypoints_side = result.keypoints  # 姿态输出的 Keypoints 对象

    xyxy = boxes_front.data
    xmin = xyxy[0, 0]
    ymin = xyxy[0, 1]
    xmax = xyxy[0, 2]
    ymax = xyxy[0, 3]
    # 左下角坐标
    bottom_left = (xmin, ymax)
    # 右下角坐标
    bottom_right = (xmax, ymax)

    data_front = keypoints_front.data
    data_side  = keypoints_side.data
    right_ankle_front = data_front[0, 0, :]
    right_knee_front = data_front[0, 1, :]
    right_buttock_front = data_front[0, 2, :]

    right_ankle_side = data_side[0, 0, :]
    right_knee_side = data_side[0, 1, :]
    right_buttock_side = data_side[0, 2, :]

    chest_side = data_side[0, 7, :]
    upper_neck_side = data_side[0, 8, :]
    top_of_head_side = data_side[0, 9, :]

    #高低肩
    right_shoulder_front = data_front[0, 12, :]
    left_shoulder_front = data_front[0, 13, :]

    # 分类和检测
    leg_type = False
    calf_Boolean = False
    knee_type = 'unknown'
    if leg_type_classification(right_ankle_front, right_knee_front, right_buttock_front)==0:
        leg_type = True
    elif leg_type_classification(right_ankle_front, right_knee_front, right_buttock_front)==1:
        leg_type = True
        calf_Boolean=True
    elif leg_type_classification(right_ankle_front, right_knee_front, right_buttock_front) == 2:
        leg_type = False
    if knee_Boolean(right_ankle_side, right_knee_side, right_buttock_side) == 0:
        knee_type = True
    elif knee_Boolean(right_ankle_side, right_knee_side, right_buttock_side) == 1:
        knee_type = False

    results = {
        'neck': is_touqianying_80(top_of_head_side, upper_neck_side, bottom_left, bottom_right),
        'uneven_shoulders': is_gaodijian(right_shoulder_front, left_shoulder_front, bottom_left, bottom_right),
        'rounded_shoulders': is_yuanjian_tuobei(top_of_head_side, upper_neck_side, chest_side),
        'legs': leg_type,
        'knee': knee_type,
        'calf': calf_Boolean,
        'thigh_protrusion': knee_type
    }

    type = any(value for value in results.values())
    new_results = {'type': type, **results}

    img_text = Image.new('RGB', (400, 600), color='white')  # 适应更大内容的尺寸
    d = ImageDraw.Draw(img_text)
    # 设置字体和大小
    font = ImageFont.load_default()  # 使用默认字体，可以替换为更大的字体文件
    line_height = 80  # 行高

    # 将结果添加到图片上
    for i, (key, value) in enumerate(results.items()):
        text = f'{key}: {value}'
        d.text((10, 10 + i * line_height), text, fill=(0, 0, 0), font=font)
    # 加载其他两张图片
    img1 = Image.open('front_image.jpg')
    img2 = Image.open('side_image.jpg')

    # 将所有图片调整到同一大小
    img1 = img1.resize((400, 600))
    img2 = img2.resize((400, 600))
    # 创建新的空白图片以容纳三张图片
    combined_img = Image.new('RGB', (1200, 600), 'white')
    combined_img.paste(img1, (0, 0))  # 第一张图片贴在左边
    combined_img.paste(img2, (400, 0))  # 第二张图片贴在中间
    combined_img.paste(img_text, (800, 0))  # 文本图片贴在最右侧
    # 保存或显示图片
    combined_img.save('result.png')
    return new_results