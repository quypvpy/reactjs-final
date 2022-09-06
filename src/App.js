// import './App.css';
import { Redirect, Route, Switch } from "react-router";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import AlbumFeature from "./features/Album";
import CounterFeatute from "./features/Counter";
import ProductFeature from "./features/Product";
import TodoFeature from "./features/Todo";
function App() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const params = {
  //       _limit: 10,
  //     };
  //     const productList = await productApi.getAll(params);
  //     console.log(productList);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <div className="App">
      <Header></Header>
      {/* <p>
        <Link to="/todos">Todos</Link>
      </p>
      <p>
        {" "}
        <Link to="/albums">Albums</Link>
      </p> */}

      {/* khi kích vô thì nó tới đương link /todos thì nó có route ở dưới nên nó hiện ra com TodoFeature */}

      {/* <p>
        {" "}
        <NavLink to="/todos">Todos</NavLink>
      </p>
      <p>
        {" "}
        <NavLink to="/albums" activeClassName="active-menu">
          Albums
        </NavLink>
      </p> */}

      {/* khi ta click vô này thì nó tự động gắn thêm class active chỉ cái kich thôi. */}
      {/* mặc định là tên class active có thêt thay đổi */}
      {/* bt là nó ở index chỉ có Home page. nếu gõ thêm /todos thì nso hiển thị thêm component Todo */}
      {/* ở sau /thêm j cũng được và đó cũng là exact mặc định bằng false khi gõ là true */}
      {/* ở trang index.js phải có <BrowserRouter> và phải cài thư viện */}
      <Switch>
        {/* gõ /home này đến trang / (index) có thể đẻ tham số exact */}
        <Redirect from="/home" to="/" />
        <Redirect from="/post-list/:post1" to="/posts/:post1" />
        {/* sau : mình để j cũng đc. nhưng sau phải giống trước..có thể trền chữ và số dc */}

        {/* vì khi "/" là khi trang chủ.. nó math dc 1 cái ..sau đó gõ todos thì nso math thêm cái nauwx
        nên dùng sswich để component đó chỉ chạy đúng 1 lần và gần nó ngắn nhất nên nó lấy "/.*/}
        <Route path="/" component={CounterFeatute} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
