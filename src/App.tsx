import React, { useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { BookOpen, CheckCircle, FileText, Target, Clock, Award, ChevronRight, ChevronDown, Menu, X, Star, Sparkles } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  isProgressCheck: boolean;
  description: string;
}

interface Unit {
  id: number;
  title: string;
  period: string;
  description: string;
  color: string;
  bgColor: string;
  topics: Topic[];
}

interface QuestionType {
  id: string;
  name: string;
  fullName: string;
  description: string;
  weight: string;
  icon: any;
  color: string;
}

const apushUnits: Unit[] = [
  {
    id: 1,
    title: "A New World Begins",
    period: "1491-1607",
    description: "探索欧洲殖民前的美洲社会、欧洲探险动机、哥伦布大交换及其影响，以及早期殖民接触。",
    color: "from-red-400 to-orange-400",
    bgColor: "bg-red-50",
    topics: [
      { id: "1.1", title: "Contextualizing Period 1", isProgressCheck: false, description: "了解1491-1607年期间的历史背景，包括欧洲、非洲和美洲的主要发展趋势。" },
      { id: "1.2", title: "Native American Societies", isProgressCheck: false, description: "研究接触前北美的多样原住民社会、文化和经济系统。" },
      { id: "1.3", title: "European Exploration", isProgressCheck: false, description: "分析推动欧洲探险的经济、宗教和政治动机。" },
      { id: "1.4", title: "Columbian Exchange", isProgressCheck: false, description: "理解哥伦布大交换对旧世界和新世界的生物、经济和文化影响。" },
      { id: "1.5", title: "Labor Systems", isProgressCheck: false, description: "考察早期殖民地的劳工系统，包括契约仆役和奴隶制的起源。" },
      { id: "1.6", title: "Cultural Interactions", isProgressCheck: true, description: "综合分析欧洲人、非洲人和美洲原住民之间的文化互动和冲突。" }
    ]
  },
  {
    id: 2,
    title: "Colonial Society",
    period: "1607-1754",
    description: "研究英国殖民地的建立、大西洋经济、殖民社会发展及与原住民的关系。",
    color: "from-blue-400 to-cyan-400",
    bgColor: "bg-blue-50",
    topics: [
      { id: "2.1", title: "European Colonization", isProgressCheck: false, description: "分析欧洲列强在北美的殖民模式和策略。" },
      { id: "2.2", title: "Transatlantic Trade", isProgressCheck: false, description: "理解大西洋三角贸易及其对殖民地经济的影响。" },
      { id: "2.3", title: "Colonial Economics", isProgressCheck: false, description: "探索殖民地的经济系统、重商主义和贸易限制。" },
      { id: "2.4", title: "Colonial Society Development", isProgressCheck: false, description: "研究殖民社会结构、阶级分化和社会流动性。" },
      { id: "2.5", title: "Colonial Culture", isProgressCheck: false, description: "考察殖民文化、宗教生活和大觉醒运动。" },
      { id: "2.6", title: "Interactions with Natives", isProgressCheck: false, description: "分析殖民者与原住民的关系、冲突和合作。" },
      { id: "2.7", title: "Slavery in the Colonies", isProgressCheck: false, description: "理解奴隶制在殖民地的发展和制度化。" },
      { id: "2.8", title: "Colonial Government", isProgressCheck: false, description: "探索殖民地政府结构和自治传统的发展。" },
      { id: "2.9", title: "Colonial America Review", isProgressCheck: true, description: "综合复习殖民时期的主要主题和发展。" }
    ]
  }
];

const questionTypes: QuestionType[] = [
  { id: 'mcq', name: 'MCQ', fullName: 'Multiple Choice Questions', description: '55题，55分钟', weight: '40%', icon: Target, color: 'from-blue-500 to-blue-600' },
  { id: 'saq', name: 'SAQ', fullName: 'Short Answer Questions', description: '3题，40分钟', weight: '20%', icon: FileText, color: 'from-green-500 to-green-600' },
  { id: 'leq', name: 'LEQ', fullName: 'Long Essay Question', description: '1题（3选1），40分钟', weight: '15%', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
  { id: 'dbq', name: 'DBQ', fullName: 'Document-Based Question', description: '1题含7个文献，60分钟', weight: '25%', icon: Award, color: 'from-orange-500 to-orange-600' }
];

const App = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({});

  const toggleUnit = (unitId: number) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleTopicSelect = (unit: Unit, topic: Topic) => {
    setSelectedUnit(unit);
    setSelectedTopic(topic);
    setCurrentView('study');
    setIsSidebarOpen(false);
  };

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setSelectedTopic(null);
    setCurrentView('unitOverview');
    setIsSidebarOpen(false);
  };

  const renderHome = () => (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-12 rounded-3xl shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-5xl font-black">AP US History</h1>
          </div>
          <p className="text-2xl font-light mb-2">Modern Unit & Topic Study Guides</p>
          <p className="text-lg opacity-90">Complete coverage: 1491-1980 • 9 Units • 86 Topics</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer rounded-2xl"
              onClick={() => setCurrentView('study')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 opacity-20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative p-8">
            <div className="flex items-start gap-5">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Complete Study Guide</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Comprehensive notes covering all 9 units with key terms, historical context, and AP-aligned content
                </p>
                <Badge className="bg-blue-600 text-white px-4 py-1 text-sm">86 Topics</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer rounded-2xl"
              onClick={() => setCurrentView('questionTypes')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-300 opacity-20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative p-8">
            <div className="flex items-start gap-5">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">题型特训</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Practice all AP exam question types: MCQ, SAQ, LEQ, and DBQ with strategies and timing
                </p>
                <Badge className="bg-green-600 text-white px-4 py-1 text-sm">4 Question Types</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-lg border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-800">Course Coverage - Click to Explore</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {apushUnits.map((unit) => (
            <div 
              key={unit.id} 
              className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300 hover:-translate-y-1"
              onClick={() => handleUnitClick(unit)}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${unit.color}`}></div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`bg-gradient-to-r ${unit.color} text-white px-3 py-1 font-semibold`}>
                  Unit {unit.id}
                </Badge>
                <span className="text-xs font-medium text-gray-500">{unit.period}</span>
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{unit.title}</h4>
              <p className="text-sm text-gray-600">{unit.topics.length} topics</p>
              <ChevronRight className="absolute bottom-4 right-4 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white border-b-4 border-blue-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 hover:bg-blue-50 rounded-xl transition-colors"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-7 h-7 text-gray-700" /> : <Menu className="w-7 h-7 text-gray-700" />}
              </button>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fiveable</h1>
                <p className="text-xs font-medium text-gray-500">AP US History Study Guide</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0 fixed lg:sticky top-24 left-0 h-[calc(100vh-6rem)] bg-white lg:bg-transparent z-40 overflow-y-auto`}>
            <div className="bg-white rounded-2xl shadow-xl p-5 space-y-4 border-2 border-gray-100">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold py-3 rounded-xl shadow-lg"
                onClick={() => {
                  setCurrentView('home');
                  setIsSidebarOpen(false);
                }}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Home
              </Button>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {currentView === 'home' && renderHome()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;