import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);

  function handleChange(value) {
    setInputValue(value);
  }

  function handleAddTodo() {
    if (inputValue.trim().length === 0) {
      console.log('nth');
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: prevTodos.length + Math.random() * 100,
          title: inputValue.trim(),
          isDone: false,
        },
      ];
    });

    setInputValue('');
  }

  function handleKeyDown() {
    handleAddTodo();
  }

  function handleToggleDone(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      });
    });
  }

  function handleChangeMode({ id, isEdit }) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        } else {
          return todo;
        }
      });
    });
  }

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onAddTodo={handleAddTodo}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
      />
      <Footer />
    </div>
  );
};

export default TodoPage;
