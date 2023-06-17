## Securely Transmit Data in Unexpected Situations using React and Window events

Sending data to the Server when the User navigates away, closes or reloads the browser tab.

### Introduction

As web developers, we often encounter scenarios where we need to send data to a server when a user performs specific actions, such as closing the tab, reloading the page, or navigating to another route. In this blog post, we'll learn how to achieve this efficiently using ReactJS, window events, and the Beacon API. By implementing this approach, you can ensure that critical data is securely transmitted even in unexpected situations.

#### Understanding Window Events

Let's briefly discuss the window events that we'll be utilizing:

1. `beforeunload` : This event is triggered just before the user leaves the page, either by closing the tab or navigating to another URL. It provides an opportunity to execute some code before the page unloads.

2. `unload` : This event is fired when the page unloads. It allows us to perform final actions before the user leaves the page completely.

Let's dive into the implementation

#### Step 1: Setting up a React Application

Assuming you have a basic understanding of ReactJS, create a new React application using a boilerplate such as Create React App. You can set up a new project by executing the following command in your terminal:

```
npx create-react-app data-sending-app
cd data-sending-app
```

#### Step 2: Creating Event Handlers

In your React component, create the necessary event handlers for `beforeunload` and `unload` events. These handlers will be responsible for sending the data to the server:

```jsx
import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      sendDataToServer();
    };

    const handleUnload = () => {
      sendDataToServer();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  const sendDataToServer = () => {
    // Perform necessary data processing and send data to the server
    navigator.sendBeacon('/api/endpoint', JSON.stringify(data));
  };

  return <div>Your component content goes here</div>;
};

export default MyComponent;
```

#### Step 3: Utilizing the Beacon API

To send data reliably to the server, we'll use the Beacon API's `sendBeacon()` method. This method creates an asynchronous and reliable HTTP request in the background without delaying the page unload or affecting the user experience.

In the `sendDataToServer()` function above, we use `navigator.sendBeacon()` to send the data to the server. You can replace `/api/endpoint` with the appropriate server endpoint URL, and `data` with the actual data you want to transmit.

#### Step 4: Cleaning Up Event Listeners

To ensure proper memory management and prevent memory leaks, it's crucial to remove the event listeners when the component unmounts. We achieve this by returning a cleanup function from the `useEffect()` hook.

### Conclusion

In this blog post, we explored how to send data to a server when a user closes the tab, reloads the page, or navigates to another route in a ReactJS application. By leveraging window events such as `beforeunload` and `unload`, along with the `Beacon` API, we can reliably transmit important data to the server, even in unexpected scenarios.

Remember, handling user actions like closing the tab or reloading the page can be sensitive, so make sure to handle and process data securely on the server side. With these techniques, you can enhance your application's functionality and provide a smoother experience for your users.

Now you're equipped with the knowledge to handle critical data transmission effectively. Happy coding!