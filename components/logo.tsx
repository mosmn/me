
import { cn } from "@/lib/utils"
import "../styles/logo.css";

export function Logo({ state = "dynamic" }) {
  return (
    <div className={cn("logo-container", { "dynamic-state": state === "dynamic" })}>
      <span className={cn("letter", "letter-m", { "animate-m": state === "dynamic" })}>M</span>
      <span className={cn("letter", "text-primary", { "animate-o": state === "dynamic" })}>O</span>
    </div>
  );
}
