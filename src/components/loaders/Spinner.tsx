type Props = {
  /** Positive number */
  scale?: number;
};

const Spinner = ({ scale = 1 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48 * scale}
      height={48 * scale}
      className="stroke-primary"
    >
      <style>
        {`@keyframes spinner_zKoa{to{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 ${
          300 * scale
        };stroke-dashoffset:0}47.5%{stroke-dasharray:${84 * scale} ${
          300 * scale
        };stroke-dashoffset:-${32 * scale}}95%,to{stroke-dasharray:${
          84 * scale
        } ${300 * scale};stroke-dashoffset:-${118 * scale}}}`}
      </style>
      <g
        style={{
          transformOrigin: "center",
          animation: "spinner_zKoa 2s linear infinite",
        }}
      >
        <circle
          cx={24 * scale}
          cy={24 * scale}
          r={19 * scale}
          fill="none"
          strokeWidth={6 * scale}
          style={{
            strokeLinecap: "round",
            animation: "spinner_YpZS 1.5s ease-in-out infinite",
          }}
        />
      </g>
    </svg>
  );
};
export default Spinner;
