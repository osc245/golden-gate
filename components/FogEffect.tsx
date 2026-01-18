"use client";

export function FogEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Multiple fog layers moving at different speeds */}
      <div
        className="absolute top-0 h-full animate-fog-1"
        style={{
          width: "200%",
          left: "-50%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-1/4 h-3/4 animate-fog-2"
        style={{
          width: "200%",
          left: "-50%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-1/2 h-1/2 animate-fog-3"
        style={{
          width: "200%",
          left: "-50%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}
