import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FakeStream - Focus Timer Disguised as Live Stream',
    template: '%s | FakeStream',
  },
  description:
    'A Pomodoro focus timer disguised as a live streaming platform. Stay productive while feeling like you are broadcasting to thousands.',
  keywords: [
    'Pomodoro',
    'Focus Timer',
    'Fake Stream',
    'Productivity',
    'Study Stream',
    'Twitch',
    'Bilibili',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
