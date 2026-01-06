'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FontCardV2 from '@/components/FontCardV2';
import { Search } from 'lucide-react';
import SmartSearch from '@/components/SmartSearch';
import { AnalysisResult } from '@/types/ai';

interface Font {
  id: string;
  name: string;
  foundry: string;
  license_type: string;
  tags: string[];
  description: string;
  preview_image?: string;
  views?: number;
  source_url: string;
}

export default function Home() {
  const [previewText, setPreviewText] = useState('');
  const [loading, setLoading] = useState(true);
  const [allFreeFonts, setAllFreeFonts] = useState<Font[]>([]);
  const [aiResult, setAiResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAiResult(result);
  };

  useEffect(() => {
    // 50+ Crawled Data from Noonnu
    const crawledData: Font[] = [
      { id: "694", name: "프리텐다드", foundry: "길형진 (orioncactus)", license_type: "OFL", tags: ["고딕", "UI", "본문"], description: "가장 대중적인 본문용 고딕체", views: 3710000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnud7ce0214808229b775cb05b9413bc40a1641514357" },
      { id: "1456", name: "페이퍼로지", foundry: "이주임 X 김도균", license_type: "OFL", tags: ["고딕", "협업", "디자인"], description: "멋진 한글 폰트와 영문 폰트의 COLLABO", views: 150000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202409/1726797211298465.png" },
      { id: "1663", name: "메모먼트 꾹꾹체", foundry: "메모먼트", license_type: "OFL", tags: ["손글씨", "귀여운"], description: "길바닥에 찍힌 귀여운 고양이 발바닥", views: 80000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202508/1756394784242439.png" },
      { id: "366", name: "G마켓 산스", foundry: "Gmarket", license_type: "OFL", tags: ["고딕", "제목", "임팩트"], description: "강력한 제목용 산세리프", views: 1200000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202408/1724813532340675.png" },
      { id: "115", name: "여기어때 잘난체", foundry: "여기어때컴퍼니", license_type: "OFL", tags: ["장식체", "브랜드"], description: "쓰면 쓸수록 매력만점 잘난체", views: 950000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu4dc2ea8ab1e84e1a38c5448a60857d151641513876" },
      { id: "33", name: "KoPub돋움", foundry: "한국출판인회의", license_type: "OFL", tags: ["고딕", "본문", "출판"], description: "출판 업계 표준 고딕체", views: 800000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu78c7cef2ca8093441d37d4e489bed9411641513809" },
      { id: "34", name: "본고딕 (Noto Sans)", foundry: "GoogleXAdobe", license_type: "OFL", tags: ["고딕", "글로벌", "표준"], description: "전 세계적으로 가장 널리 쓰이는 고딕", views: 2500000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnucc60cd339247a403022f6ca27cf526761659853435" },
      { id: "1541", name: "온글잎 박다현체", foundry: "온글잎", license_type: "OFL", tags: ["손글씨", "감성"], description: "안녕 나의 작고 소중한 고양이", views: 628000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202411/1732697382387472.png" },
      { id: "223", name: "에스코어드림", foundry: "S-Core", license_type: "OFL", tags: ["고딕", "현대적"], description: "샐러드를 먹으면 빨리 배고파져", views: 900000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnub26855466578e1e37bec0b9db03f32411659239805" },
      { id: "738", name: "어그로체", foundry: "(주)샌드박스네트워크", license_type: "OFL", tags: ["장식체", "유튜브"], description: "어그로가 필요한 순간엔 어그로체를", views: 450000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu0e896377a72660d651c1a599397801321659231666" },
      { id: "37", name: "나눔스퀘어", foundry: "네이버", license_type: "OFL", tags: ["고딕", "네이버", "깔끔"], description: "너도 떠나보면 나를 알게 될거야", views: 1500000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnubabac5e28bb4d2d64d075e76cd7528ac1641513813" },
      { id: "1084", name: "부크크 명조", foundry: "(주)부크크", license_type: "OFL", tags: ["명조", "책", "출판"], description: "책을 사랑하는 사람들을 위한 폰트", views: 120000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202302/1676810260012817.png" },
      { id: "1710", name: "학교안심 포스터", foundry: "Keris", license_type: "OFL", tags: ["장식체", "교육"], description: "포스터 제목으로 딱 쓰기 좋은 폰트", views: 50000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763369380638651.png" },
      { id: "1369", name: "프리젠테이션", foundry: "이주임", license_type: "OFL", tags: ["고딕", "PPT", "업무"], description: "PPT 작업에 든든한 폰트", views: 200000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202409/1726796789739563.png" },
      { id: "845", name: "수트", foundry: "SUNN YOUN", license_type: "OFL", tags: ["고딕", "다양한굵기"], description: "폰트 굵기가 진짜 다양하다", views: 300000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202304/1681653284608985.png" },
      { id: "872", name: "이서윤체", foundry: "흥국생명", license_type: "OFL", tags: ["손글씨", "따뜻한"], description: "변한다는게 항상 나쁜건 아니지", views: 180000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202409/1726796477192429.png" },
      { id: "415", name: "조선굴림체", foundry: "조선일보", license_type: "OFL", tags: ["굴림", "신문", "클래식"], description: "조금 일하고 많이 벌고 싶다", views: 400000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu626534a8ea656d71cb7850c57c2ebf6c1641514126" },
      { id: "1186", name: "파셜산스", foundry: "박준영", license_type: "OFL", tags: ["고딕", "독특한"], description: "과감한 친구를 쓰고 싶다면 이 폰트를", views: 90000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202308/1690849160637676.png" },
      { id: "669", name: "카페24 써라운드", foundry: "Cafe24", license_type: "OFL", tags: ["고딕", "둥근", "웹"], description: "둥글둥글한 고딕이 귀엽다", views: 500000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnucee1bf4c260c22ffd4670cde7a561f551641514336" },
      { id: "39", name: "나눔고딕", foundry: "네이버", license_type: "OFL", tags: ["고딕", "네이버", "국민"], description: "파리의 숨은 고양이 찾기", views: 3000000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu2e6c7fe0676b1cac5bb459de0824d4861641513815" },
      { id: "1500", name: "꾸불림체", foundry: "우아한형제들", license_type: "OFL", tags: ["굴림", "재미있는"], description: "꾸불꾸불한 히피펌같은 글꼴", views: 70000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202410/1728547254716907.png" },
      { id: "416", name: "조선궁서체", foundry: "조선일보", license_type: "OFL", tags: ["궁서", "진지함"], description: "진지하니까 궁서체로 말한다.", views: 220000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnudc6b6943ee4aa73ea987eaaa0c17bfd81641514127" },
      { id: "1712", name: "얇은둥근모", foundry: "사왈이", license_type: "OFL", tags: ["고딕", "레트로", "픽셀"], description: "지치고 힘들어도 힘내서 해야지", views: 30000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763369471747451.png" },
      { id: "734", name: "고운돋움", foundry: "류양희", license_type: "OFL", tags: ["고딕", "본문", "디자인"], description: "편안하고 친근한 돋움", views: 150000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu7c76bae39f270a1b0805765a625246f81659231753" },
      { id: "1702", name: "대구동성로", foundry: "대구광역시", license_type: "OFL", tags: ["장식체", "지역"], description: "행복은 따뜻한 어묵 한 꼬치에 있지", views: 25000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763367960255066.png" },
      { id: "41", name: "나눔명조", foundry: "네이버", license_type: "OFL", tags: ["명조", "본문"], description: "세상은 성실하지 않은 자에게 관대하지 않지.", views: 1800000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu83acb616f7035f48d91d928dca63b23e1641513817" },
      { id: "1708", name: "학교안심 날개", foundry: "Keris", license_type: "OFL", tags: ["손글씨", "교육"], description: "날개가 달린 것처럼 자유롭게", views: 40000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763369273307854.png" },
      { id: "1648", name: "영월체", foundry: "영월군청", license_type: "OFL", tags: ["장식체", "지역"], description: "더운 여름에 시원시원하게 쓰는 폰트", views: 35000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202507/1753086435925372.png" },
      { id: "1705", name: "학교안심 보드마카", foundry: "Keris", license_type: "OFL", tags: ["손글씨", "교육"], description: "보드마카로 또박또박 쓴 손글씨", views: 20000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763368779738047.png" },
      { id: "1604", name: "서울알림체", foundry: "서울시청", license_type: "OFL", tags: ["고딕", "서울", "공공"], description: "서울의 사계절이 다 예쁘다", views: 110000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202505/1748009855065378.png" },
      { id: "1715", name: "경복궁 수문장 제목체", foundry: "국가유산진흥원", license_type: "OFL", tags: ["장식체", "전통"], description: "경복궁 수문장보러 경복궁 가고 싶다", views: 15000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763714214141165.png" },
      { id: "1546", name: "온글잎 콘콘체", foundry: "온글잎", license_type: "OFL", tags: ["손글씨", "귀여운"], description: "너가 좋아하는게 뭔지 궁금해", views: 120000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202412/1733210874531771.png" },
      { id: "1510", name: "리아체", foundry: "롯데GRS", license_type: "OFL", tags: ["손글씨", "기업"], description: "도전 정신으로 뭐든지 해보자!", views: 60000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202410/1728548709235312.png" },
      { id: "463", name: "이사만루", foundry: "공게임즈", license_type: "OFL", tags: ["장식체", "스포츠"], description: "여러분은 어떤 야구팀을 좋아하시나요", views: 280000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu241417675a39ad74b3df869f98e3501a1659234279" },
      { id: "32", name: "KoPub바탕", foundry: "한국출판인회의", license_type: "OFL", tags: ["명조", "본문", "출판"], description: "나는 펜의 사각거리는 소리가 참 좋았어", views: 650000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu4e4dbf951125c5523752bea126c4e5b11641513808" },
      { id: "63", name: "조선일보명조체", foundry: "조선일보", license_type: "OFL", tags: ["명조", "신문", "정통"], description: "신문을 나는 냄새로 읽어", views: 320000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnuc8bc064ba16d01fc731bf6ba17ceb27d1641513837" },
      { id: "53", name: "주아체", foundry: "우아한형제들", license_type: "OFL", tags: ["손글씨", "귀여운"], description: "우아한형제들은 배민을 만들었죠", views: 1200000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnuab984830a349a13da1e35efb61a60a3f1641513828" },
      { id: "1136", name: "오뮤 다예쁨체", foundry: "오뮤다이어리", license_type: "OFL", tags: ["손글씨", "감성"], description: "힘들면 맛있는게 먹고 싶다", views: 240000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202304/1680424033641026.png" },
      { id: "330", name: "양진체", foundry: "김양진", license_type: "OFL", tags: ["장식체", "레트로"], description: "레트로하고 키치한 느낌의 서체", views: 380000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu91756e1523273aa6c5bbc41c95e54d5b1641514049" },
      { id: "952", name: "신라문화체", foundry: "경주시", license_type: "OFL", tags: ["붓글씨", "전통"], description: "멋드러진 붓글씨체다", views: 110000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnue6788102b50126567c53383b2b6adb761655085473" },
      { id: "1700", name: "창원단감둥근체", foundry: "창원시", license_type: "OFL", tags: ["고딕", "둥근", "지역"], description: "둥글둥글 부드럽게 말하면 좋잖아", views: 18000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763367080257146.png" },
      { id: "950", name: "평창평화체", foundry: "평창군", license_type: "OFL", tags: ["장식체", "지역"], description: "예쁘고 독특한 별모양 폰트", views: 140000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu5fbd42218ebfeebe48af6e2683bc01b71655085479" },
      { id: "1479", name: "학교안심 둥근미소", foundry: "Keris", license_type: "OFL", tags: ["고딕", "둥근", "교육"], description: "둥글둥글하게 말하는게 중요해", views: 42000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202409/1726797289583914.png" },
      { id: "1032", name: "제주돌담체", foundry: "얼리폰트", license_type: "OFL", tags: ["장식체", "독특한"], description: "제주도에 놀러가면 젲젷젶줓젴줗", views: 85000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnuc2964a85a7aabec707e097418734e7761667111061" },
      { id: "1699", name: "Cafe24 PRO SLIM", foundry: "Cafe24", license_type: "OFL", tags: ["고딕", "웹", "슬림"], description: "느리지만 단단하게 쌓아나가기", views: 12000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763366950543355.png" },
      { id: "250", name: "둥근모꼴+ Fixedsys", foundry: "길형진", license_type: "OFL", tags: ["고딕", "레트로", "비트맵"], description: "90년대 PC통신에 쓰이던 고전 폰트", views: 190000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnuc9d8835e267785f22cdb426083db5c731641513986" },
      { id: "487", name: "마루 부리", foundry: "네이버", license_type: "OFL", tags: ["명조", "네이버", "부리"], description: "나를 위해 직접 요리를 한다는 건", views: 550000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu1c8b7bf684d46106dca8de10a4d909c61641514187" },
      { id: "1345", name: "베이글팻", foundry: "김경원", license_type: "OFL", tags: ["장식체", "두꺼운"], description: "베이글과 크림치즈의 조합은 무적", views: 130000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202402/1708851024961883.png" },
      { id: "620", name: "을유1945", foundry: "을유문화사", license_type: "OFL", tags: ["명조", "출판", "클래식"], description: "책에 잘 어울리는 정갈하고 예쁜 명조 폰트", views: 280000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnud27db73ed9d983db81101c8b6f3b1e421659232247" },
      { id: "1635", name: "Kopub World 돋움", foundry: "한국출판인회의", license_type: "OFL", tags: ["고딕", "글로벌", "출판"], description: "여름이라면 팥빙수를 먹어줘야지", views: 420000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202507/1751738341618868.png" }
    ];

    setAllFreeFonts(crawledData);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen text-zinc-900 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      <main className="px-6 md:px-12 py-24 max-w-[1600px] mx-auto">
        
        {/* Editorial Hero */}
        <section className="mb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black mb-10 tracking-widest uppercase border border-indigo-100 shadow-sm animate-bounce">
            Next-Gen Type Intelligence
          </div>
          <h1 className="text-6xl md:text-[120px] font-black mb-12 tracking-tighter leading-[0.85] text-zinc-900 uppercase italic">
            Sense<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Decision.</span>
          </h1>
          
          <div className="w-full max-w-4xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white border border-zinc-200 rounded-3xl p-4 shadow-2xl overflow-hidden">
              <SmartSearch onAnalysisComplete={handleAnalysisComplete} />
            </div>
          </div>

          <div className="mt-16 w-full max-w-lg">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Real-time Global Preview</p>
            <input 
              type="text"
              placeholder="타이핑하여 모든 폰트의 감각을 테스트하세요"
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-indigo-500 outline-none text-center text-lg font-medium transition-all rounded-2xl shadow-inner"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
        </section>

        {/* AI Analysis Result Display */}
        {aiResult && (
          <section className="mb-32 max-w-4xl mx-auto p-10 bg-white border-2 border-indigo-100 rounded-[3rem] shadow-2xl animate-in fade-in zoom-in duration-700">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-indigo-600 mb-2">Analysis Result</h2>
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest inline-block border border-indigo-100">
                  Tone: {aiResult.tone}
                </div>
              </div>
              <button onClick={() => setAiResult(null)} className="text-zinc-300 hover:text-zinc-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <p className="text-lg text-zinc-600 mb-10 leading-relaxed font-medium">{aiResult.summary}</p>
            <div className="grid gap-4">
              {aiResult.recommendations.map((rec, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex justify-between items-center group hover:bg-indigo-50 transition-colors">
                  <div className="flex-1">
                    <span className="block text-[10px] font-black text-zinc-400 uppercase mb-1">Recommended Font</span>
                    <h4 className="text-xl font-black text-zinc-900">{rec.fontId}</h4>
                    <p className="text-sm text-zinc-500 mt-2">{rec.reason}</p>
                  </div>
                  <Link href={`/fonts/${rec.fontId}`} className="p-4 bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <Search className="w-3.5 h-3.5 text-indigo-600" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Sections with Grid Variation */}
        <div className="grid grid-cols-12 gap-12">
          
          {/* Featured Sidebar (Sense Metrics) */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-32 p-8 bg-zinc-900 text-white rounded-[2rem] shadow-2xl">
              <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4 tracking-tighter italic">TYPE SENSE<br/>METRICS</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest">Minimalism</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest">Authority</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[60%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest">Legibility</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[95%]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs leading-relaxed text-zinc-400">
                  Sense Typing의 AI는 단순 매칭을 넘어 귀하의 의도에 가장 부합하는 <span className="text-white font-bold">결정적 폰트</span>를 선별합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-9 space-y-32">
            
            {/* 1. Discovery Section (All Free Fonts) */}
            <section>
              <div className="flex justify-between items-baseline gap-4 mb-12">
                <div className="flex items-baseline gap-4">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Discovery</h2>
                  <p className="text-zinc-400 text-sm hidden md:block">Exploring 50+ Commercial Free Fonts</p>
                </div>
                <Link href="/index" className="text-[10px] font-black border-b border-zinc-900 pb-1 hover:text-indigo-600 hover:border-indigo-600 transition-colors uppercase tracking-widest">
                  View Index →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? [1,2,3,4].map(i => <div key={i} className="aspect-video bg-zinc-50 animate-pulse rounded-3xl" />)
                         : allFreeFonts.slice(0, 12).map(font => <FontCardV2 key={font.id} font={font} previewText={previewText} />)}
              </div>
              <div className="mt-12 flex justify-center">
                <Link href="/index" className="px-12 py-4 bg-zinc-100 text-zinc-900 font-black rounded-2xl hover:bg-zinc-900 hover:text-white transition-all uppercase text-xs tracking-widest">
                  Explore More Fonts
                </Link>
              </div>
            </section>

            {/* 2. Premium Intelligence (Market Highlight) */}
            <section>
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-white/10">Premium Strategy</span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                    Beyond Free.<br/> Professional.
                  </h2>
                  <p className="text-zinc-400 text-lg mb-10 max-w-xl leading-relaxed">
                    상업적 리스크가 0%인 검증된 유료 폰트와 기업용 커스텀 솔루션을 확인하세요. 당신의 브랜드는 특별해야 합니다.
                  </p>
                  <Link href="/market" className="inline-block px-8 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20">
                    Enter Market
                  </Link>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-zinc-800 rounded-3xl border border-white/5 flex items-center justify-center relative group overflow-hidden shadow-2xl">
                   <div className="text-8xl font-black select-none group-hover:scale-110 transition-transform duration-700 text-indigo-500/20">Aa</div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-indigo-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   </div>
                </div>
              </div>
            </section>

          </div>
        </div>

      </main>

    </div>
  );
}