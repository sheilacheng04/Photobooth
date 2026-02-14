const WaxSeal = ({ letter = 'W', size = 50 }) => {
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
