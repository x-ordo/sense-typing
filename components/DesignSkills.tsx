
import React from 'react';

const SKILLS = [
  {
    title: "단정한 미니멀리즘",
    vibe: "SaaS Admin",
    desc: "Pretendard 서체와 Neutral Gray 스케일을 활용하여 방대한 데이터 속에서도 정보 전달력을 극대화합니다.",
    tags: ["#8px-Grid", "#Shadow-Low", "#Inter-Style"],
    color: "#4a3f35"
  },
  {
    title: "힙한 개발자 감성",
    vibe: "Brutalist Dev",
    desc: "강렬한 블랙&화이트 대비와 굵은 보더라인으로 뚜렷한 기술적 정체성과 아키텍처의 견고함을 보여줍니다.",
    tags: ["#Bold-Border", "#Sharp-Edge", "#Monospace"],
    color: "#2a241e"
  },
  {
    title: "따뜻한 한국적 모던",
    vibe: "Hanok Modern",
    desc: "한지 텍스처와 빛바랜 먹색을 활용하여 사용자의 눈이 편안하고 깊은 신뢰감이 느껴지는 UI를 제안합니다.",
    tags: ["#Paper-Texture", "#Serif-Headers", "#Warm-Tone"],
    color: "#8e2e2c"
  }
];

const DesignSkills: React.FC = () => {
  return (
    <div className="mb-32">
      <div className="flex items-center gap-6 mb-12">
        <h3 className="serif-title text-3xl font-black text-[#1a1612] tracking-tight">AI 디자인 스킬셋 Preset</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-[#e8dfd0] to-transparent"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {SKILLS.map(skill => (
          <div key={skill.title} className="bg-white border border-[#e8dfd0] p-10 rounded-[32px] hover:border-[#b08d57] transition-all group cursor-pointer hover:shadow-2xl hover:shadow-[#b08d57]/10 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[11px] font-black text-[#b08d57] uppercase tracking-[0.2em] block py-1 border-b border-[#b08d57]/20">{skill.vibe}</span>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }}></div>
            </div>
            <h4 className="text-2xl font-black text-[#1a1612] mb-6 group-hover:text-[#8e2e2c] transition-colors leading-tight">{skill.title}</h4>
            <p className="text-base text-[#6a5f54] leading-relaxed mb-10 flex-1">{skill.desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skill.tags.map(tag => (
                <span key={tag} className="text-[10px] font-black text-[#b08d57] bg-[#fdfbf7] px-3 py-1.5 rounded-xl border border-[#e8dfd0] group-hover:border-[#b08d57]/30 transition-colors">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignSkills;
