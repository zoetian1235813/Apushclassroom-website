import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface Word {
  id: string;
  text: string;
  used: boolean;
}

interface Blank {
  id: string;
  correctAnswer: string;
  currentAnswer: string | null;
}

const InteractivePractice = ({ type }: { type: 'SAQ' | 'LEQ' }) => {
  // SAQ 示例题目
  const saqQuestion = {
    prompt: "Analyze the impact of the Columbian Exchange on European society.",
    template: "The Columbian Exchange brought _____ from the Americas to Europe, which led to _____ and transformed the _____. This resulted in _____ across the continent.",
    words: [
      { id: 'w1', text: 'new crops', used: false },
      { id: 'w2', text: 'population growth', used: false },
      { id: 'w3', text: 'economic system', used: false },
      { id: 'w4', text: 'social changes', used: false },
      { id: 'w5', text: 'diseases', used: false },
      { id: 'w6', text: 'trade routes', used: false }
    ]
  };

  const [blanks, setBlanks] = useState<Blank[]>([
    { id: 'b1', correctAnswer: 'new crops', currentAnswer: null },
    { id: 'b2', correctAnswer: 'population growth', currentAnswer: null },
    { id: 'b3', correctAnswer: 'economic system', currentAnswer: null },
    { id: 'b4', correctAnswer: 'social changes', currentAnswer: null }
  ]);

  const [availableWords, setAvailableWords] = useState<Word[]>(saqQuestion.words);
  const [showResults, setShowResults] = useState(false);
  const [currentBlankIndex, setCurrentBlankIndex] = useState(0);

  const handleWordClick = (word: Word) => {
    if (currentBlankIndex >= blanks.length) return;

    const newBlanks = [...blanks];
    newBlanks[currentBlankIndex].currentAnswer = word.text;
    setBlanks(newBlanks);

    const newWords = availableWords.map(w => 
      w.id === word.id ? { ...w, used: true } : w
    );
    setAvailableWords(newWords);

    setCurrentBlankIndex(currentBlankIndex + 1);
  };

  const handleCheck = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setBlanks(blanks.map(b => ({ ...b, currentAnswer: null })));
    setAvailableWords(availableWords.map(w => ({ ...w, used: false })));
    setShowResults(false);
    setCurrentBlankIndex(0);
  };

  const isCorrect = (blank: Blank) => {
    return blank.currentAnswer === blank.correctAnswer;
  };

  const allFilled = blanks.every(b => b.currentAnswer !== null);
  const score = blanks.filter(isCorrect).length;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          NEW PRACTICE
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Complete the {type} Response
        </h2>
        <p className="text-gray-600 text-lg">{saqQuestion.prompt}</p>
      </div>

      {/* Template with blanks */}
      <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-8 mb-8">
        <div className="text-lg text-gray-700 leading-relaxed">
          {saqQuestion.template.split('_____').map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < blanks.length && (
                <span 
                  className={`inline-block min-w-[120px] mx-2 px-4 py-2 rounded-lg border-2 ${
                    blanks[index].currentAnswer
                      ? showResults
                        ? isCorrect(blanks[index])
                          ? 'bg-green-50 border-green-400 text-green-800'
                          : 'bg-red-50 border-red-400 text-red-800'
                        : 'bg-blue-50 border-blue-300 text-blue-800'
                      : index === currentBlankIndex && !showResults
                        ? 'bg-purple-50 border-purple-400 border-dashed animate-pulse'
                        : 'bg-white border-stone-300 border-dashed'
                  }`}
                >
                  {blanks[index].currentAnswer || (index === currentBlankIndex && !showResults ? '?' : '___')}
                  {showResults && blanks[index].currentAnswer && (
                    <span className="ml-2">
                      {isCorrect(blanks[index]) ? '✓' : '✗'}
                    </span>
                  )}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Word bank */}
      {!showResults && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
            Click the correct word:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableWords.map((word) => (
              <button
                key={word.id}
                onClick={() => !word.used && handleWordClick(word)}
                disabled={word.used}
                className={`p-4 rounded-xl border-2 font-medium text-lg transition-all ${
                  word.used
                    ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-white border-stone-300 text-gray-800 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md cursor-pointer'
                }`}
              >
                {word.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className={`p-6 rounded-2xl mb-8 ${
          score === blanks.length 
            ? 'bg-green-50 border-2 border-green-300' 
            : 'bg-yellow-50 border-2 border-yellow-300'
        }`}>
          <div className="flex items-center gap-4">
            {score === blanks.length ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-yellow-600" />
            )}
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {score === blanks.length ? 'Perfect!' : 'Good try!'}
              </h3>
              <p className="text-gray-600 text-lg">
                You got {score} out of {blanks.length} correct
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-4">
        {!showResults ? (
          <button
            onClick={handleCheck}
            disabled={!allFilled}
            className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition-all ${
              allFilled
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            CHECK
          </button>
        ) : (
          <>
            <button
              onClick={handleReset}
              className="flex-1 py-4 px-8 rounded-xl font-bold text-lg bg-stone-200 text-gray-800 hover:bg-stone-300 transition-all"
            >
              TRY AGAIN
            </button>
            <button
              className="flex-1 py-4 px-8 rounded-xl font-bold text-lg bg-green-500 text-white hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              CONTINUE
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Question 1 of 3
      </div>
    </div>
  );
};

export default InteractivePractice;