const DetailLoader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={48}
        className="stroke-primary"
      >
        <style>
          {
            "@keyframes spinner_zKoa{to{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 300;stroke-dashoffset:0}47.5%{stroke-dasharray:84 300;stroke-dashoffset:-32}95%,to{stroke-dasharray:84 300;stroke-dashoffset:-118}}"
          }
        </style>
        <g
          style={{
            transformOrigin: "center",
            animation: "spinner_zKoa 2s linear infinite",
          }}
        >
          <circle
            cx={24}
            cy={24}
            r={19}
            fill="none"
            strokeWidth={6}
            style={{
              strokeLinecap: "round",
              animation: "spinner_YpZS 1.5s ease-in-out infinite",
            }}
          />
        </g>
      </svg>
    </div>
  );
};
export default DetailLoader;
