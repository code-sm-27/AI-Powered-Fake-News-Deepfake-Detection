import React from 'react';
import { Flag, ThumbsUp, AlertTriangle } from 'lucide-react';
import { Article } from '../types';
import { CredibilityBadge } from './CredibilityBadge';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  onVerify: (id: string) => void;
  onFlag: (id: string) => void;
}

export function ArticleCard({ article, onVerify, onFlag }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
          <p className="text-sm text-gray-500">
            Submitted {formatDistanceToNow(new Date(article.dateSubmitted))} ago by {article.submittedBy}
          </p>
        </div>
        <CredibilityBadge score={article.credibilityScore} />
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Source
        </a>
        <span className="flex items-center gap-1">
          <Flag className="w-4 h-4" /> {article.flags} flags
        </span>
        <span className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" /> {article.verifications} verifications
        </span>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <button
          onClick={() => onVerify(article.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          <ThumbsUp className="w-4 h-4" /> Verify
        </button>
        <button
          onClick={() => onFlag(article.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          <AlertTriangle className="w-4 h-4" /> Flag
        </button>
      </div>
    </div>
  );
}