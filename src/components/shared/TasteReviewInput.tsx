'use client';

const MAX = 100;

export function TasteReviewInput({
  value,
  onChange,
  placeholder = '맛에 대해 100자 안으로 적어주세요.',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const len = value.length;
  const pct = Math.min((len / MAX) * 100, 100);
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0">
        <svg className="h-10 w-10 -rotate-90" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="#0064FF"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600">
          {len}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX}
        placeholder={placeholder}
        rows={3}
        className="min-h-[44px] w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
