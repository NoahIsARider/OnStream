"use client";

interface SkinSelectorProps {
  onSelect: (skin: "twitch" | "bilibili") => void;
}

export default function SkinSelector({ onSelect }: SkinSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            OnStream
          </h1>
          <p className="text-lg text-gray-300">
            Your focus timer disguised as a live stream
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Choose your streaming platform skin
          </p>
        </div>

        {/* Skin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Twitch Card */}
          <button
            onClick={() => onSelect("twitch")}
            className="group relative bg-[#18181b] rounded-2xl p-8 border-2 border-[#2f2f35] hover:border-[#9146ff] transition-all duration-300 text-left hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#9146ff">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
              </svg>
              <h2 className="text-2xl font-bold text-white">Twitch</h2>
            </div>
            <p className="text-[#adadb8] text-sm mb-6">
              Dark theme with purple accents. Classic streaming platform feel with sidebar, chat panel, and channel info.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#9146ff]" />
              <span className="w-3 h-3 rounded-full bg-[#0e0e10]" />
              <span className="w-3 h-3 rounded-full bg-[#18181b]" />
              <span className="w-3 h-3 rounded-full bg-[#00f593]" />
            </div>
            <div className="absolute top-4 right-4 text-[#9146ff] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Bilibili Card */}
          <button
            onClick={() => onSelect("bilibili")}
            className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#fb7299] transition-all duration-300 text-left hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-200/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#fb7299]">bilibili</span>
              <h2 className="text-2xl font-bold text-[#212121]">Live</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Light theme with pink accents. Features danmaku bullet comments, gift animations, and a cozy community vibe.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#fb7299]" />
              <span className="w-3 h-3 rounded-full bg-[#f4f5f7]" />
              <span className="w-3 h-3 rounded-full bg-[#ffffff]" />
              <span className="w-3 h-3 rounded-full bg-[#00a1d6]" />
            </div>
            <div className="absolute top-4 right-4 text-[#fb7299] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400 mb-4">Features included in both skins:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Camera & Screen Share", "Video Filters", "Stickers", "Simulated Chat", "Floating Likes", "Gift Animations", "Focus Timer", "Danmaku (Bilibili)"].map((f) => (
              <span
                key={f}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-gray-300 border border-white/10"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
