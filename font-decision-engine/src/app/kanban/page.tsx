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
    { id: 'pending', title: '신규 접수', icon: Clock, color: 'text-brand-gold', bgColor: 'bg-brand-gold/5' },
    { id: 'review', title: '라이선스 검토', icon: ShieldAlert, color: 'text-brand-red', bgColor: 'bg-brand-red/5' },
    { id: 'published', title: '게시 완료', icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-brand-paper pt-16">
      {/* Admin Header */}
      <div className="bg-brand-black text-white py-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-brand-red rounded-lg">
            <Lock className="w-3.5 h-3.5 text-white" />
          </div>
          <h1 className="text-xs font-bold tracking-wide">Sense Admin <span className="text-zinc-500">v2.4</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-medium text-zinc-400">Master Mode</span>
          <div className="w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center text-[10px] font-bold text-brand-black">AD</div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <header className="mb-8 flex justify-between items-end">
          <div>
            <span className="mono-label text-brand-gold mb-2 block">Admin</span>
            <h2 className="text-2xl font-bold text-brand-black mb-1">Font Pipeline</h2>
            <p className="text-zinc-500 text-sm">신규 폰트 접수 및 데이터베이스 관리</p>
          </div>
          <button className="px-4 py-2.5 bg-brand-black text-white text-xs font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> 직접 추가
          </button>
        </header>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map(col => (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, col.id)}
              className={`${col.bgColor} border border-brand-beige rounded-2xl p-5 min-h-[500px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 bg-white rounded-lg ${col.color}`}>
                    <col.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-brand-black text-sm">{col.title}</h3>
                </div>
                <span className="text-[10px] font-bold bg-white text-zinc-500 px-2 py-0.5 rounded-full border border-brand-beige">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {tasks.filter(t => t.status === col.id).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    className="group bg-white border border-brand-beige p-4 rounded-xl shadow-soft hover:shadow-card hover:border-brand-gold/30 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-brand-black mb-1">{task.name}</h4>
                        <span className="text-[10px] font-medium text-zinc-400 bg-brand-beige/30 px-1.5 py-0.5 rounded">
                          Via {task.source}
                        </span>
                      </div>
                      <div className="p-1.5 bg-brand-beige/30 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="w-3 h-3 text-zinc-300" />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Globe className="w-3 h-3" />
                        <span className="text-[10px] truncate">{task.licenseLink}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Plus className="w-3 h-3" />
                        <span className="text-[10px]">{task.reporter}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 bg-brand-beige/50 text-zinc-600 text-[10px] font-bold rounded-lg hover:bg-brand-beige transition-all">
                        상세보기
                      </button>
                      <button className="p-1.5 bg-brand-black text-white rounded-lg hover:bg-brand-gold hover:text-brand-black transition-all">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Card (Pending Column Only) */}
              {col.id === 'pending' && (
                <div className="mt-4 p-4 border-2 border-dashed border-brand-beige rounded-xl flex flex-col items-center justify-center gap-2 text-zinc-400 group hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer">
                  <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">새 접수 처리</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
