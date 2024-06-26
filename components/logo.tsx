import { cn } from "@/lib/utils";

export function Logo({ state = "dynamic", size = 24 }) {
  const sizeStyle = {
    fontSize: `${size}px`,
  };

  return (
    <div className={cn("logo-container", { "dynamic-state": state === "dynamic" })}>
      <span
        className={cn("letter", "letter-m font-bold", { "animate-m": state === "dynamic" })}
        style={sizeStyle}
      >
        M
      </span>
      <span
        className={cn("letter", "text-primary font-bold", { "animate-o": state === "dynamic" })}
        style={sizeStyle}
      >
        O
      </span>
    </div>
  );
}