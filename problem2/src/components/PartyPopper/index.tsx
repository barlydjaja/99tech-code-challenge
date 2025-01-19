import { Confetti } from 'src/components/PartyPopper/confetti.ts';

interface PartyPopperProps {
  confetties: Confetti[];
}

const PartyPopper = ({confetties}: PartyPopperProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden h-[100dvh] pointer-events-none">
      {confetties.map(piece => (
        <div
          key={piece.id}
          className={`absolute w-2 h-2 ${piece.color} transform`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default PartyPopper;
