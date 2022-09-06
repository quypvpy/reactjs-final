import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import NotFound from '../../components/NotFound';
TodoFeature.propTypes = {

};

function TodoFeature(props) {
    const match = useRouteMatch();//để lấy cái route cha truyền xuống ,,để cha thay đổi.. con tự đổi
    // nested routing
    return (
        <div >
            <Switch>
                {/* nghĩa là route  app cha truyền xuống này..nhưng trong này có 2 trang để ta lựa chọn */}
                <Route path={match.path} component={ListPage} exact />
                <Route path={`${match.path}/:todoId`} component={DetailPage} exact />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default TodoFeature;