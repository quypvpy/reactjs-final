import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import TodoList from "../../components/TodoList";
import queryString from "query-string";
import TodoForm from "../../components/TodoForm";

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "Code",
      status: "new",
    },
  ];
  // có stages là todoLisst và muốn cập nhật lại là setTodoList
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredStatus, setfilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    // console.log(params);
    // vì ta trueyenf status và k có ta lấy all
    return params.status || "all";
  });
  // thay vì khởi tạo là all ta lấy từ URL params.
  // nhớ import pageske querystring và cài npm i --save query-string
  // khi trên URL thay đổi thì ta cần phải cập nhật stages để hiển thị đúng.

  useEffect(() => {
    const params = queryString.parse(location.search);
    setfilteredStatus(params.status || "all");
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    console.log(todo, idx);
    // kghi làm việc với object và array, muốn thay đổi nó phải clone trước.
    const newTodoList = [...todoList];
    // toggle stage
    // const newTodo   = {
    // muốn cập nhật vị trí idx đó, với những giá trị hiện tại của nó, đồng thời thay status
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };
    // newTodoList[idx] = newTodo;

    // update todo list
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    // setfilteredStatus('all');
    const queryParams = { status: "all" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowCompletedClick = () => {
    // setfilteredStatus('completed');
    const queryParams = { status: "completed" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowNewClick = () => {
    // setfilteredStatus('new');
    const queryParams = { status: "new" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  //
  // todo ở dưới là mỗi item trong todoList
  // showw tất cả  todo khi mà status bằng all..hoặc vế kía..
  const renderTodoList = todoList.filter(
    (todo) => filteredStatus === "all" || filteredStatus === todo.status
  );
  // console.log(renderTodoList);

  const handleFormSubmit = (values) => {
    console.log("Form submit", values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: "new",
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };
  return (
    <div>
      <h3>Todo FOrm</h3>
      <TodoForm onSubmit={handleFormSubmit}></TodoForm>
      <h3>TodoList</h3>
      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
      {/* hoặc để ở đây todoList để k filter có 2 stages là filter vs todoList 
            đến bài này là stages rồi coi chứ nhầm vs props*/}
      {/* nó sẽ cho cái hàm onTodoClick truyền xuống TodoList..
             khi click sẽ báo lên hàm handleTodoClick 
             sau lhi truyền ngược lên cho onTodoClick nó sẽ gọi handletodolist */}
      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>
      </div>
    </div>
  );
}

export default ListPage;
