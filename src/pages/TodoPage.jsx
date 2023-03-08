import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const TodoPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth();

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    async function getTodosAsync() {
      try {
        const res = await getTodos();
        setTodos(res?.data?.data.map((todo) => ({ ...todo, isEdit: false })));
      } catch (e) {
        console.error(e);
      }
    }

    getTodosAsync();
  }, [navigate, isAuthenticated]);

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

  async function handleSave({ id, title }) {
    try {
      await patchTodo({
        id,
        title,
      });

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
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
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
