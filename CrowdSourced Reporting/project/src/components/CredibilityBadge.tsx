import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../utils/cn';

interface CredibilityBadgeProps {
  score: number;
  className?: string;
}

export function CredibilityBadge({ score, className }: CredibilityBadgeProps) {
  const getColor = () => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getIcon = () => {
    if (score >= 80) return <ShieldCheck className="w-4 h-4" />;
    if (score >= 50) return <Shield className="w-4 h-4" />;
    return <ShieldAlert className="w-4 h-4" />;
  };

  return (
    <div className={cn(
      'flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium',
      getColor(),
      className
    )}>
      {getIcon()}
      <span>{score}%</span>
    </div>
  );
}