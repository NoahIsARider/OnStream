"use client";

import { useState } from "react";
import SkinSelector from "@/components/SkinSelector";
import StreamPage from "@/components/StreamPage";

export default function Home() {
  const [skin, setSkin] = useState<"twitch" | "bilibili" | null>(null);

  if (!skin) {
    return <SkinSelector onSelect={setSkin} />;
  }

  return (
    <StreamPage
      skin={skin}
      onBack={() => setSkin(null)}
    />
  );
}
