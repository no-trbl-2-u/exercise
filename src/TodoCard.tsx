interface TodoCardProps {
  title: string;
}

function TodoCard(props: TodoCardProps) {
  return (
    <div className="todo-card">
      <input type="checkbox" id="test" name="test" />
      {props.title}
    </div>
  )
}

export default TodoCard;