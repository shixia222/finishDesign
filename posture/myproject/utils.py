import math
import numpy as np
import torch
import matplotlib
matplotlib.use('TkAgg')

import matplotlib.pyplot as plt
def is_touqianying_80(point1, point2, point3, point4):
    """
    判断给定的四个点中，由点1到点2的向量与点3到点4的向量之间的夹角是否小于80度。

    :param point1: 点1的坐标，格式为(x, y)
    :param point2: 点2的坐标，格式为(x, y)
    :param point3: 点3的坐标，格式为(x, y)
    :param point4: 点4的坐标，格式为(x, y)
    :return: 如果夹角小于80度，返回True（头前引），否则返回False。
    """
    # 计算向量v1 (从点1到点2) 和 v2 (从点3到点4)
    v1 = (point2[0] - point1[0], point2[1] - point1[1])
    v2 = (point4[0] - point3[0], point4[1] - point3[1])

    # 计算两个向量的点积
    dot_product = v1[0] * v2[0] + v1[1] * v2[1]

    # 计算两个向量的模
    norm_v1 = math.sqrt(v1[0] ** 2 + v1[1] ** 2)
    norm_v2 = math.sqrt(v2[0] ** 2 + v2[1] ** 2)

    # 计算cos(theta)
    cos_theta = dot_product / (norm_v1 * norm_v2)

    # cos(80度)
    cos_85 = math.cos(math.radians(80))
    result = cos_theta > cos_85
    result_value = result.item()

    # 将数值转换为布尔值
    boolean_result = bool(result_value)

    # 如果cos(theta) > cos(80度)，则theta < 80度
    return boolean_result


def is_gaodijian(point1, point2, point3, point4):
    """
    判断给定的四个点中，由点1到点2的向量与点3到点4的向量之间的夹角是否大于10度。

    :param point1: 点1的坐标，格式为(x, y)
    :param point2: 点2的坐标，格式为(x, y)
    :param point3: 点3的坐标，格式为(x, y)
    :param point4: 点4的坐标，格式为(x, y)
    :return: 如果夹角大于10度，返回True（高低肩），否则返回False。
    """
    # 计算向量v1 (从点1到点2) 和 v2 (从点3到点4)
    v1 = (point2[0] - point1[0], point2[1] - point1[1])
    v2 = (point4[0] - point3[0], point4[1] - point3[1])

    # 计算两个向量的点积
    dot_product = v1[0] * v2[0] + v1[1] * v2[1]

    # 计算两个向量的模
    norm_v1 = math.sqrt(v1[0] ** 2 + v1[1] ** 2)
    norm_v2 = math.sqrt(v2[0] ** 2 + v2[1] ** 2)

    # 计算cos(theta)，theta为两向量间的夹角
    cos_theta = dot_product / (norm_v1 * norm_v2)

    # cos(10度)
    cos_10 = math.cos(math.radians(10))
    result = abs(cos_theta) < cos_10
    result_value = result.item()

    # 将数值转换为布尔值
    boolean_result = bool(result_value)

    # 如果cos(theta)的绝对值小于cos(10度)，则theta > 10度
    return boolean_result



def is_yuanjian_tuobei(point1, point2, point3):
    """
    判断给定的三个点构成的三角形中最大的角是否小于160度。

    :param point1: 点1的坐标，格式为(x, y)
    :param point2: 点2的坐标，格式为(x, y)
    :param point3: 点3的坐标，格式为(x, y)
    :return: 如果最大角小于160度，返回True（圆肩驼背），否则返回False。
    """
    # 计算三边长度
    a = math.sqrt((point3[0] - point2[0]) ** 2 + (point3[1] - point2[1]) ** 2)
    b = math.sqrt((point3[0] - point1[0]) ** 2 + (point3[1] - point1[1]) ** 2)
    c = math.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2)

    # 使用余弦定理计算三个角的余弦值
    cos_alpha = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c)
    cos_beta = (a ** 2 + c ** 2 - b ** 2) / (2 * a * c)
    cos_gamma = (a ** 2 + b ** 2 - c ** 2) / (2 * a * b)

    # 计算角度
    alpha = math.degrees(math.acos(cos_alpha))
    beta = math.degrees(math.acos(cos_beta))
    gamma = math.degrees(math.acos(cos_gamma))

    # 找到最大的角
    max_angle = max(alpha, beta, gamma)
    result = max_angle < 160


    # 判断最大角是否小于160度
    return result



def calculate_angle(A, B, C):
    BA = A - B
    BC = C - B
    cos_angle = torch.dot(BA, BC) / (torch.norm(BA) * torch.norm(BC))
    angle_rad = torch.acos(cos_angle)
    angle_deg = angle_rad * 180 / np.pi
    return angle_deg.item()

def leg_type_classification(A, B, C):
    """判断三角形ABC的腿型：O型腿或X型腿。"""
    angles = {
        "A": calculate_angle(B, A, C),
        "B": calculate_angle(A, B, C),
        "C": calculate_angle(A, C, B)
    }
    # Find the vertex with the maximum angle
    vertex, max_angle = max(angles.items(), key=lambda x: x[1])

    # Determine the leg type based on the orientation and angle size
    if max_angle < 175:
        if A[0] > B[0]:
            leg_type = 0  # Internal and angle < 160
        else:
            leg_type = 1  # External and angle < 160
    else:
        leg_type = 2

    return leg_type

def knee_Boolean(A, B, C):
    """判断三角形ABC的腿型：膝关节超伸。"""
    angles = {
        "A": calculate_angle(B, A, C),
        "B": calculate_angle(A, B, C),
        "C": calculate_angle(A, C, B)
    }
    # Find the vertex with the maximum angle
    vertex, max_angle = max(angles.items(), key=lambda x: x[1])
    # Determine the leg type based on the orientation and angle size
    if max_angle < 175:
        knee_type = 0

    else:
        knee_type = 1

    return knee_type

