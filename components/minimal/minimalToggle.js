import { useContext } from "react";
import { Sun, Moon, Star } from "react-feather";
import { GlobalContext } from "../../contexts";

const MinimalToggle = () => {
  const { viewMode, setViewMode, enterMinimalMode } = useContext(GlobalContext);
  const isMinimal = viewMode !== "rich";

  const handleModeChange = () => {
    if (isMinimal) {
      setViewMode("rich");
    } else {
      enterMinimalMode();
    }
    // Scroll to top after mode change
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className={`minimal-toggle minimal-toggle--${viewMode}`} role="group" aria-label="View mode">

      {/* Light + Dark — slide in when minimal */}
      <div className={`mt-expand${isMinimal ? " mt-expand--open" : ""}`}>
        <button
          className={`mt-seg${viewMode === "minimal-light" ? " mt-seg--active" : ""}`}
          onClick={() => setViewMode("minimal-light")}
          aria-pressed={viewMode === "minimal-light"}
          title="Light"
        >
          <Sun size={12} strokeWidth={2} />
          <span>Light</span>
        </button>
        <button
          className={`mt-seg${viewMode === "minimal-dark" ? " mt-seg--active" : ""}`}
          onClick={() => setViewMode("minimal-dark")}
          aria-pressed={viewMode === "minimal-dark"}
          title="Dark"
        >
          <Moon size={12} strokeWidth={2} />
          <span>Dark</span>
        </button>
        <div className="mt-sep" />
      </div>

      {/* Rich / Minimal — always visible, acts as the anchor */}
      <button
        className={`mt-seg${!isMinimal ? " mt-seg--active" : ""}`}
        onClick={handleModeChange}
        aria-pressed={!isMinimal}
        title={isMinimal ? "Rich" : "Minimal"}
      >
        {isMinimal
          ? <Star size={12} strokeWidth={2} />
          : <Sun size={12} strokeWidth={2} />
        }
        <span>{isMinimal ? "Rich" : "Minimal"}</span>
      </button>

    </div>
  );
};

export default MinimalToggle;
