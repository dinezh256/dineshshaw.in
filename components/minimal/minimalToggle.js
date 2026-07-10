import { useContext } from "react";
import { Moon, Monitor, Sun } from "react-feather";
import { GlobalContext } from "../../contexts";
import { cn } from "../../lib/utils";

const MinimalToggle = () => {
  const { viewModePreference, setViewMode } = useContext(GlobalContext);

  // Base segment style
  const seg =
    "flex items-center gap-1.5 px-[10px] py-1.5 rounded-[6px] border-none bg-transparent text-mn-text-secondary text-[13px] font-medium cursor-pointer transition-[background,color,transform] duration-[120ms] ease-out whitespace-nowrap [&_span]:text-[13px] [&_span]:font-medium [&_svg]:opacity-70 [&_svg]:shrink-0 [&_svg]:transition-opacity [&_svg]:duration-[120ms] active:scale-[0.97] hover:not-disabled:bg-mn-toggle-seg-hover hover:not-disabled:text-mn-text-primary hover:[&_svg]:opacity-100";

  const segActive =
    "bg-mn-toggle-seg-active text-mn-text-primary [&_svg]:opacity-100 active:scale-100";

  return (
    <div
      className="w-fit mx-auto my-[60px] mb-10 flex items-center gap-0.5 p-[3px] rounded-lg border border-mn-toggle-border bg-mn-toggle-bg select-none transition-all duration-[180ms]"
      role="group"
      aria-label="Theme preference"
    >
      <button
        className={cn(seg, viewModePreference === "minimal-light" && segActive)}
        onClick={() => setViewMode("minimal-light")}
        aria-pressed={viewModePreference === "minimal-light"}
        title="Light"
      >
        <Sun size={12} strokeWidth={2} />
        <span>Light</span>
      </button>
      <button
        className={cn(seg, viewModePreference === "minimal-dark" && segActive)}
        onClick={() => setViewMode("minimal-dark")}
        aria-pressed={viewModePreference === "minimal-dark"}
        title="Dark"
      >
        <Moon size={12} strokeWidth={2} />
        <span>Dark</span>
      </button>
      <button
        className={cn(seg, viewModePreference === "minimal-system" && segActive)}
        onClick={() => setViewMode("minimal-system")}
        aria-pressed={viewModePreference === "minimal-system"}
        title="System"
      >
        <Monitor size={12} strokeWidth={2} />
        <span>System</span>
      </button>
    </div>
  );
};

export default MinimalToggle;
