import { Confetti } from 'src/components/PartyPopper/confetti.ts';

interface PartyPopperProps {
  confetties: Confetti[];
}

const PartyPopper = ({ confetties }: PartyPopperProps) => {
  return confetties.map(piece => (
    <div
      key={piece.id}
      className={`absolute w-2 h-2 ${piece.color} transform`}
      style={{
        left: `${piece.x}%`,
        top: `${piece.y}%`,
        transform: `rotate(${piece.rotation}deg)`,
      }}
    />
  ));
};

export default PartyPopper;
