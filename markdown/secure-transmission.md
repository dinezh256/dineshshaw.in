## Don't Let the Tab Close Before Your Data Gets Out

Here's a fun scenario: user fills out a long form, gets distracted, closes the tab. Your backend never sees a thing. Depending on your app, that's anywhere from mildly annoying to a serious data integrity problem.

I hit this while working on a feature that tracked time spent on a page, the kind of thing that needed to fire *right as the user leaves*, not on some timer. The usual approaches didn't cut it.

### The naive approach and why it fails

My first instinct was to just use `fetch` inside a `beforeunload` listener:

```js
window.addEventListener('beforeunload', () => {
  fetch('/api/track', { method: 'POST', body: JSON.stringify(data) });
});
```

This doesn't work reliably. The browser doesn't wait for async operations during page unload, so the request gets cancelled before it can complete. You might get lucky sometimes, but you can't count on it.

### Enter the Beacon API

The `navigator.sendBeacon()` API exists exactly for this use case. It sends a small HTTP POST in the background, and crucially, the browser *guarantees* it'll be dispatched even as the page is tearing down. No waiting, no blocking.

```js
navigator.sendBeacon('/api/track', JSON.stringify(data));
```

That's it. The browser handles the rest. It's non-blocking, doesn't delay the page closing, and is supported in all modern browsers.

### Wiring it up in React

Here's how I set it up inside a component using `useEffect`:

```jsx
import { useEffect } from 'react';

const useBeaconOnLeave = (data) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon('/api/track', JSON.stringify(data));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data]);
};
```

Wrap it in a custom hook, pass in whatever data you want to track, and you're done. The cleanup in the return is important. If the component unmounts for any other reason (navigation within the SPA, for example), you don't want a stale listener hanging around.

### A few things to keep in mind

**The payload has a size limit.** `sendBeacon` isn't meant for large data. Keep it to small JSON objects: session data, analytics events, that kind of thing. Don't try to dump your app state through it.

**It only fires on true page unload.** Route changes inside a React app don't trigger `beforeunload`, since those are handled by React Router, not the browser. If you need to track in-app navigation, you'll want to hook into your router's `history` instead.

**The server still needs to be secure.** Just because the client is sending data doesn't mean you trust it blindly. Validate, authenticate, and sanitize on the server side like you would any other request.

### When should you actually use this?

Honestly, not often. Most apps don't need it. But if you're doing any of these, it's worth knowing about:

- Analytics or engagement tracking (time on page, scroll depth)
- Auto-saving draft state
- Logging session end events
- Any "last action before they leave" kind of feature

It's a narrow use case, but when you need it, you *really* need it. And now you know the right tool for the job.