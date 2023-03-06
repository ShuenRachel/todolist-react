import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';
import { getTodos, createTodo, patchTodo } from '../api/todos';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodosAsync() {
      try {
        const { data } = await getTodos();
        setTodos(data.map((todo) => ({ ...todo, isEdit: false })));
      } catch (e) {
        console.error(e);
      }
    }

    getTodosAsync();
  }, []);

  function handleChange(value) {
    setInputValue(value);
  }

  async function handleAddTodo() {
    if (inputValue.trim().length === 0) {
      return;
    }

    try {
      const { data } = await createTodo({
        title: inputValue.trim(),
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });

      setInputValue('');
    } catch (e) {
      console.error(e);
    }
  }

  function handleKeyDown() {
    handleAddTodo();
  }

  async function handleToggleDone(id) {
    try {
      const currentTodo = todos.find((todo) => todo.id === id);

      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });

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
    } catch (e) {
      console.error(e);
    }
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

  function handleSave({ id, title }) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false,
          };
        } else {
          return todo;
        }
      });
    });
  }

  function handleDelete(id) {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
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
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
