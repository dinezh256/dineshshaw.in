/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── Minimal-mode CSS variable tokens ───
      colors: {
        "mn-bg": "var(--mn-bg)",
        "mn-text-primary": "var(--mn-text-primary)",
        "mn-text-secondary": "var(--mn-text-secondary)",
        "mn-text-dim": "var(--mn-text-dim)",
        "mn-border-dim": "var(--mn-border-dim)",
        "mn-border-strong": "var(--mn-border-strong)",
        "mn-btn-bg": "var(--mn-btn-bg)",
        "mn-btn-bg-hover": "var(--mn-btn-bg-hover)",
        "mn-divider": "var(--mn-divider)",
        "mn-toggle-bg": "var(--mn-toggle-bg)",
        "mn-toggle-border": "var(--mn-toggle-border)",
        "mn-toggle-shadow": "var(--mn-toggle-shadow)",
        "mn-toggle-seg-hover": "var(--mn-toggle-seg-hover)",
        "mn-toggle-seg-active": "var(--mn-toggle-seg-active)",
        "mn-nav-bg": "var(--mn-nav-bg)",
        "mn-nav-active-bg": "var(--mn-nav-active-bg)",
        "mn-hover-bg": "var(--mn-hover-bg)",
        "mn-code-bg": "var(--mn-code-bg)",
        "mn-code-text": "var(--mn-code-text)",
        // Fireball accent
        "mn-accent": "var(--mn-accent)",
        "mn-accent-subtle": "var(--mn-accent-subtle)",
        "mn-accent-text": "var(--mn-accent-text)",
        "mn-accent-border": "var(--mn-accent-border)",
      },

      // ─── Font sizes (clamp for responsive hero) ───
      fontSize: {
        "mn-hero": "clamp(28px, 4vw, 36px)",
        "mn-name": "clamp(30px, 4vw, 38px)",
      },

      // ─── Minimal-mode keyframe animations ───
      keyframes: {
        changeword: {
          "0%, 25%": { opacity: "1", transform: "translateY(0)" },
          "33%, 100%": { opacity: "0", transform: "translateY(-8px)" },
        },
        "mn-changeword": {
          "0%, 22%": { opacity: "1", transform: "translateY(0)" },
          "30%, 100%": { opacity: "0", transform: "translateY(-8px)" },
        },
      },
      animation: {
        changeword: "changeword 6s linear infinite",
        "changeword-slow": "mn-changeword 9s linear infinite",
      },

      // ─── Custom easing for toggle expand ───
      transitionTimingFunction: {
        "spring-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      // ─── Max-width for toggle expand animation ───
      maxWidth: {
        "toggle-expand": "200px",
      },

      // ─── Transition property for max-width animation ───
      transitionProperty: {
        "max-width": "max-width",
      },

      // ─── Custom letter-spacing for kicker ───
      letterSpacing: {
        kicker: "0.06em",
        "section-title": "0.14em",
        "footer-label": "0.08em",
      },

      // ─── Custom line-height for list items ───
      lineHeight: {
        "mn-list": "1.78",
        "mn-hero": "1.2",
        "mn-subline": "1.8",
        "mn-animated": "1.65",
      },

      // ─── Min-width for role period in timeline ───
      minWidth: {
        "role-period": "155px",
        "social-name": "72px",
      },
    },
  },
  plugins: [],
};
