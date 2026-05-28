type ProgressBarProps = {
  value: number;
  colorClass?: string;
};

export function ProgressBar({ value, colorClass = "from-cyan-400 to-blue-500" }: ProgressBarProps) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
