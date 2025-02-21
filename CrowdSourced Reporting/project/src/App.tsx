import React, { useState } from 'react';
import { Search, Shield, BarChart2 } from 'lucide-react';
import { ArticleCard } from './components/ArticleCard';
import { SubmitArticle } from './components/SubmitArticle';
import type { Article } from './types';

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Breaking: Major Scientific Discovery Announced',
    url: 'https://example.com/science-discovery',
    credibilityScore: 85,
    flags: 2,
    verifications: 45,
    status: 'verified',
    dateSubmitted: new Date().toISOString(),
    submittedBy: 'JohnDoe'
  },
  {
    id: '2',
    title: 'Controversial Political Statement Goes Viral',
    url: 'https://example.com/political-statement',
    credibilityScore: 35,
    flags: 28,
    verifications: 12,
    status: 'disputed',
    dateSubmitted: new Date(Date.now() - 86400000).toISOString(),
    submittedBy: 'NewsWatcher'
  }
];

function App() {
  const [articles] = useState<Article[]>(MOCK_ARTICLES);

  const handleVerify = (id: string) => {
    console.log('Verifying article:', id);
  };

  const handleFlag = (id: string) => {
    console.log('Flagging article:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">TruthVerify</h1>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search articles..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Submissions</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BarChart2 className="w-4 h-4" />
                <span>Sort by: Credibility Score</span>
              </div>
            </div>
            
            {articles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onVerify={handleVerify}
                onFlag={handleFlag}
              />
            ))}
          </div>

          <div className="space-y-6">
            <SubmitArticle />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Trust Score</h2>
              <div className="flex items-center justify-center p-6 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">78</div>
                  <div className="text-sm text-gray-600 mt-1">Reputation Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;