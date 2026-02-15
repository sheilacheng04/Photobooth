const WaxSeal = ({ letter = 'K', size = 45 }) => {
  return (
    <div
      className="wax-seal flex-shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="wax-seal-letter">{letter}</span>
    </div>
  );
};

export default WaxSeal;
