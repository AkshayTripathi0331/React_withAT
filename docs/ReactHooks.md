# React Hooks - React Context with useContext

React Context allows you to share values like themes or authentication status throughout the component tree without passing props manually. Using the useContext hook simplifies accessing these context values.

React provides both built-in hooks and allows developers to create custom hooks. Let's explore the key differences between built-in hooks and custom hooks:

<img title="types of hooks" alt="Types of hooks" src="/assets/types_of_Hooks_in_React.png">

## Built-in Hooks:

1. **Predefined Functionality:**
   - Built-in hooks are React-provided functions that serve specific purposes, such as managing state, effects, context, and more.
   - Examples of built-in hooks include `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, and `useCallback`.

2. **React Core Features:**
   - Built-in hooks are essential for working with core features of React, such as managing component state and lifecycle, handling side effects, and consuming context.

3. **Implemented by React Team:**
   - These hooks are implemented and maintained by the React team, ensuring their correctness, efficiency, and compatibility with React updates.

4. **Widely Adopted:**
   - Built-in hooks are widely adopted and used across the React community. They form the foundation for building React applications.

## Custom Hooks:

1. **User-Defined Functionality:**
   - Custom hooks are functions created by developers to encapsulate and reuse logic in a modular way. They are not provided by React but are implemented by developers themselves.

2. **Abstraction of Logic:**
   - Custom hooks allow developers to abstract and encapsulate complex logic, making it easier to reuse across different components or projects.

3. **Reusability:**
   - Custom hooks promote code reusability. Once a custom hook is defined, it can be used in multiple components, promoting a more modular and maintainable codebase.

4. **Naming Convention:**
   - Custom hooks typically follow a naming convention with the `use` prefix, e.g., `useCustomHook`. This convention helps distinguish them from regular functions and indicates their intended use as hooks.

5. **Examples:**
   - Examples of custom hooks could include a `useLocalStorage` hook for handling local storage operations, a `useForm` hook for managing form state and validation, or a `useApi` hook for handling API requests.

## Commonality:

1. **Access to Built-in Hooks:**
   - Custom hooks can make use of built-in hooks. They can include calls to `useState`, `useEffect`, and other React hooks within their implementation.

2. **Hook Lifecycle:**
   - Both built-in and custom hooks follow the same lifecycle rules, adhering to the rules of hooks, such as being called only from the top-level of a function component or another custom hook.

3. **Encapsulation:**
   - Both built-in and custom hooks enable encapsulation of logic, promoting a cleaner separation of concerns and modular code structure.

In summary, while built-in hooks are essential for core React functionalities, custom hooks empower developers to create reusable, modular, and abstracted pieces of logic tailored to specific project requirements. Combining both types of hooks allows for the development of scalable and maintainable React applications.

## 1. useContext

React Context allows you to share values like themes or authentication status throughout the component tree without passing props manually. Using the `useContext` hook simplifies accessing these context values.

### Example:

```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return <div style={{ color: theme === 'dark' ? 'white' : 'black' }}>Themed Content</div>;
};

const ThemeToggle = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))}>
      Toggle Theme
    </button>
  );
};

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemedComponent />
      <ThemeToggle />
    </ThemeContext.Provider>
  );
};
```

# 2 useState

The `useState` hook is a fundamental building block for managing state in functional components. It allows you to declare state variables and provides a way to update them, triggering a re-render of the component.

## Example:

```jsx
import React, { useState } from 'react';

const CounterWithState = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};
```

In this example, `useState` is used to create a `count` state variable initialized with the value `0`. The `setCount` function is then used to update the `count` state based on the current state. This simple counter component showcases the basic usage of `useState` for managing state in React.

# 3. useEffect

The `useEffect` hook is employed for handling side effects in functional components. It enables you to perform actions after the component has been rendered, like fetching data, subscribing to external events, or cleaning up resources.

## Example:

```jsx
import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating a data fetch from an API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup, unsubscribe, or clear resources
    };
  }, []); // Empty dependency array means the effect runs once after the initial render

  return (
    <div>
      <h2>Data Fetching Example</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

In this example, the `useEffect` hook is utilized to simulate data fetching. The effect runs after the initial render due to the empty dependency array (`[]`). The cleanup function, returned from `useEffect`, is optional but can be used to perform cleanup actions when the component unmounts or when the dependencies change.

These additional React hooks, `useState` and `useEffect`, broaden your toolkit for managing state and handling side effects in functional components. Feel free to explore and incorporate these examples into your React learning materials.


# 4. useReducer

The useReducer hook is an alternative to useState for managing complex state logic. It's particularly useful when the next state depends on the previous one.

## Example:

```jsx
import React, { useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};
```

In this example, we have a simple counter application using `useReducer`. The `Counter` component initializes the state with `{ count: 0 }` and provides a `dispatch` function to update the state based on the specified actions.

These additional concepts provide more depth in state management and component communication in React. Feel free to incorporate these examples into your React learning repository and provide additional explanations or use cases based on the needs of your learners.
```

# 5. useMemo

The `useMemo` hook is useful for memoizing expensive calculations or computations, preventing unnecessary recalculations on each render. It takes a function and an array of dependencies, and it only recomputes the memoized value when the dependencies change.

## Example:

```jsx
import React, { useState, useMemo } from 'react';

const FibonacciCalculator = ({ n }) => {
  const calculateFibonacci = (num) => {
    if (num <= 1) return num;
    return calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
  };

  const memoizedResult = useMemo(() => calculateFibonacci(n), [n]);

  return (
    <div>
      <p>Fibonacci of {n} is: {memoizedResult}</p>
    </div>
  );
};
```

In this example, `useMemo` is employed to memoize the result of the Fibonacci calculation based on the input `n`. The expensive calculation is only performed when `n` changes, optimizing the component's performance by avoiding unnecessary recalculations.

# 6. useCallback

The `useCallback` hook is beneficial for memoizing callback functions, especially in scenarios where callback dependencies might cause unnecessary re-renders. It returns a memoized version of the callback that only changes if one of the dependencies has changed.

## Example:

```jsx
import React, { useState, useCallback } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  // Memoized callback using useCallback
  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Click Count: {count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
```

In this example, `useCallback` is used to memoize the `handleClick` callback. By providing an empty dependency array (`[]`), we ensure that the callback doesn't change between renders, preventing unnecessary re-renders of child components that may rely on this callback.

These additional React hooks, `useMemo` and `useCallback`, enhance the performance and optimization capabilities of your functional components. Feel free to integrate these examples into your React learning materials as needed.

# 7. useImperativeHandle

The `useImperativeHandle` hook is used to customize the instance value that is exposed when using `React.forwardRef`. It allows you to define which values or functions should be exposed on the ref object that is passed to the parent component.

## Example:

```jsx
import React, { useRef, useImperativeHandle } from 'react';

const CustomInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    reset: () => {
      inputRef.current.value = '';
    },
  }), []);

  return <input ref={inputRef} />;
});

// Parent component
const ParentComponent = () => {
  const customInputRef = useRef();

  const handleFocusClick = () => {
    customInputRef.current.focus();
  };

  const handleResetClick = () => {
    customInputRef.current.reset();
  };

  return (
    <div>
      <CustomInput ref={customInputRef} />
      <button onClick={handleFocusClick}>Focus Input</button>
      <button onClick={handleResetClick}>Reset Input</button>
    </div>
  );
};
```

In this example, the `useImperativeHandle` hook is utilized within a custom input component to expose specific functions (`focus` and `reset`) through the ref. The parent component can then access and invoke these functions to interact with the child component.

# 8. useDebugValue

The `useDebugValue` hook is used to display custom labels for custom hooks in React DevTools. It helps in providing additional information about the custom hook's state or behavior.

## Example:

```jsx
import { useState, useDebugValue } from 'react';

const useCounter = (initialCount) => {
  const [count, setCount] = useState(initialCount);

  // Display custom label in React DevTools
  useDebugValue(`Counter: ${count}`);

  return {
    count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
  };
};

// Using the custom hook in a component
const CounterComponent = () => {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

In this example, `useDebugValue` is used to provide a custom label for the custom hook `useCounter`. This label is then displayed in React DevTools, providing developers with additional information about the hook's state.

# 9. useRef and useLayoutEffect

The `useRef` hook is used to create mutable object references that persist across renders. It is often used to access or store values that don't trigger re-renders.

The `useLayoutEffect` hook is similar to `useEffect`, but it runs synchronously after all DOM mutations. It is useful for scenarios where you need to read layout from the DOM and make DOM mutations immediately after.

## Example:

```jsx
import React, { useRef, useLayoutEffect } from 'react';

const ResizeAwareComponent = () => {
  const containerRef = useRef();

  useLayoutEffect(() => {
    const handleResize = () => {
      // Access layout information and perform DOM mutations
      console.log('Container width:', containerRef.current.clientWidth);
    };

    // Attach resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      // Remove the event listener on component unmount
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return <div ref={containerRef}>Resizable Container</div>;
};
```

In this example, `useRef` is used to create a reference to a DOM element (`containerRef`). The `useLayoutEffect` hook is then employed to add a resize event listener and perform layout-related actions when the component mounts. The cleanup function ensures that the event listener is removed when the component unmounts.

Feel free to incorporate these examples into your React learning materials to cover a wide range of hooks and their applications.

## Custum Hooks

Custom hooks are functions that encapsulate reusable logic in React components. They are an excellent way to abstract complex logic, making it shareable across different components. Custom hooks follow the naming convention of starting with "use" to signify their association with React hooks.

Here's an example of creating a custom hook:

```jsx
import { useState, useEffect } from 'react';

// Custom hook for fetching data
const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Using the custom hook in a component
const DataFetchingComponent = () => {
  const { data, loading, error } = useFetchData('https://api.example.com/data');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Data Fetching Example</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

In this example, `useFetchData` is a custom hook that encapsulates the logic for fetching data. It returns an object with the fetched data, loading state, and any potential errors. The hook is then used in the `DataFetchingComponent` to simplify the component's code.

Custom hooks can include any combination of existing hooks, state variables, and logic needed for a specific functionality. They provide a clean and modular way to reuse code in your React applications.

Feel free to modify the content as needed for your learning repository!