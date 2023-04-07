const ArrowTopRight = ({ stroke = "#000000", size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="arrowRightTopIconTitle"
      stroke={stroke}
      stroke-width="1"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
      color="#000000"
    >
      <path d="M19 13V5h-8" />
      <path stroke-linecap="round" d="M19 5l-1 1" />
      <path d="M18 6L5 19" />
    </svg>
  );
};

export default ArrowTopRight;
