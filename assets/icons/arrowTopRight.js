const ArrowTopRight = ({ stroke = "#000000", size = 14, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      alt="arrow top right"
      title="arrow top right"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="arrowRightTopIconTitle"
      stroke={stroke}
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#000000"
      {...props}
    >
      <path d="M19 13V5h-8" />
      <path strokeLinecap="round" d="M19 5l-1 1" />
      <path d="M18 6L5 19" />
    </svg>
  );
};

export default ArrowTopRight;
