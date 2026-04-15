## Keyboard Users Exist. Here's How I Stopped Ignoring Them in Popups.

Accessibility tends to get treated as an afterthought, or worse, a checkbox. I was guilty of this too. Until someone ran a screen reader through a feature I'd built and nothing made sense. Popups opened, focus stayed on the button that triggered them, and the screen reader just... kept reading whatever was behind the popup.

The fix isn't complicated, but it's easy to miss if you're not thinking about it.

### What's the actual problem?

When a user clicks a button and a popup opens, their keyboard focus stays on the button. For mouse users, that's fine. They can see the popup and click into it. But for keyboard-only users or screen reader users, the popup might as well not exist. They press Tab and end up navigating through whatever's *behind* the popup instead of inside it.

The fix: when the popup opens, move focus *into* it programmatically.

### The setup

I was using Semantic UI's `Popup` component, but the approach works with any popup library. The key pieces are:

1. A `ref` on the popup content so we can call `.focus()` on it
2. A `useEffect` that watches when the popup opens and fires the focus

```jsx
import React, { useState, useEffect, useRef } from "react";
import { Button, Popup } from "semantic-ui-react";

const MyComponent = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (openPopup && popupRef.current) {
      // Small timeout needed: the popup needs one tick to render into the DOM
      setTimeout(() => popupRef.current?.focus(), 0);
    }
  }, [openPopup]);

  return (
    <Popup
      trigger={<Button onClick={() => setOpenPopup(true)}>Open</Button>}
      content={
        <Popup.Content tabIndex="0" ref={popupRef}>
          Popup Content
        </Popup.Content>
      }
      on="click"
      open={openPopup}
      onClose={() => setOpenPopup(false)}
    />
  );
};
```

Two things worth calling out:

**`tabIndex="0"`** on the popup content is required. By default, `div`s and most non-interactive elements can't receive focus. Setting `tabIndex="0"` makes it focusable without putting it in the tab order.

**The `setTimeout`** is a bit of a hack, but a necessary one. When the popup opens, it hasn't necessarily rendered into the DOM yet by the time the `useEffect` runs. One tick of delay gives React time to commit the update.

### What about closing the popup?

Equally important: when the popup closes, focus should return to the element that triggered it. Otherwise the user's focus disappears into the void.

```jsx
const triggerRef = useRef(null);

const handleClose = () => {
  setOpenPopup(false);
  triggerRef.current?.focus();
};

// On the trigger button:
<Button ref={triggerRef} onClick={() => setOpenPopup(true)}>Open</Button>
```

This is the full loop: focus moves in when the popup opens, and returns to the trigger when it closes. Without the return, keyboard users are left stranded after dismissing the popup.

### Is this just good practice or actually required?

Technically, for WCAG 2.1 compliance (specifically [Success Criterion 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)), focus management in modal dialogs and popups is expected. If your product serves any enterprise or government clients, or if you care about not excluding a chunk of your users, this matters.

And honestly, it's not much code. There's no good reason to skip it.
