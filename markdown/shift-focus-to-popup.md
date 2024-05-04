## Enhancing Accessibility: Shifting Focus from an Element to Popup in React

### Introduction:

In the realm of web development, ensuring accessibility is not just a courtesy but a responsibility. As developers, it's crucial to make our web applications usable for everyone, regardless of their abilities. One common accessibility challenge arises when dealing with popups or modal dialogs. How can we ensure that when a popup opens, the focus shifts appropriately for users relying on keyboard navigation or assistive technologies? In this blog post, we'll explore how to tackle this challenge specifically in a React application, leveraging Semantic UI for the popup component.

#### **Understanding the Challenge**

Imagine a scenario where we have a button triggering a popup in our React application. When a user clicks this button, not only should the popup open, but the focus should also shift to the content inside the popup. This is crucial for users navigating the application using only the keyboard or assistive technologies like screen readers.

#### **Setting Up the Environment**

For the sake of this blog, let's assume we have a React application set up and we're using Semantic UI for styling, including its popup component.

#### **Solution: Shifting Focus to the Popup**

To achieve the desired behavior, we'll employ a combination of React hooks and DOM manipulation.

**1. Ref for Popup**: First, we need to create a state for the popup to open and a ref for the popup element so that we can programmatically manipulate it. In our React component file:

```jsx
import React, { useState, useRef } from "react";
import { Button, Popup } from "semantic-ui-react";

const MyComponent = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const popupRef = useRef(null);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Popup
        trigger={<Button onClick={handleOpenPopup}>Open Popup</Button>}
        content={
          <Popup.Content style={{ marginTop: 10 }} tabIndex="0" ref={popupRef}>
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                padding: 5,
                borderRadius: 5,
              }}
            >
              Popup Content
            </div>
          </Popup.Content>
        }
        on="click"
        position="bottom center"
        open={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </div>
  );
};

export default MyComponent;
```

**2. Focus Shifting**: Now, we'll ensure that when the popup opens, the focus shifts to it. We'll use `useEffect` to monitor changes in the popup's visibility and focus accordingly.

```jsx
import React, { useState, useEffect, useRef } from "react";
import { Button, Popup } from "semantic-ui-react";

const MyComponent = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const popupRef = useRef(null);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  useEffect(() => {
    const handlePopupVisibility = () => {
      if (openPopup && popupRef.current) {
        popupRef.current.focus();
      }
    };

    if (openPopup) {
      document.addEventListener("click", handlePopupVisibility);
    } else {
      document.removeEventListener("click", handlePopupVisibility);
    }

    return () => {
      document.removeEventListener("click", handlePopupVisibility);
    };
  }, [openPopup]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Popup
        trigger={<Button onClick={handleOpenPopup}>Open Popup</Button>}
        content={
          <Popup.Content style={{ marginTop: 10 }} tabIndex="0" ref={popupRef}>
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                padding: 5,
                borderRadius: 5,
              }}
            >
              Popup Content
            </div>
          </Popup.Content>
        }
        on="click"
        position="bottom center"
        open={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </div>
  );
};

export default MyComponent;
```

#### **Conclusion**

In this blog post, we've addressed the accessibility challenge of shifting focus from an element to a popup in a React application. By using React hooks, we ensure that users navigating our application with keyboards or assistive technologies have a seamless experience when interacting with popups. Remember, accessibility isn't just a feature; it's a fundamental aspect of building inclusive web applications. Let's continue to prioritize it in our development workflows.
