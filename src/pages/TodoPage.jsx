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

  function handleInput(value) {
    setInputValue(value);
  }

  function handleTodo(value) {
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

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleInput}
        onAddTodo={handleTodo}
      />
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
