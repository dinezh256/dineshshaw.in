import { useContext } from "react";
import { Moon, Star, Sun } from "react-feather";
import { GlobalContext } from "../../contexts";
import { cn } from "../../lib/utils";

const MinimalToggle = () => {
  const { viewMode, setViewMode, enterMinimalMode } = useContext(GlobalContext);
  const isMinimal = viewMode !== "rich";

  const handleModeChange = () => {
    if (isMinimal) {
      setViewMode("rich");
    } else {
      enterMinimalMode();
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Base segment style
  const seg =
    "flex items-center gap-1.5 px-[10px] py-1.5 rounded-[6px] border-none bg-transparent text-mn-text-secondary text-[13px] font-medium cursor-pointer transition-[background,color,transform] duration-[120ms] ease-out whitespace-nowrap [&_span]:text-[13px] [&_span]:font-medium [&_svg]:opacity-70 [&_svg]:shrink-0 [&_svg]:transition-opacity [&_svg]:duration-[120ms] active:scale-[0.97] hover:not-disabled:bg-mn-toggle-seg-hover hover:not-disabled:text-mn-text-primary hover:[&_svg]:opacity-100";

  const segActive =
    "bg-mn-toggle-seg-active text-mn-text-primary [&_svg]:opacity-100 active:scale-100";

  return (
    <div
      className={`minimal-toggle--${viewMode} w-fit mx-auto my-[60px] mb-10 flex items-center gap-0.5 p-[3px] rounded-lg border border-mn-toggle-border bg-mn-toggle-bg select-none transition-all duration-[180ms]`}
      role="group"
      aria-label="View mode"
    >
      {/* Light + Dark — slide in when minimal */}
      <div
        className={cn(
          "flex items-center gap-0.5 overflow-hidden transition-[max-width,opacity] ease-spring-out",
          isMinimal
            ? "max-w-[200px] opacity-100 duration-[350ms]"
            : "max-w-0 opacity-0 duration-[250ms]",
        )}
      >
        <button
          className={cn(seg, viewMode === "minimal-light" && segActive)}
          onClick={() => setViewMode("minimal-light")}
          aria-pressed={viewMode === "minimal-light"}
          title="Light"
        >
          <Sun size={12} strokeWidth={2} />
          <span>Light</span>
        </button>
        <button
          className={cn(seg, viewMode === "minimal-dark" && segActive)}
          onClick={() => setViewMode("minimal-dark")}
          aria-pressed={viewMode === "minimal-dark"}
          title="Dark"
        >
          <Moon size={12} strokeWidth={2} />
          <span>Dark</span>
        </button>
        {/* Separator */}
        <div className="w-px h-[14px] bg-mn-divider mx-1" />
      </div>

      {/* Rich / Minimal — always visible */}
      <button
        className={cn(seg, !isMinimal && segActive)}
        onClick={handleModeChange}
        aria-pressed={!isMinimal}
        title={isMinimal ? "Rich" : "Minimal"}
      >
        {isMinimal ? (
          <Star size={12} strokeWidth={2} />
        ) : (
          <Sun size={12} strokeWidth={2} />
        )}
        <span>{isMinimal ? "Rich" : "Minimal"}</span>
      </button>
    </div>
  );
};

export default MinimalToggle;
