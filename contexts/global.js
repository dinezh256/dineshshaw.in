import { createContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export const GlobalContext = createContext();

const VIEW_MODES = ["minimal-system", "minimal-light", "minimal-dark"];
const readSystemMinimalMode = () => {
  if (typeof window === "undefined") {
    return "minimal-light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "minimal-dark"
    : "minimal-light";
};

export const GlobalContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [viewModePreference, setViewModePreference] = useState(null); // Explicit null for hydration handoff
  const [systemMinimalMode, setSystemMinimalMode] = useState("minimal-light"); // Stable default for hydration

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const saved =
      localStorage.getItem("portfolio-view-mode") || "minimal-system";
    if (VIEW_MODES.includes(saved)) {
      setViewModePreference(saved);
    } else {
      setViewModePreference("minimal-system");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemMinimalMode = () => {
      const targetMode = mediaQuery.matches ? "minimal-dark" : "minimal-light";
      const saved = localStorage.getItem("portfolio-view-mode") || "minimal-system";
      if (document.startViewTransition) {
        document.documentElement.classList.add("theme-transition-active");
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setSystemMinimalMode(targetMode);
            if (saved === "minimal-system") {
              updateBodyClass("minimal-system");
            }
          });
        });
        transition.finished.finally(() => {
          document.documentElement.classList.remove("theme-transition-active");
        });
      } else {
        setSystemMinimalMode(targetMode);
        if (saved === "minimal-system") {
          updateBodyClass("minimal-system");
        }
      }
    };

    syncSystemMinimalMode();
    mediaQuery.addEventListener("change", syncSystemMinimalMode);

    return () => {
      mediaQuery.removeEventListener("change", syncSystemMinimalMode);
    };
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input or textarea
      const target = e.target;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      let newMode = null;

      if (key === "m") newMode = "minimal-system";
      if (key === "l") newMode = "minimal-light";
      if (key === "d") newMode = "minimal-dark";

      if (newMode) {
        setViewMode(newMode);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updateBodyClass = (mode) => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const html = document.documentElement;
    body.classList.remove("minimal-light", "minimal-dark", "minimal-system");
    html.classList.remove("minimal-light", "minimal-dark", "minimal-system");

    if (mode === "minimal-system") {
      body.classList.add("minimal-system");
      html.classList.add("minimal-system");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "minimal-dark"
        : "minimal-light";
      body.classList.add(systemTheme);
      html.classList.add(systemTheme);
    } else {
      body.classList.add(mode);
      html.classList.add(mode);
    }
  };

  const setViewMode = (mode) => {
    if (typeof document !== "undefined" && document.startViewTransition) {
      document.documentElement.classList.add("theme-transition-active");
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setViewModePreference(mode);
          localStorage.setItem("portfolio-view-mode", mode);
          updateBodyClass(mode);
        });
      });
      transition.finished.finally(() => {
        document.documentElement.classList.remove("theme-transition-active");
      });
    } else {
      setViewModePreference(mode);
      localStorage.setItem("portfolio-view-mode", mode);
      updateBodyClass(mode);
    }
  };

  const enterMinimalMode = () => {
    setSystemMinimalMode(readSystemMinimalMode());
    setViewMode("minimal-system");
  };

  const cycleViewMode = () => {
    const currentIdx = VIEW_MODES.indexOf(viewModePreference);
    const nextMode = VIEW_MODES[(currentIdx + 1) % VIEW_MODES.length];
    setViewMode(nextMode);
  };

  const viewMode =
    (viewModePreference === "minimal-system"
      ? systemMinimalMode
      : viewModePreference) || "minimal-system";

  const isMinimal = true;

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        viewMode,
        viewModePreference,
        setViewMode,
        enterMinimalMode,
        cycleViewMode,
        isMinimal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
