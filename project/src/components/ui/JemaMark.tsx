type NuruMarkProps = {
  size?: number;
  style?: React.CSSProperties;
};

export default function JemaMark({ size = 20, style }: NuruMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      <path
        d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z"
        fill="currentColor"
      />
      <circle cx="18.5" cy="5.5" r="1.6" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
