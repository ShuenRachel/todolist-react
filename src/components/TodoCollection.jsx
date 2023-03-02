import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onToggleDone,
  onSave,
  onDelete,
  onChangeMode,
}) => {
  return (
    <div>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
      {/* TodoCollection
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem /> */}
    </div>
  );
};

export default TodoCollection;
