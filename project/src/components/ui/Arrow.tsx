type Props = {
  size?: number;
  direction?: "right" | "left" | "up" | "down";
  color?: string;
  className?: string;
};

export default function Arrow({
  size = 20,
  direction = "right",
  color,
  className,
}: Props) {
  const strokeWidth = Math.max(3, Math.round((size / 20) * 4));
  const rotate = { right: 0, down: 90, left: 180, up: 270 }[direction];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        color: color ?? "currentColor",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        marginLeft: 4,
      }}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 10 H16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M11 4.5 L16.5 10 L11 15.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
