import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Descriptions, Layout, Space, Table, Button } from "antd-v5";
import type { ColumnsType } from "antd-v5/es/table";

const { Content } = Layout;

interface DataType {
  key: string;
  title: string;
  time: string;
}

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const { id } = params.state;
  const [list, setList] = useState<any>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [userData, setUserData] = useState<any>({});
  const [total, setTotal] = useState<number>(1);
  const changPage = (url: string, id: string) => {
    navigate(url, { state: { id } });
  };

  const getDetail = (id: any) => {
    fetch("http://localhost:4000/api/users/getDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openid: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUserData(res[0]);
      });
  };

  const getList = (curPage: number, number: number) => {
    fetch("http://localhost:4000/api/post/getListByid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
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
      });
  };

  const deleteAsk = (_: any, record: any) => {
    fetch("http://localhost:4000/api/post/deletePost", {
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
      });
  };

  const handlePageChange = (page: number) => {
    setCurPage(page);
  };

  useEffect(() => {
    getDetail(id);
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
      title: "贴子标题",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() =>
              changPage(`/manager/forumDetails/${record.key}`, record.key)
            }
          >
            {record?.title}
          </Button>
        </Space>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() =>
              changPage(`/manager/forumDetails/${record.key}`, record.key)
            }
          >
            详情
          </Button>
          <Button type="link" danger onClick={() => deleteAsk(_, record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Layout>
      <Content style={{ background: "white", padding: 20, marginBottom: 20 }}>
        <Descriptions title="用户信息">
          <Descriptions.Item label="用户名">
            {userData?.username}
          </Descriptions.Item>
          <Descriptions.Item label="性别">
            {userData?.gender == "男" ? "男" : "女"}
          </Descriptions.Item>
          <Descriptions.Item label="城市">{userData?.city}</Descriptions.Item>
          <Descriptions.Item label="出生日期">
            {userData?.age}
          </Descriptions.Item>
          <Descriptions.Item label="手机号">
            {userData?.mobile}
          </Descriptions.Item>
          <Descriptions.Item label="电子邮箱">
            {userData?.email}
          </Descriptions.Item>
          <Descriptions.Item label="体重">
            {userData?.weight}
          </Descriptions.Item>
          <Descriptions.Item label="身高">
            {userData?.height}
          </Descriptions.Item>
          <Descriptions.Item label="简介">
            {userData?.introduce}
          </Descriptions.Item>
          <Descriptions.Item label="发帖数">{total}</Descriptions.Item>
        </Descriptions>
      </Content>
      <Content style={{ background: "white", padding: 20 }}>
        <h3 style={{ marginLeft: 5 }}>发帖</h3>
        <Table
          columns={columns}
          dataSource={list}
          pagination={paginationProps}
        />
      </Content>
    </Layout>
  );
};

export default UserDetails;
