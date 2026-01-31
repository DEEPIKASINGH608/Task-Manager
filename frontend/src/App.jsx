import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  // Update Task Status (PUT)
  const updateTaskStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchTasks(); // Refresh list to show updated status
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const filteredTasks = tasks.filter(task => 
    filterStatus === 'All' ? true : task.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-indigo-600 mb-8 text-center italic tracking-tighter">TASK FLOW</h1>

        {/* ADD TASK FORM */}
        <form onSubmit={addTask} className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 mb-10 flex flex-col gap-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" className="w-full border-b-2 border-slate-100 focus:border-indigo-500 outline-none p-2 text-lg transition-all" />
          <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border-b-2 border-slate-100 focus:border-indigo-500 outline-none p-2 text-md transition-all" />
          <div className="flex gap-4 items-center">
            <select name="status" value={formData.status} onChange={handleChange} className="bg-slate-50 p-2 rounded-lg outline-none border border-slate-200">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md">Add Task</button>
          </div>
        </form>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
            <button key={status} onClick={() => setFilterStatus(status)} className={`px-5 py-1.5 rounded-full border text-sm font-semibold transition-all ${filterStatus === status ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border-slate-200'}`}>{status}</button>
          ))}
        </div>

        {/* TASK LIST */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-indigo-300 transition-all">
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${task.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{task.title}</h3>
                <p className="text-slate-500 text-sm">{task.description}</p>
                <span className={`inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${task.status === 'Completed' ? 'bg-green-100 text-green-600' : task.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>{task.status}</span>
              </div>
              
              <div className="flex gap-2">
                {task.status !== 'Completed' && (
                  <button 
                    onClick={() => updateTaskStatus(task._id, 'Completed')}
                    className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600 hover:text-white transition-all"
                  >
                    Done
                  </button>
                )}
                <button onClick={() => deleteTask(task._id)} className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-bold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;