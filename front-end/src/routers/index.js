import { Navigate } from "react-router-dom";


//管理员端
import ManagerHome from "../pages/managerEnd";
import ManagerIndex from "../pages/managerEnd/managerIndex";
import UserList from "../pages/managerEnd/users/userList";
import UserDetails from "../pages/managerEnd/users/userDetails";
import ForumList from "../pages/managerEnd/forums/forumList";
import ForumDetails from "../pages/managerEnd/forums/forumDetails";
import CourseList from "../pages/managerEnd/course/courseList";

export default [
  {
    path: "/manager",
    element: <ManagerHome></ManagerHome>,
    children: [
      { path: "", element: <ManagerIndex></ManagerIndex> },
      { path: "home", element: <ManagerIndex></ManagerIndex> },
      { path: "userList", element: <UserList></UserList> },
      { path: "userDetails/:id", element: <UserDetails></UserDetails> },
      { path: "forumList", element: <ForumList></ForumList> },
      { path: "forumDetails/:id", element: <ForumDetails></ForumDetails> },
      { path: "courseList", element: <CourseList></CourseList> },
    ],
  },
  {
    path: "",
    element: <Navigate to="/manager"></Navigate>,
  },
];
