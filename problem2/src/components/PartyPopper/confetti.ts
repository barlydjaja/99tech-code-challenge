export interface Confetti {
  id: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  color: string;
  rotation: number;
  side: string;
}

export const createConfetti = (side: string): Confetti[] => {
  const newConfetti = [];
  const colors = ['bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'];

  for (let i = 0; i < 100; i++) {
    const angle = (side === 'left' ? Math.random() * 90 : Math.random() * 90 + 90) * (Math.PI / 180);
    const velocity = 17.5 + Math.random() * 14;
    const color = colors[Math.floor(Math.random() * colors.length)];

    newConfetti.push({
      id: `${side}-${i}`,
      x: side === 'left' ? 0 : 100,
      y: 50,
      velocityX: Math.cos(angle) * velocity,
      velocityY: -Math.sin(angle) * velocity,
      color,
      rotation: Math.random() * 360,
      side
    });
  }
  return newConfetti;
};
