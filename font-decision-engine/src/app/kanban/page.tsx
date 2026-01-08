'use client'

export const runtime = 'edge';

import { useState } from 'react';
import { Plus, GripVertical, CheckCircle2, ShieldAlert, Clock, ExternalLink, Globe, Lock, LucideIcon } from 'lucide-react';

interface FontTask {
  id: string;
  name: string;
  source: string;
  reporter: string;
  licenseLink: string;
  status: 'pending' | 'review' | 'published';
}

export default function AdminKanbanPage() {
  const [tasks, setTasks] = useState<FontTask[]>([
    { id: '1', name: '새로운 손글씨체', source: 'Google Form', reporter: 'park***@gmail.com', licenseLink: '#', status: 'pending' },
    { id: '2', name: '기업 전용 서체 B', source: 'Crawler', reporter: 'System', licenseLink: '#', status: 'review' },
    { id: '3', name: 'Pretendard', source: 'Direct', reporter: 'Admin', licenseLink: '#', status: 'published' },
  ]);

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('taskId', id);
  };

  const onDrop = (e: React.DragEvent, status: FontTask['status']) => {
    const id = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
    setTasks(updatedTasks);
  };

  const columns: { id: FontTask['status']; title: string; icon: LucideIcon; color: string; bgColor: string }[] = [
    { id: 'pending', title: 'New Submissions', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { id: 'review', title: 'License Review', icon: ShieldAlert, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: 'published', title: 'Live on Store', icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] pb-20">
      {/* Admin Header */}
      <div className="bg-zinc-900 text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-500 rounded-lg">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-sm font-black uppercase tracking-[0.3em]">Sense Typing Admin <span className="text-zinc-500 font-medium">v2.4</span></h1>
        </div>
        <div className="flex items-center gap-6">
           <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Master Mode</span>
           <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-zinc-700 flex items-center justify-center text-[10px] font-black">AD</div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-zinc-900 mb-2">Font Pipeline</h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Manage newly reported fonts and database updates</p>
          </div>
          <button className="px-6 py-3 bg-zinc-900 text-white text-xs font-black rounded-xl hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg shadow-zinc-200">
            <Plus className="w-4 h-4" /> Add Manual Data
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {columns.map(col => (
            <div 
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, col.id)}
              className={`${col.bgColor} border border-zinc-200/50 rounded-[2.5rem] p-6 min-h-[700px] shadow-inner`}
            >
              <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-white rounded-xl shadow-sm ${col.color}`}>
                    <col.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black uppercase tracking-tighter text-zinc-900 text-sm">{col.title}</h3>
                </div>
                <span className="text-[10px] font-black bg-white/50 text-zinc-500 px-2.5 py-1 rounded-full border border-zinc-200">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>

              <div className="space-y-4">
                {tasks.filter(t => t.status === col.id).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    className="group bg-white border border-zinc-200 p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-sm font-black text-zinc-900 mb-1">{task.name}</h4>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter bg-zinc-50 px-1.5 py-0.5 rounded">Via {task.source}</span>
                        </div>
                      </div>
                      <div className="p-2 bg-zinc-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="w-4 h-4 text-zinc-300" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                       <div className="flex items-center gap-2 text-zinc-500">
                          <Globe className="w-3 h-3" />
                          <span className="text-[10px] font-medium truncate">{task.licenseLink}</span>
                       </div>
                       <div className="flex items-center gap-2 text-zinc-500">
                          <Plus className="w-3 h-3" />
                          <span className="text-[10px] font-medium">Reported by: {task.reporter}</span>
                       </div>
                    </div>

                    <div className="flex gap-2">
                       <button className="flex-1 py-2 bg-zinc-100 text-zinc-600 text-[10px] font-black rounded-lg hover:bg-zinc-200 transition-all uppercase">Detail</button>
                       <button className="p-2 bg-zinc-900 text-white rounded-lg hover:bg-indigo-600 transition-all">
                          <ExternalLink className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {col.id === 'pending' && (
                <div className="mt-6 p-6 border-2 border-dashed border-zinc-300 rounded-3xl flex flex-col items-center justify-center gap-3 text-zinc-400 group hover:border-indigo-400 transition-all cursor-pointer">
                   <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Process New Intake</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}