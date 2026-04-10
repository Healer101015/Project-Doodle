import { useState } from "react";

type Task = {

  id: number;
  text: string;
  done: boolean;
};






function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [input, setInput] = useState("");

  function addTask() {

    if (input.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      text: input,
      done: false,
    };


    setTasks([...tasks, newTask]);
    setInput("");

  }

  function toggleTask(id: number) {

    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));

  }


  function removeTask(id: number) {

    setTasks(tasks.filter(task => task.id !== id));
  }


  return (

    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

      <h1 className="text-2xl font-bold mb-4 text-center">📝 Minhas Tasks</h1>

      <div className="flex gap-2 mb-4">

        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nova tarefa"
          className="flex-1 p-2 rounded bg-gray-700 outline-none"
        />

        <button
          onClick={addTask}
          className="bg-blue-500 px-4 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>

      </div>





      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-2 flex items-center">

            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />

            <span className={task.done ? "line-through text-gray-500" : ""}>
              {task.text}
            </span>

            <button
              onClick={() => removeTask(task.id)}
              className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;