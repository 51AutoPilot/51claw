"use client";

/**
 * 極光 Aurora 背景效果
 * 大面積柔和色帶緩慢飄動，橘色 + 冷青冷暖對比
 * keyframes 定義在 globals.css 確保 App Router 下生效
 */
export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100vh] overflow-hidden">
      {/* 色帶 1：橘色主光帶 */}
      <div
        className="absolute h-[60vh] w-[80vw] rounded-full opacity-[0.35]"
        style={{
          background: "radial-gradient(ellipse at center, #E8734A 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora-drift-1 20s ease-in-out infinite",
        }}
      />

      {/* 色帶 2：冷青光帶 */}
      <div
        className="absolute h-[50vh] w-[70vw] rounded-full opacity-[0.25]"
        style={{
          background: "radial-gradient(ellipse at center, #06b6d4 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "aurora-drift-2 25s ease-in-out infinite",
        }}
      />

      {/* 色帶 3：暖橘次光帶 */}
      <div
        className="absolute h-[45vh] w-[60vw] rounded-full opacity-[0.20]"
        style={{
          background: "radial-gradient(ellipse at center, #da7756 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "aurora-drift-3 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
