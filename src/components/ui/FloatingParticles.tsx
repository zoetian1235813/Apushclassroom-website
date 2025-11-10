const particles = [
  { top: "8%", left: "18%", size: 160, duration: "22s", delay: "0s", opacity: 0.55 },
  { top: "22%", left: "72%", size: 190, duration: "18s", delay: "1.8s", opacity: 0.6 },
  { top: "48%", left: "12%", size: 140, duration: "21s", delay: "0.9s", opacity: 0.58 },
  { top: "68%", left: "78%", size: 120, duration: "25s", delay: "1.2s", opacity: 0.52 },
  { top: "82%", left: "32%", size: 110, duration: "19s", delay: "2.4s", opacity: 0.5 },
  { top: "35%", left: "50%", size: 230, duration: "24s", delay: "0.3s", opacity: 0.48 },
  { top: "12%", left: "88%", size: 90, duration: "26s", delay: "3.2s", opacity: 0.42 },
  { top: "72%", left: "8%", size: 150, duration: "20s", delay: "1.6s", opacity: 0.47 },
];

export const FloatingParticles = () => (
  <div className="particle-field" aria-hidden="true">
    {particles.map((particle, index) => (
      <span
        key={index}
        className="particle"
        style={{
          top: particle.top,
          left: particle.left,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          animationDelay: particle.delay,
          animationDuration: particle.duration,
        }}
      />
    ))}
    <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-64 rounded-full bg-gradient-to-br from-white/40 via-lavender/40 to-glow/40 blur-3xl opacity-60 animate-pulse-soft" />
  </div>
);

export default FloatingParticles;
