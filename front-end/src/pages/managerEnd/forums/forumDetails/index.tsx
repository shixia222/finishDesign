import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Descriptions, Layout, Space, Table, Button } from "antd-v5";
import type { ColumnsType } from "antd-v5/es/table";

const { Content } = Layout;

interface DataType {
  key: string;
  content: string;
  username: string;
  time: string;
  user_id: string;
}

const ForumDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const { id } = params.state;
  const [oneAsk, setOneAsk] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);

  const changPage = (url: string, id: string) => {
    navigate(url, { state: { id } });
  };
  const getDetails = (_id: string) => {
    fetch("http://localhost:4000/api/post/getDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setOneAsk(res[0]);
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const getList = (curPage: number, number: number) => {
    fetch("http://localhost:4000/api/reply/getListById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        curPage: curPage,
        number: number,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setTotal(res.total);
          res.data?.forEach((item: any) => {
            item.key = item._id;
          });
          
          setList(res.data);
        } else {
          setList([]);
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const deleteReply = (_: any, record: any) => {
    console.log(record);
    fetch("http://localhost:4000/api/reply/deleteReply", {
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
          getList(curPage, 6);
        } else {
          alert("删除失败！");
        }
      })
      .catch(() => {
        alert("网络错误！");
      });
  };

  const handlePageChange = (page: number) => {
    setCurPage(page);
    getList(page, 6);
  };

  useEffect(() => {
    getDetails(id);
    getList(curPage, 6);
  }, []);

  const paginationProps = {
    current: curPage, //当前页码
    pageSize: 6,
    total: total,
    onChange: (page: number) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      render: (_, record) => <Space size="middle">{record?.content}</Space>,
    },
    {
      title: "用户",
      dataIndex: "user_id",
      key: "user_id",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() =>
              changPage(
                `/manager/userDetails/${record?.user_id}`,
                record?.user_id
              )
            }
          >
            {record?.user_id}
          </Button>
        </Space>
      ),
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => deleteReply(_, record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Layout>
      <Content style={{ background: "white", padding: 20, marginBottom: 20 }}>
        <Descriptions title="帖子信息">
          <Descriptions.Item label="标题">{oneAsk?.title}</Descriptions.Item>
          <Descriptions.Item label="发帖人">
            {oneAsk?.username}
          </Descriptions.Item>
          <Descriptions.Item label="发布时间">{oneAsk?.time}</Descriptions.Item>
          <Descriptions.Item label="帖子类型">
            {oneAsk?.type == "motion" ? "训练" : "饮食"}
          </Descriptions.Item>
        </Descriptions>
      </Content>
      <Content style={{ background: "white", padding: 20 }}>
        <h3 style={{ marginLeft: 5 }}>评论</h3>
        <Table
          columns={columns}
          dataSource={list}
          pagination={paginationProps}
        />
      </Content>
    </Layout>
  );
};

export default ForumDetails;
