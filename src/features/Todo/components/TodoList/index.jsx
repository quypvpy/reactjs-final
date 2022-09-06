import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';
TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func

};
TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
}
function TodoList({ todoList, onTodoClick }) {
    const handleTodoClick = (todo, idx) => {
        // nếu cha truyền props xuống thì mình gọi props cha truyền xg đó..k thì thôi
        if (!onTodoClick) return;

        onTodoClick(todo, idx);
    }
    return (
        <ul className='todo-list'>
            {todoList.map((todo, idx) => (
                <li key={todo.id} className={classnames({
                    'todo-item': true,
                    completed: todo.status === 'completed'
                })} onClick={() => handleTodoClick(todo, idx)}>{todo.title}</li>
            ))}
        </ul>
        // li mỗi khi nó dc click nó sẽ gọi hàm và sẽ truyền lên vị trí cho hàm đó.
    );
}

export default TodoList;