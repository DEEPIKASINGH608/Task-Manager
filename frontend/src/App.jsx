import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });

  // Fetch all tasks from MongoDB
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create Task (POST)
  const addTask = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Title is required");
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: '', description: '', status: 'Pending' });
      fetchTasks();
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  // Delete Task (DELETE)
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-indigo-600 mb-8 text-center italic">TASK FLOW</h1>

        {/* ADD TASK FORM */}
        <form onSubmit={addTask} className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 mb-10 flex flex-col gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="w-full border-b-2 border-slate-100 focus:border-indigo-500 outline-none p-2 text-lg transition-all"
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Details (optional)"
            className="w-full border-b-2 border-slate-100 focus:border-indigo-500 outline-none p-2 text-md transition-all"
          />
          <div className="flex gap-4 items-center">
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              className="bg-slate-50 p-2 rounded-lg outline-none border border-slate-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95">
              Add Task
            </button>
          </div>
        </form>

        {/* TASK LIST PAGE */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-500 mb-4 px-2 uppercase tracking-widest">Your Tasks</h2>
          {tasks.length === 0 && <p className="text-center text-slate-400 py-10">No tasks yet. Start by adding one above!</p>}
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-indigo-300 transition-all">
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-slate-500 text-sm">{task.description}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                  task.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {task.status}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task._id)}
                className="opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;