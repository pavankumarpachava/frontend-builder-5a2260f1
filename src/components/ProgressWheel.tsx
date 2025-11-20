import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressWheelProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressWheel = ({ 
  percentage, 
  size = 160, 
  strokeWidth = 12,
  className 
}: ProgressWheelProps) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayPercentage / 100) * circumference;

  useEffect(() => {
    // Immediate update for better LCP
    setDisplayPercentage(percentage);
  }, [percentage]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* 3D Shadow Base - optimized */}
      <div 
        className="absolute rounded-full blur-xl opacity-30"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
          transform: 'translateY(6px)',
        }}
      />
      
      {/* Main SVG */}
      <svg
        width={size}
        height={size}
        className="relative transform-gpu"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
          style={{
            textShadow: '0 2px 8px rgba(102, 126, 234, 0.2)',
          }}
        >
          {Math.round(displayPercentage)}%
        </span>
        <span className="text-xs text-muted-foreground mt-1">Complete</span>
      </div>
    </div>
  );
};
