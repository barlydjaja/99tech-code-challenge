import { useEffect, useState } from 'react';
import { Confetti, createConfetti } from 'src/components/PartyPopper/confetti.ts';

const usePartyPopper = () => {
  const [confetties, setConfetties] = useState<Confetti[]>([]);
  const [isExploding, setIsExploding] = useState(false);

  const explode = () => {
    if (!isExploding) {
      setIsExploding(true);
      setConfetties([...createConfetti('left'), ...createConfetti('right')]);
    }
  };

  useEffect(() => {
    if (isExploding) {
      const gravity = 0.2;
      const friction = 0.995;
      let animationFrameId: number;

      const updateConfetti = () => {
        setConfetties(prevConfetties =>
          prevConfetties.map(piece => {
            const newVelocityY = piece.velocityY + gravity;
            const newVelocityX = piece.velocityX * friction;
            const newX = piece.x + newVelocityX * 0.05;
            const newY = piece.y + newVelocityY * 0.05;
            const newRotation = (piece.rotation + newVelocityX) % 360;

            if (newY > 125 || newX < -35 || newX > 135) {
              return null;
            }

            return {
              ...piece,
              x: newX,
              y: newY,
              velocityX: newVelocityX,
              velocityY: newVelocityY,
              rotation: newRotation
            };
          }).filter(piece => piece !== null)
        );
      };

      const animate = () => {
        updateConfetti();
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isExploding]);

  return {
    explode,
    confetties
  };
};

export default usePartyPopper;
