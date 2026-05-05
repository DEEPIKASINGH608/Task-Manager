import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const res = await axios.post(API, { title, description: desc });
    setTasks([res.data, ...tasks]); // Creative: Immediate update
    setTitle(''); setDesc('');
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter(t => t._id !== id)); 
    await axios.delete(`${API}/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-black text-indigo-600 mb-8">TASK FLOW</h1>

      <form onSubmit={addTask} className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-col gap-4">
        <input className="border-b-2 focus:border-indigo-500 outline-none p-2 text-lg"
               placeholder="What needs to be done?" value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="border-b-2 focus:border-indigo-500 outline-none p-2 text-sm"
               placeholder="Details (optional)" value={desc} onChange={e => setDesc(e.target.value)} />
        <button className="bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">Add Task</button>
      </form>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task._id} className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center animate-fade-in">
            <div>
              <h3 className="font-bold text-slate-800">{task.title}</h3>
              <p className="text-slate-500 text-sm">{task.description}</p>
            </div>
            <button onClick={() => deleteTask(task._id)} className="text-red-400 hover:bg-red-50 p-2 rounded-full transition">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}