import React, { useState } from 'react';
import { questions, shuffle } from '../data/durandTest';

export default function DurandTest({ cmsData }: { cmsData: any }) {
  const [step, setStep] = useState(0); // 0 = Интро, 1+ = Вопросы, 999 = Результат
  const [scores, setScores] = useState({ ir: 0, ive: 0, is_val: 0, dmrs: 0 });
  const [currentOrder, setCurrentOrder] = useState<number[]>([]);
  const [currentOptions, setCurrentOptions] = useState<any[]>([]);

  // Запуск теста
  const startTest = () => {
    const order = shuffle(Array.from({ length: questions.length }, (_, i) => i));
    setCurrentOrder(order);
    loadQuestionOpts(order[0]);
    setStep(1);
    setScores({ ir: 0, ive: 0, is_val: 0, dmrs: 0 });
  };

  const loadQuestionOpts = (qIndex: number) => {
    setCurrentOptions(shuffle([...questions[qIndex].opts]));
  };

  // Обработка ответов
  const handleAnswer = (tag: string) => {
    const parts = tag.split('_');
    const newScores = { ...scores };

    if (parts[0] === 'p1') {
      newScores.ir += parseInt(parts[1]);
      newScores.ive += parseInt(parts[2]);
      newScores.is_val += parseInt(parts[3]);
    } else if (parts[0] === 'p2') {
      newScores.dmrs += parseInt(parts[1]);
    }
    setScores(newScores);

    if (step < questions.length) {
      loadQuestionOpts(currentOrder[step]);
      setStep(step + 1);
    } else {
      setStep(999);
    }
  };

  // Вычисление результата
  const getResult = () => {
    const regime = scores.ir >= 0 ? "Day" : "Night";
    let season = "";
    if (scores.ive >= 0 && scores.is_val >= 0) season = "Summer";
    else if (scores.ive >= 0 && scores.is_val < 0) season = "Spring";
    else if (scores.ive < 0 && scores.is_val >= 0) season = "Winter";
    else season = "Autumn";

    let weather = "";
    if (scores.dmrs >= 10) weather = "Clear";
    else if (scores.dmrs >= 6) weather = "Cloudy";
    else weather = "Foggy";

    const resKey = `${regime}_${season}_${weather}`;
    const ivyr = Math.round(Math.sqrt(Math.pow(scores.ir, 2) + Math.pow(scores.ive, 2) + Math.pow(scores.is_val, 2)) * 10) / 10;
    
    // Превращаем массив из админки в удобный объект для поиска
    const resultsFromCMS: Record<string, any> = {};
    if (cmsData?.results) {
      cmsData.results.forEach((r: any) => { resultsFromCMS[r.code] = r; });
    }
    
    // Ищем результат. Если в админке его еще нет, покажем подсказку
    const resultData = resultsFromCMS[resKey] || { 
      title: `Профиль: ${resKey}`, 
      desc: `Вы еще не добавили этот результат в админку! Зайдите в раздел "Настройки Теста", нажмите Add и добавьте Код: ${resKey}`, 
    };
    
    return { ...resultData, ivyr };
  };

  // --- ДИЗАЙН ИНТРО ---
  if (step === 0) {
    return (
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-black mb-6">
          {cmsData?.introTitle || 'Архитектура Воображаемого'}
        </h2>
        <div className="text-gray-600 space-y-4 mb-10 text-lg leading-relaxed whitespace-pre-wrap">
          {cmsData?.introText || 'Загрузка...'}
        </div>
        <button onClick={startTest} className="px-8 py-4 bg-black text-white rounded-md font-bold hover:bg-blue-600 transition-colors shadow-lg w-full sm:w-auto">
          Начать исследование
        </button>
      </div>
    );
  }

  // --- ДИЗАЙН РЕЗУЛЬТАТА ---
  if (step === 999) {
    const res = getResult();
    return (
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 p-6 md:p-12 rounded-lg shadow-sm">
        <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Ваша архитектура</div>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-black mb-4">{res.title}</h2>
        
        <div className="text-sm font-mono text-gray-500 mb-8 border-b border-gray-100 pb-4">
          Индекс структурной выраженности: {res.ivyr}
        </div>
        
        {res.image && (
          <img 
            src={res.image} 
            alt={res.title} 
            className="w-full h-64 md:h-80 object-cover rounded-md mb-8 shadow-sm grayscale hover:grayscale-0 transition-all duration-700" 
          />
        )}
        
        {res.quote && (
          <blockquote className="border-l-4 border-black pl-6 py-2 my-8 italic text-gray-600 bg-gray-50 rounded-r-lg">
            {res.quote}
          </blockquote>
        )}
        
        <p className="text-gray-800 leading-relaxed text-lg mb-8 whitespace-pre-wrap">{res.desc}</p>
        
        {(res.pros || res.cons) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {res.pros && (
              <div className="bg-emerald-50 p-5 rounded-md border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Сильные стороны</h4>
                <p className="text-sm text-emerald-900 whitespace-pre-wrap">{res.pros}</p>
              </div>
            )}
            {res.cons && (
              <div className="bg-red-50 p-5 rounded-md border border-red-100">
                <h4 className="font-bold text-red-800 mb-2">Слабые стороны</h4>
                <p className="text-sm text-red-900 whitespace-pre-wrap">{res.cons}</p>
              </div>
            )}
          </div>
        )}
        
        <button onClick={() => setStep(0)} className="text-sm font-bold uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-2">
          <span>←</span> Пройти заново
        </button>
      </div>
    );
  }

  // --- ДИЗАЙН ВОПРОСА ---
  const currentQ = questions[currentOrder[step - 1]];
  const progress = (step / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-100 h-1.5 w-full">
        <div className="bg-blue-600 h-1.5 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="p-6 md:p-12 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
          Вопрос {step} из {questions.length}
        </div>
        
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-10 leading-snug">
          {currentQ.text}
        </h3>

        <div className="grid grid-cols-1 gap-4 text-left">
          {currentOptions.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(opt.tag)}
              className="p-5 border-2 border-gray-100 rounded-md hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left group"
            >
              <span className="font-medium text-gray-800 text-sm md:text-base group-hover:text-blue-900">
                {opt.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}