import { cn } from "../../lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { ChevronDown } from "react-feather";
import { Button, buttonVariants } from "./button";
import { Separator } from "./separator";
import { Badge } from "./badge";

// ─── Button ───────────────────────────────────────────────────────────────────

/**
 * MnButton — shadcn Button/buttonVariants with mn-* token overrides.
 * Renders as <a> for href links, <Button> for onClick actions.
 */
export function MnButton({ className, variant, onClick, href, children, target, rel, ...props }) {
  const base =
    "text-[13px] px-3 py-[7px] h-auto gap-1.5 rounded-lg leading-none transition-[opacity,background-color,border-color,transform] duration-150 hover:-translate-y-px";

  const variants = {
    // Primary: solid dark fill
    default:
      "bg-mn-text-primary text-mn-bg border-mn-text-primary hover:opacity-85",
    // Secondary: accent-outlined (résumé)
    secondary:
      "bg-transparent text-mn-accent-text border-mn-accent-border hover:bg-mn-accent-subtle hover:border-mn-accent",
    // resume = secondary + diagonal icon
    resume:
      "bg-transparent text-mn-accent-text border-mn-accent-border hover:bg-mn-accent-subtle hover:border-mn-accent [&_svg]:rotate-45",
  };

  const cls = cn(
    buttonVariants({ variant: "outline" }),
    base,
    variants[variant] ?? variants.default,
    className,
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Button variant="outline" onClick={onClick} className={cls} {...props}>
      {children}
    </Button>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

/**
 * MnSeparator — shadcn Separator with mn-divider token.
 */
export function MnSeparator({ className, style }) {
  return (
    <Separator
      className={cn("my-10 bg-mn-divider border-none h-px shrink-0 w-full", className)}
      style={style}
    />
  );
}

// ─── Availability Badge ───────────────────────────────────────────────────────

/**
 * MnAvailabilityBadge — shadcn Badge with mn-* token overrides.
 */
export function MnAvailabilityBadge({ children, className }) {
  return (
    <Badge
      className={cn(
        "flex items-center gap-[7px] w-fit text-[13px] font-medium mt-8 mb-[26px] px-[10px] py-1 rounded-full text-mn-text-secondary bg-mn-btn-bg border border-mn-border-dim h-auto",
        className
      )}
    >
      <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shrink-0" />
      {children}
    </Badge>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────

/**
 * MnSectionTitle — uppercase label with a full-width rule line.
 */
export function MnSectionTitle({ children, className }) {
  return (
    <h2
      className={cn(
        "flex items-center gap-[10px] text-[11px] font-semibold tracking-[0.14em] uppercase mb-[18px] text-mn-accent-text after:content-[''] after:flex-1 after:h-px after:bg-current after:opacity-25",
        className
      )}
    >
      {children}
    </h2>
  );
}

// ─── Word Rotator ─────────────────────────────────────────────────────────────

/**
 * MnWordRotator — cycles through `words` using the `changeword` keyframe.
 * Each word fades in/out on a 6s loop, offset by 2s per item (max 3 words).
 *
 * @param {string}   prefix — static text before the rotating word
 * @param {string[]} words  — words to cycle
 */
export function MnWordRotator({ prefix, words }) {
  return (
    <p className="relative mt-[14px] text-[14px] font-medium leading-[1.65] min-h-[24px] text-mn-text-secondary">
      {prefix}
      <span className="inline relative">
        {words.map((word, i) => (
          <span
            key={word}
            className="absolute left-[6px] opacity-0 w-max font-semibold text-mn-text-primary"
            style={{
              animation: "changeword 6s linear infinite",
              animationDelay: `${i * 2}s`,
            }}
          >
            <strong> {word}</strong>
          </span>
        ))}
      </span>
    </p>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────

/**
 * MnPageHeader — shared page header: kicker + h1 + subtitle + word rotator.
 * Pass `children` for any extra content below (badges, CTAs, meta rows).
 *
 * @param {string}      kicker         — small uppercase label above h1
 * @param {string|JSX}  title          — h1 content
 * @param {string|JSX}  subtitle       — paragraph below h1
 * @param {string}      rotatorPrefix  — static text before rotating word
 * @param {string[]}    rotatorWords   — words to cycle in the rotator
 * @param {ReactNode}   children       — extra content after the rotator
 */
export function MnPageHeader({
  kicker,
  title,
  subtitle,
  rotatorPrefix,
  rotatorWords,
  children,
}) {
  return (
    <header className="mb-[14px]">
      <div className="mb-[14px] text-[13px] font-semibold tracking-[0.06em] uppercase text-mn-accent-text">
        {kicker}
      </div>
      <div className="mb-6">
        <h1 className="m-0 font-sans text-mn-hero font-medium tracking-[-0.04em] leading-[1.2] max-w-[16ch] text-mn-text-primary [&_strong]:font-semibold">
          {title}
        </h1>
        <p className="max-w-[34rem] mt-[18px] mb-0 text-[15px] leading-[1.8] text-mn-text-secondary [&_strong]:font-semibold">
          {subtitle}
        </p>
        {rotatorWords?.length > 0 && (
          <MnWordRotator prefix={rotatorPrefix} words={rotatorWords} />
        )}
      </div>
      {children}
    </header>
  );
}

// ─── Hover Row ────────────────────────────────────────────────────────────────

/**
 * MnHoverRow — interactive row with negative-margin flush, hover bg + lift.
 * Pass `as` to render as any element/component (default: "div").
 * Pass `hoverBg` to override the hover background token.
 */
export function MnHoverRow({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "group py-[10px] px-[10px] rounded-lg -mx-[10px] transition-[background,transform] duration-[120ms] text-mn-text-primary hover:bg-mn-hover-bg hover:-translate-y-px",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── Inline Link ──────────────────────────────────────────────────────────────

/**
 * MnInlineLink — inline anchor with border-bottom underline.
 * Used for skill tags, "View on GitHub" links, etc.
 */
export function MnInlineLink({ href, children, className, ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "no-underline border-b border-mn-accent-border text-mn-text-primary opacity-80 transition-[opacity,border-color] duration-150 hover:opacity-100 hover:border-mn-accent",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

/**
 * MnDropdown — A minimal themed reusable dropdown wrapping Shadcn DropdownMenu.
 */
export function MnDropdown({ value, options = [], onChange, className }) {
  const selectedLabel = options.find((opt) => opt.value === value)?.label || value;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center justify-between gap-3 bg-transparent border border-mn-divider rounded-md px-2 py-1.5 text-[12px] cursor-pointer outline-none hover:border-mn-accent focus:border-mn-accent focus-visible:outline-none focus-visible:ring-0 text-mn-text-primary transition-colors duration-150 min-w-[80px]",
          className
        )}
      >
        <span>{selectedLabel}</span>
        <ChevronDown size={13} className="text-mn-text-secondary" strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-mn-bg border-mn-divider min-w-[80px]">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => {
              if (onChange) onChange({ target: { value: opt.value } });
            }}
            className="cursor-pointer text-[12px] text-mn-text-primary focus:bg-mn-accent-subtle focus:text-mn-accent-text"
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
