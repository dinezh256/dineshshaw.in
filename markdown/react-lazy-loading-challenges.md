## Lazy Loading in React Isn't Magic: Here's What Nobody Warns You About

I used to think lazy loading was a silver bullet. Wrap your component in `React.lazy()`, throw a `Suspense` boundary around it, done. Ship it.

Then I started actually using it in production and ran into a few things that made me go *"huh, why didn't anyone mention this?"*

### The complexity sneaks up on you

On the surface, lazy loading looks dead simple:

```js
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

But once you start applying it across a real app, especially with nested routes, protected routes, and shared dependencies, the mental overhead adds up fast. You're no longer just thinking about *what* renders, but *when* stuff loads, *what* gets bundled together, and *why* that one page is flickering on first load.

It's not hard, but it's not free either. Entry-level devs will struggle with it without some guidance.

### Route-based splitting is great until it isn't

Most React tutorials pair lazy loading with `React Router` and call it a day. And yes, splitting at the route level is usually the right default. But I've run into edge cases:

- **Nested routes** where a parent and child share a big dependency. Split them naively and you end up loading that dependency twice in separate chunks.
- **Protected routes** where you need to check auth state before the component even tries to load. If you're not careful, users see a flash of the wrong thing.
- **Pre-fetching**: nobody talks about this enough. If a user hovers over a link, that's a good signal to start loading the chunk. There are libraries for this, but it's extra work.

The fix for most of this? Add a skeleton UI as your `Suspense` fallback instead of a spinner, and keep the navbar outside your lazy boundaries. That alone eliminates 80% of the jank.

### Chunk granularity is harder than it sounds

Splitting too much is a real problem. I had a project where a junior dev lazy-loaded basically every component, resulting in 40+ tiny chunks on a single page load. The network waterfall was a disaster. Each chunk was small, but the sheer number of requests killed performance.

The other extreme, one giant lazy chunk for a whole section of the app, defeats the purpose.

A rough rule I follow: lazy-load at the **route level** by default. Only go deeper if you have a component that's genuinely large, rarely seen (like a rich text editor or a PDF viewer), and measurably hurts your initial load.

### Async loading means you need to handle the "in-between" state properly

This is the one spot where I see the most lazy-loading bugs. When a chunk is loading, React suspends the component tree up to the nearest `Suspense` boundary. If you don't place that boundary thoughtfully, you get really ugly loading states, like your entire page disappearing and being replaced by a spinner.

Think about *where* you put your `Suspense` boundaries as much as *what* you lazy-load.

### Final thoughts

Lazy loading is worth it. I'm not trying to scare you off. It meaningfully reduces initial bundle size and speeds up time-to-interactive. But go in with eyes open. Profile first with Lighthouse or Chrome's coverage tool to find the real bloat, then split deliberately. Don't just sprinkle `React.lazy()` everywhere and hope for the best.
