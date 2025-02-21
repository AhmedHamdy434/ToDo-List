import { useEffect, useRef, useState } from "react";
import "./Article.css";

function Article() {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(1);
  const inputRef = useRef();
  // load tasks from localStorage            [1] Use Effect
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
      let latestId = storedTasks.slice(-1)[0].id;
      setId(latestId + 1);
    } else {
      setTasks([]);
      setId(1);
    }
  }, []);
  // change tasks on localStorage
  useEffect(() => {
    // Prevent saving empty arrays initially
    if (tasks.length > 0) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Adding task click function                   [2]  Functions
  const handleClick = () => {
    if (inputRef.current.value) {
      setTasks([
        ...tasks,
        { name: inputRef.current.value, id: id, completed: false },
      ]);
      setId(id + 1);
      inputRef.current.value = "";
    }
  };

  // done Task function
  const handleTaskDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // remove task function
  const removeTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // clear all data function
  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };
  //                                                   [3] main return
  return (
    <article>
      <div className="container">
        <div className="all-card">
          <h3>Tasks</h3>
          {/* Adding  */}
          <div className="input-task">
            <input
              ref={inputRef}
              type="text"
              name="task"
              placeholder="Add New Task"
            />
            <button onClick={handleClick}>Add</button>
          </div>
          {/* New Tasks  */}
          <ul className="new-tasks">
            {tasks.map(({ name, id, completed }) => {
              return (
                <li key={id}>
                  <div
                    className={completed ? "done task" : "task"}
                    onClick={() => handleTaskDone(id)}
                  >
                    {name} <span></span>
                  </div>
                  <button onClick={() => removeTask(id)}>remove</button>
                </li>
              );
            })}
          </ul>
          {
            /* remove all Tasks from page and localStorage */
            <button className="clear" onClick={clearTasks}>
              Remove All
            </button>
          }
        </div>
      </div>
    </article>
  );
}

export default Article;
