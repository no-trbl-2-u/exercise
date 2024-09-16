
interface TodoContainerProps {
  children?: React.ReactNode; 
}

function TodoContainer(props: TodoContainerProps) {
  return (
    <div className="todo-container">
      {props.children}
    </div>
  )
}

export default TodoContainer;