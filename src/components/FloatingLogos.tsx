import { useEffect, useRef, useState } from "react";

const LOGOS = [
  { name: "IBM", src: "https://cdn.simpleicons.org/ibm" },
  { name: "React", src: "https://cdn.simpleicons.org/react" },
  { name: "PHP", src: "https://cdn.simpleicons.org/php" },
  { name: "Python", src: "https://cdn.simpleicons.org/python" },
  { name: "MySQL", src: "https://cdn.simpleicons.org/mysql" },
  { name: "Jira", src: "https://cdn.simpleicons.org/jira" },
  { name: "Confluence", src: "https://cdn.simpleicons.org/confluence" },
  { name: "Selenium", src: "https://cdn.simpleicons.org/selenium" },
  { name: "Docker", src: "https://cdn.simpleicons.org/docker" },
  { name: "Linux", src: "https://cdn.simpleicons.org/linux" },
  { name: "Java", src: "https://cdn.simpleicons.org/java" },
  { name: "Angular", src: "https://cdn.simpleicons.org/angular" },
];

const MIN_SIZE = 26;
const MAX_SIZE = 40;
const MIN_SPEED = 0.25;
const MAX_SPEED = 0.55;

interface LogoState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<LogoState[]>([]);
  const rafRef = useRef<number>(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      if (logosRef.current.length === 0) {
        logosRef.current = LOGOS.map(() => {
          const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
          const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
          const angle = Math.random() * Math.PI * 2;
          return {
            x: Math.random() * Math.max(width - size, 1),
            y: Math.random() * Math.max(height - size, 1),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            opacity: 0.18 + Math.random() * 0.14,
          };
        });
      } else {
        logosRef.current.forEach((l) => {
          l.x = Math.min(l.x, width - l.size);
          l.y = Math.min(l.y, height - l.size);
        });
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 33);
      last = now;

      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      logosRef.current.forEach((l) => {
        l.x += l.vx * dt * 0.15;
        l.y += l.vy * dt * 0.15;

        if (l.x <= 0) {
          l.x = 0;
          l.vx = Math.abs(l.vx);
        } else if (l.x + l.size >= width) {
          l.x = width - l.size;
          l.vx = -Math.abs(l.vx);
        }

        if (l.y <= 0) {
          l.y = 0;
          l.vy = Math.abs(l.vy);
        } else if (l.y + l.size >= height) {
          l.y = height - l.size;
          l.vy = -Math.abs(l.vy);
        }
      });

      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {logosRef.current.map((l, i) => (
        <img
          key={LOGOS[i].name}
          src={LOGOS[i].src}
          alt={LOGOS[i].name}
          width={l.size}
          height={l.size}
          className="absolute select-none grayscale"
          style={{
            transform: `translate3d(${l.x}px, ${l.y}px, 0)`,
            width: l.size,
            height: l.size,
            opacity: l.opacity,
            filter: "grayscale(100%) brightness(1.2)",
          }}
        />
      ))}
    </div>
  );
}
