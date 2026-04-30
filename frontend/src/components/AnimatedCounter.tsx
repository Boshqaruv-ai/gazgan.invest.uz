import * as React from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

export function AnimatedCounter({ target, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const duration = 2000;
    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.floor(target * progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
