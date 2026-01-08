'use client'

export const runtime = 'edge';

import { useState } from 'react';
import { Plus, GripVertical, CheckCircle2, FlaskConical, Lightbulb, Trash2, LucideIcon } from 'lucide-react';

interface Task {
  id: string;
  fontName: string;
  project: string;
  status: 'idea' | 'testing' | 'decided';
}

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', fontName: 'Pretendard', project: 'Fintech App Redesign', status: 'decided' },
    { id: '2', fontName: 'Gmarket Sans', project: 'Marketing Banner', status: 'testing' },
    { id: '3', fontName: 'Nanum Myeongjo', project: 'Brand Story E-book', status: 'idea' },
  ]);

  const [newTaskName, setNewTaskName] = useState('');

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('taskId', id);
  };

  const onDrop = (e: React.DragEvent, status: Task['status']) => {
    const id = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
    setTasks(updatedTasks);
  };

  const addTask = (status: Task['status']) => {
    if (!newTaskName.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      fontName: newTaskName,
      project: 'New Project',
      status
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const columns: { id: Task['status']; title: string; icon: LucideIcon; color: string }[] = [
    { id: 'idea', title: 'Font Ideas', icon: Lightbulb, color: 'text-amber-500' },
    { id: 'testing', title: 'In Testing', icon: FlaskConical, color: 'text-indigo-500' },
    { id: 'decided', title: 'Final Decided', icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">Type Workflow</h1>
          <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Manage your typographic decisions</p>
        </div>
        <div className="flex bg-zinc-100 p-1 rounded-xl">
           <input 
             type="text" 
             placeholder="Quick add font..." 
             className="bg-transparent px-4 py-2 text-xs font-bold outline-none"
             value={newTaskName}
             onChange={(e) => setNewTaskName(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && addTask('idea')}
           />
           <button onClick={() => addTask('idea')} className="p-2 bg-zinc-900 text-white rounded-lg hover:bg-indigo-600 transition-colors">
             <Plus className="w-4 h-4" />
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map(col => (
          <div 
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, col.id)}
            className="flex flex-col bg-zinc-50/50 border border-zinc-100 rounded-[2.5rem] p-6 min-h-[600px]"
          >
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-white rounded-xl shadow-sm ${col.color}`}>
                  <col.icon className="w-5 h-5" />
                </div>
                <h2 className="font-black uppercase tracking-tighter text-zinc-900">{col.title}</h2>
              </div>
              <span className="text-[10px] font-black bg-zinc-200 text-zinc-500 px-2 py-1 rounded-md">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            <div className="space-y-4">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  className="group bg-white border border-zinc-200/60 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-zinc-100 group-hover:bg-indigo-500 transition-colors"></div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-black text-zinc-900 tracking-tight">{task.fontName}</h3>
                    <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 text-zinc-300 hover:text-red-500 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-4">{task.project}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                       {[1,2].map(i => (
                         <div key={i} className="w-5 h-5 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-zinc-400">U</div>
                       ))}
                    </div>
                    <GripVertical className="w-4 h-4 text-zinc-200" />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => {
                const name = prompt('Enter font name:');
                if(name) {
                  const newTask: Task = { id: Date.now().toString(), fontName: name, project: 'Manual Entry', status: col.id };
                  setTasks([...tasks, newTask]);
                }
              }}
              className="mt-6 w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-300 hover:border-indigo-500/30 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 text-xs font-bold"
            >
              <Plus className="w-4 h-4" /> Drop or Click to Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
