import { useMemo, useState } from "react";
import { Activity, Coffee, Target } from "react-feather";
import { healthProfile } from "../../data/health";
import {
  MnPageHeader,
  MnSectionTitle,
  MnSeparator,
} from "../ui/minimal";
import MinimalFooter from "./minimalFooter";

const metricOptions = [
  { key: "weight", label: "Weight", unit: "kg" },
  { key: "bodyFat", label: "Body fat", unit: "%" },
  { key: "leanMass", label: "Lean mass", unit: "kg" },
];

const formatNumber = (value) =>
  Number.isInteger(value) ? value.toString() : value.toFixed(1);

const formatCurrentMonth = () =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

const CurrentMonth = () => (
  <time suppressHydrationWarning>{formatCurrentMonth()}</time>
);

const Section = ({ title, children, className = "" }) => (
  <section className={`mn-section ${className}`}>
    <MnSectionTitle>{title}</MnSectionTitle>
    {children}
  </section>
);

const StatRow = ({ label, value }) => (
  <div className="border-t border-mn-divider py-3 first:border-t-0">
    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mn-text-dim">
      {label}
    </div>
    <div className="mt-1 text-[14px] font-medium leading-snug text-mn-text-primary">
      {value}
    </div>
  </div>
);

const HealthChart = ({ data, metric }) => {
  const width = 640;
  const height = 210;
  const padding = 24;

  const points = useMemo(() => {
    const values = data.map((item) => item[metric.key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return data.map((item, index) => {
      const x =
        padding + (index / Math.max(data.length - 1, 1)) * (width - padding * 2);
      const y =
        padding +
        ((max - item[metric.key]) / range) * (height - padding * 2);

      return { ...item, x, y, value: item[metric.key] };
    });
  }, [data, metric]);

  const path = points.map((point) => `${point.x},${point.y}`).join(" ");
  const first = points[0];
  const last = points[points.length - 1];

  return (
    <div className="overflow-hidden rounded-[8px] border border-mn-divider bg-mn-btn-bg">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${metric.label} progress chart`}
        className="block h-auto w-full"
      >
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="var(--mn-divider)"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="var(--mn-divider)"
        />
        <polyline
          points={path}
          fill="none"
          stroke="var(--mn-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point) => (
          <circle
            key={`${point.date}-${metric.key}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="var(--mn-bg)"
            stroke="var(--mn-accent)"
            strokeWidth="2"
          >
            <title>{`${point.date}: ${formatNumber(point.value)} ${metric.unit}`}</title>
          </circle>
        ))}
        <text
          x={first.x}
          y={height - 8}
          fill="var(--mn-text-dim)"
          fontSize="12"
        >
          {first.date}
        </text>
        <text
          x={last.x}
          y={height - 8}
          textAnchor="end"
          fill="var(--mn-text-dim)"
          fontSize="12"
        >
          {last.date}
        </text>
      </svg>
    </div>
  );
};

const GoalAxis = ({ goal }) => {
  const min = Math.min(goal.current, goal.target) - 2;
  const max = Math.max(goal.current, goal.target) + 2;
  const currentPosition = ((goal.current - min) / (max - min)) * 100;
  const targetPosition = ((goal.target - min) / (max - min)) * 100;

  return (
    <div className="rounded-[8px] border border-mn-divider bg-mn-btn-bg p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mn-text-dim">
            {goal.label}
          </div>
          <div className="mt-1 text-[15px] font-medium text-mn-text-primary">
            {goal.current} {goal.unit} to {goal.target} {goal.unit}
          </div>
        </div>
        <Target size={17} strokeWidth={2} className="mt-0.5 text-mn-accent" />
      </div>
      <div className="relative mt-8 h-8">
        <div className="absolute left-0 right-0 top-3 h-px bg-mn-divider" />
        <div
          className="absolute top-[7px] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-mn-accent bg-mn-bg"
          style={{ left: `${currentPosition}%` }}
        />
        <div
          className="absolute top-[9px] h-2 w-2 -translate-x-1/2 rounded-full bg-mn-text-dim"
          style={{ left: `${targetPosition}%` }}
        />
        <div
          className="absolute top-6 -translate-x-1/2 text-[11px] text-mn-text-secondary"
          style={{ left: `${currentPosition}%` }}
        >
          Current
        </div>
        <div
          className="absolute top-6 -translate-x-1/2 text-[11px] text-mn-text-secondary"
          style={{ left: `${targetPosition}%` }}
        >
          Target
        </div>
      </div>
      <p className="mt-5 text-[12.5px] leading-relaxed text-mn-text-dim">
        {goal.note}
      </p>
    </div>
  );
};

const MinimalHealth = () => {
  const [selectedMetric, setSelectedMetric] = useState(metricOptions[0]);
  const [selectedDay, setSelectedDay] = useState(healthProfile.training.week[0]);

  return (
    <div className="minimal-page">
      <MnPageHeader
        kicker="Health"
        title={healthProfile.headline}
        subtitle={healthProfile.summary}
        rotatorPrefix={healthProfile.rotatorPrefix}
        rotatorWords={healthProfile.rotatorWords}
      >
        <div className="mt-7 grid gap-0 border-y border-mn-divider md:grid-cols-3">
          {healthProfile.heroMeta.map((item) => (
            <div
              key={item.label}
              className="border-b border-mn-divider py-4 last:border-b-0 md:border-b-0 md:border-r md:px-4 md:first:pl-0 md:last:border-r-0"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mn-text-dim">
                {item.label}
              </div>
              <div className="mt-1 text-[14px] font-medium text-mn-text-primary">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </MnPageHeader>

      <MnSeparator className="bg-transparent" />

      <Section title="Current State">
        <div className="grid grid-cols-2 border-y border-mn-divider md:grid-cols-3">
          {healthProfile.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-b border-r border-mn-divider p-4 even:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mn-text-dim">
                {metric.label}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5 text-mn-text-primary">
                <span className="text-[24px] font-semibold leading-none">
                  {metric.value}
                </span>
                <span className="text-[12px] text-mn-text-secondary">
                  {metric.unit}
                </span>
              </div>
              <div className="mt-2 text-[12px] text-mn-text-dim">
                {metric.note}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] text-mn-text-dim">
          Last updated <CurrentMonth />
        </p>
      </Section>

      <MnSeparator className="bg-transparent" />

      <Section title="The Journey">
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-mn-divider md:left-0 md:right-0 md:top-[5px] md:bottom-auto md:h-px md:w-auto" />
          {healthProfile.journey.map((item) => (
            <article key={item.title} className="relative pl-7 md:pl-0 md:pt-8">
              <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-mn-accent bg-mn-bg md:top-0" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mn-accent-text">
                {item.isCurrent ? <CurrentMonth /> : item.date}
              </div>
              <h3 className="mt-2 text-[15px] font-semibold leading-snug text-mn-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mn-text-secondary">
                {item.description}
              </p>
              {item.metric && (
                <div className="mt-3 w-fit rounded-[6px] border border-mn-accent-border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-mn-accent-text">
                  {item.metric}
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      <MnSeparator className="bg-transparent" />

      <Section title="Daily Routine">
        <div className="relative flex flex-col gap-0">
          <div
            className="absolute bottom-5 top-5 w-px bg-mn-divider"
            style={{ left: "55.5px" }}
          />
          {healthProfile.routine.map((item) => (
            <div
              key={`${item.time}-${item.title}`}
              className="grid grid-cols-[44px_24px_1fr] py-4"
            >
              <div className="pt-[2px] text-right text-[11.5px] font-medium leading-snug tabular-nums text-mn-text-dim">
                {item.time}
              </div>
              <div className="relative flex justify-center pt-[5px]">
                <span className="relative z-10 h-2.5 w-2.5 rounded-full border border-mn-accent bg-mn-bg" />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-mn-text-primary">
                  {item.title}
                </div>
                <p className="mt-1 text-[13.5px] leading-relaxed text-mn-text-secondary">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <MnSeparator className="bg-transparent" />

      <Section title="Nutrition">
        <p className="mb-5 text-[15px] leading-[1.75] text-mn-text-secondary">
          {healthProfile.nutritionIntro}
        </p>
        <div className="flex flex-col border-y border-mn-divider">
          {healthProfile.nutrition.map((meal) => (
            <article
              key={meal.meal}
              className="grid gap-4 border-b border-mn-divider py-5 last:border-b-0 md:grid-cols-[140px_1fr]"
            >
              <div>
                <div className="flex items-center gap-2 text-[12px] font-medium tabular-nums text-mn-text-dim">
                  <Coffee size={14} strokeWidth={2} />
                  {meal.time}
                </div>
                <h3 className="mt-2 text-[15px] font-semibold text-mn-text-primary">
                  {meal.meal}
                </h3>
              </div>
              <div>
                <p className="text-[13.5px] leading-relaxed text-mn-text-secondary">
                  {meal.purpose}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {meal.foods.map((food) => (
                    <span
                      key={food}
                      className="rounded-[6px] border border-mn-divider bg-mn-btn-bg px-2.5 py-1.5 text-[12.5px] text-mn-text-primary"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <MnSeparator className="bg-transparent" />

      <Section title="Training">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div>
            <StatRow label="Training time" value={healthProfile.training.time} />
            <StatRow label="Frequency" value={healthProfile.training.frequency} />
            <StatRow label="Focus" value={healthProfile.training.focus} />
            <StatRow label="Current split" value={healthProfile.training.split} />
          </div>
          <div>
            <div className="grid grid-cols-7 gap-2">
              {healthProfile.training.week.map((day) => {
                const isSelected = selectedDay.day === day.day;
                const isTraining = day.status === "train";

                return (
                  <button
                    key={day.day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`flex aspect-square flex-col items-center justify-center rounded-[8px] border text-[12px] font-semibold transition-colors ${
                      isSelected
                        ? "border-mn-accent text-mn-accent-text"
                        : "border-mn-divider text-mn-text-secondary hover:border-mn-accent-border"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span>{day.day}</span>
                    <span className="mt-2 text-[18px] leading-none">
                      {isTraining ? "-" : "."}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-[8px] border border-mn-divider bg-mn-btn-bg p-4">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-mn-text-dim">
                <Activity size={14} strokeWidth={2} />
                {selectedDay.day}
              </div>
              <div className="mt-2 text-[16px] font-semibold text-mn-text-primary">
                {selectedDay.workout}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <MnSeparator className="bg-transparent" />

      <Section title="Progress">
        <div className="mb-4 flex flex-wrap gap-2">
          {metricOptions.map((metric) => (
            <button
              key={metric.key}
              type="button"
              onClick={() => setSelectedMetric(metric)}
              className={`rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition-colors ${
                selectedMetric.key === metric.key
                  ? "border-mn-accent bg-mn-accent-subtle text-mn-accent-text"
                  : "border-mn-divider text-mn-text-secondary hover:border-mn-accent-border"
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
        <HealthChart
          data={healthProfile.progress.series}
          metric={selectedMetric}
        />
        <div className="mt-5">
          <GoalAxis goal={healthProfile.progress.goal} />
        </div>
      </Section>

      <MnSeparator className="bg-transparent" />

      <Section title="Principles">
        <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          {healthProfile.principles.map((principle) => (
            <article key={principle.title}>
              <h3 className="text-[15px] font-semibold text-mn-text-primary">
                {principle.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mn-text-secondary">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <MnSeparator className="bg-transparent" />

      <Section title="Journal">
        <div className="flex flex-col border-y border-mn-divider">
          {healthProfile.journal.map((entry) => (
            <article
              key={entry.title}
              className="grid gap-3 border-b border-mn-divider py-5 last:border-b-0 md:grid-cols-[120px_1fr]"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mn-accent-text">
                {entry.date}
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-mn-text-primary">
                  {entry.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mn-text-secondary">
                  {entry.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <MinimalFooter />
    </div>
  );
};

export default MinimalHealth;
