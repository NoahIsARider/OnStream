"use client";

import { FILTERS, STICKERS } from "@/lib/simulatedData";

interface FilterPanelProps {
  filterId: string;
  onFilterChange: (id: string) => void;
  stickers: string[];
  onStickerToggle: (id: string) => void;
  isBilibili: boolean;
}

export default function FilterPanel({
  filterId,
  onFilterChange,
  stickers,
  onStickerToggle,
  isBilibili,
}: FilterPanelProps) {
  return (
    <div className={`rounded-xl p-4 ${
      isBilibili
        ? "bg-white border border-gray-100 shadow-sm"
        : "bg-[#1f1f23] border border-[#2f2f35]"
    }`}>
      <h3 className={`text-sm font-semibold mb-3 ${
        isBilibili ? "text-gray-800" : "text-[#efeff1]"
      }`}>
        Filters & Effects
      </h3>

      {/* Filters */}
      <div className="mb-4">
        <label className={`text-xs font-medium mb-2 block ${
          isBilibili ? "text-gray-500" : "text-[#adadb8]"
        }`}>
          Video Filter
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className={`text-xs py-1.5 px-1 rounded-md transition-all text-center ${
                filterId === f.id
                  ? isBilibili
                    ? "bg-pink-500 text-white"
                    : "bg-[#9146ff] text-white"
                  : isBilibili
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-[#2f2f35] text-[#adadb8] hover:bg-[#3a3a3f]"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stickers */}
      <div>
        <label className={`text-xs font-medium mb-2 block ${
          isBilibili ? "text-gray-500" : "text-[#adadb8]"
        }`}>
          Stickers
        </label>
        <div className="grid grid-cols-6 gap-1.5">
          {STICKERS.map((s) => (
            <button
              key={s.id}
              onClick={() => onStickerToggle(s.id)}
              className={`text-xl py-1.5 rounded-md transition-all ${
                stickers.includes(s.id)
                  ? isBilibili
                    ? "bg-pink-100 ring-2 ring-pink-400"
                    : "bg-purple-900/50 ring-2 ring-[#9146ff]"
                  : isBilibili
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-[#2f2f35] hover:bg-[#3a3a3f]"
              }`}
              title={s.name}
            >
              {s.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
