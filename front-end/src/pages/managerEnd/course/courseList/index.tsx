import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Button,
  Input,
  Descriptions,
  Layout,
  Typography,
  Modal,
  Form,
  Select,
} from "antd-v5";
import type { InputRef } from "antd-v5";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd-v5/es/table";
import type { FilterConfirmProps } from "antd-v5/es/table/interface";
import type { FormProps } from "antd-v5";

interface DataType {
  _id: string;
  course_name: String;
  content: String;
  img: String;
  video_path: String;
  type: String;
  resolution_type: String;
}
const { Content } = Layout;
const { Paragraph, Text } = Typography;
type DataIndex = keyof DataType;
const CourseList: React.FC = () => {
  type FieldType = {
    _id: string;
    course_name: String;
    content: String;
    img: String;
    video_path: String;
    type: String;
    resolution_type: String;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    addCourse(values);
    setIsModalOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const navigate = useNavigate();
  const changPage = (url: string, id: string) => {
    navigate(url, { state: { id } });
  };
  //设置当前页面
  const [curPage, setCurPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [list, setList] = useState<DataType[]>([]);

  //设置搜索功能
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseType, setCourseType] = useState("");
  const [img, setImg] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getList = (curPage: number, number: number) => {
    fetch("http://localhost:4000/api/course/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curPage: curPage,
        number: number,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setTotal(res.total);
        res.data?.forEach((item: any) => {
          item.key = item._id;
        });
        setList(res.data);
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const deleteCourse = (_: any, record: any) => {
    fetch("http://localhost:4000/api/course/deleteCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: record._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          alert("删除成功！");
          getList(curPage, 8);
        } else {
          alert("删除失败！");
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const addCourse = (course: DataType) => {
    fetch("http://localhost:4000/api/course/addCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course,
        img,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {})
      .catch(() => {
        alert("网络错误！");
      });
  };

  //   const handleSearch = (
  //     selectedKeys: string[],
  //     confirm: (param?: FilterConfirmProps) => void,
  //     dataIndex: DataIndex
  //   ) => {
  //     confirm();
  //     setSearchText(selectedKeys[0]);
  //     setSearchedColumn(dataIndex);
  //   };

  //   const handleReset = (clearFilters: () => void) => {
  //     clearFilters();
  //     setSearchText("");
  //   };

  //   const getColumnSearchProps = (
  //     dataIndex: DataIndex
  //   ): ColumnType<DataType> => ({
  //     filterDropdown: ({
  //       setSelectedKeys,
  //       selectedKeys,
  //       confirm,
  //       clearFilters,
  //     }) => (
  //       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
  //         <Input
  //           ref={searchInput}
  //           placeholder={`search ${dataIndex}`}
  //           value={selectedKeys[0]}
  //           onChange={(e) =>
  //             setSelectedKeys(e.target.value ? [e.target.value] : [])
  //           }
  //           onPressEnter={() =>
  //             handleSearch(selectedKeys as string[], confirm, dataIndex)
  //           }
  //           style={{ marginBottom: 8, display: "block" }}
  //         />
  //         <Space>
  //           <Button
  //             type="primary"
  //             onClick={() =>
  //               handleSearch(selectedKeys as string[], confirm, dataIndex)
  //             }
  //             icon={<SearchOutlined />}
  //             size="small"
  //             style={{ width: 90 }}
  //           >
  //             搜索
  //           </Button>
  //           <Button
  //             onClick={() => clearFilters && handleReset(clearFilters)}
  //             size="small"
  //             style={{ width: 90 }}
  //           >
  //             重置
  //           </Button>
  //         </Space>
  //       </div>
  //     ),
  //     filterIcon: (filtered: boolean) => (
  //       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  //     ),
  //     onFilter: (value, record) =>
  //       record[dataIndex]
  //         .toString()
  //         .toLowerCase()
  //         .includes((value as string).toLowerCase()),
  //     onFilterDropdownOpenChange: (visible) => {
  //       if (visible) {
  //         setTimeout(() => searchInput.current?.select(), 100);
  //       }
  //     },
  //   });

  useEffect(() => {
    getList(curPage, 8);
  }, [curPage]);
  //配置table
  const columns: ColumnsType<DataType> = [
    {
      title: "课程名",
      dataIndex: "course_name",
      key: "course_name",
      render: (_, record) => (
        <Text ellipsis={{ tooltip: record.course_name }} style={{ width: 200 }}>
          {record.course_name}
        </Text>
      ),
      //   ...getColumnSearchProps("title"),
    },
    {
      title: "内容",
      key: "content",
      dataIndex: "content",
      render: (_, record) => (
        <Text ellipsis={{ tooltip: record.content }} style={{ width: 200 }}>
          {record.content}
        </Text>
      ),
    },
    {
      title: "课程视频链接",
      dataIndex: "video_path",
      key: "video_path",
      render: (_, record) => (
        <Button type="link">
          {" "}
          <Text
            ellipsis={{ tooltip: record.video_path }}
            style={{ width: 200 }}
          >
            {record.video_path}
          </Text>
        </Button>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => deleteCourse(_, record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  //分页功能
  const handlePageChange = (page: number) => {
    setCurPage(page);
  };

  const paginationProps = {
    current: curPage, //当前页码
    pageSize: 10,
    total: 3,
    onChange: (page: number) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };

  const courseTypeChange = (value: string) => {
    setCourseType(value);
  };

  const chooseMedia = () => {
    // 创建文件输入元素并触发点击
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    // 处理文件选择
    fileInput.onchange = function (event) {
      //@ts-ignore
      var file = event?.target?.files[0];
      if (file) {
        // 读取所选文件的二进制数据
        var reader = new FileReader();
        reader.onload = function (event) {
          var binaryData = event?.target?.result;
          //@ts-ignore
          setImg(binaryData);
        };
        reader.onerror = function (event) {
          //@ts-ignore
          console.error("读取文件失败:", event.target.error);
        };
        reader.readAsBinaryString(file);
      } else {
        console.error("未选择文件");
      }
    };
  };
  return (
    <Layout>
      <Content style={{ background: "white", padding: 20 }}>
        <Button
          type="primary"
          onClick={showModal}
          style={{ marginBottom: 10 + "px" }}
        >
          新增课程
        </Button>
        <Table
          columns={columns}
          dataSource={list}
          pagination={paginationProps}
        />
      </Content>
      <Modal
        footer={null}
        title="新增课程"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="课程名"
            name="course_name"
            rules={[{ required: true, message: "请输入课程名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="课程内容"
            name="content"
            rules={[{ required: true, message: "请输入课程内容" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="课程图片" name="img">
            <Button onClick={chooseMedia} type="primary">
              上传
            </Button>
          </Form.Item>
          <Form.Item<FieldType>
            label="课程视频链接"
            name="video_path"
            rules={[{ required: true, message: "请输入课程视频链接" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="课程类型"
            name="type"
            rules={[{ required: true, message: "请选择课程类型" }]}
          >
            <Select
              style={{ width: 200 }}
              onChange={courseTypeChange}
              options={[
                { value: "commom", label: "普通训练课程" },
                { value: "resolution", label: "体态缺陷训练课程" },
              ]}
            />
          </Form.Item>
          {courseType == "resolution" && (
            <Form.Item<FieldType>
              label="体态缺陷类型"
              name="resolution_type"
              rules={[{ required: true, message: "请选择体态缺陷类型" }]}
            >
              <Select
                style={{ width: 200 }}
                options={[
                  { value: "NECKHYPERFLEXION", label: "颈超屈伸" },
                  { value: "UNEVENSHOULDERS", label: "高低肩" },
                  {
                    value: "ROUNDEDSHOULDERSANDHUNCHEDBACK",
                    label: "圆肩驼背",
                  },
                  { value: "ANTERIORTHIGHPROTRUSION", label: "大腿前侧突出" },
                  { value: "X/OLEGS", label: "X/O 型腿" },
                  { value: "HYPEREXTENDEDKNEE", label: "膝关节超伸" },
                  { value: "OUTWARDLYROTATEDCALF", label: "小腿外翻" },
                ]}
              />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default CourseList;
