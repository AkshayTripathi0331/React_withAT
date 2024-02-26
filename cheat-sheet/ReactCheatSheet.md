Certainly! Below is the raw `README.md` converted from the provided React CheatSheet:

---

# React CheatSheet

## Table of Contents
- [Basics](#basics)
- [Initializing new React Project](#initializing-new-react-project)
- [Basics React Component](#basics-react-component)
- [States & Events](#states--events)
- [Handling Events & Forms](#handling-events--forms)
- [useRef - DOM manipulations](#useref---dom-manipulations)

## Basics
React Uses a Component Based Structure to Group and render HTML accordingly.

### Why Components?
- **DRY (Don't Repeat Yourself)** = Reusability
- **Separation of concerns** = Not doing too many things at one place/function

### Basic Folder Structure:
- **src/**: Source folder containing all the basic files
  - **index.js**: The beginning of the page rendering, the first file to execute
  - **index.css**: Can be imported as a normal CSS file in index for global styling
  - **app.js**: Renders basic page content in JSX, is imported in index and rendered in place of root in HTML
  - **components/**: Contains all the JavaScript files of the components to be imported in app.js (capitalized naming). Must have only one root element returned.
- **public/**: Contains the final content to be rendered on the page, not needed to edit

### JSX - JavaScript XML:
- HTML code used in React, converted/transformed into JS code to render HTML structure.
- Single curly braces in JSX can contain JavaScript code `{}`.
- Elements must be wrapped in 1 parent element before returning.
- JSX behind the scenes uses `React.createElement` and other functions to render HTML.

### Initializing new React Project
- You can initialize a project manually by installing React from npm packages.
- Using `create-react-app`: This initializes a basic project with all the required packages already built-in and set up for hot reloading, testing, etc.
  - Can use `npx create-react-app <app-name>` to initialize the first basic project.
- Nowadays, you can also use `vite.js`, which is a better alternative to `create-react-app`.

## Basics React Component
**MyComponent.js**
```jsx
import React from 'react';
import './MyComponent.css';

function MyComponent(props) {
  return (
    <div className="my-component">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

export default MyComponent;
```

**App.js**
```jsx
import React from 'react';
import MyComponent from './MyComponent';

function App() {
  return (
    <div>
      <MyComponent 
        title="My Title" 
        description="This is my description."
      >
        <p>This is some additional content.</p>
      </MyComponent>
    </div>
  );
}

export default App;
```
- Can break down complex groups of JSX into sub-components (Composition). Good practice to keep components smaller.

## States & Events
State is used to store and manage data that can change over time, allowing components to keep track of their own state and update their UI accordingly.
- It's mutable, locally declared (cannot be accessed by other components without passing).
- Updating normal values doesn't rerender the page, so state is used to update the JSX and rerender the data.
- Every state in every component is handled separately and not connected, affecting only its component.

**Counter.js**
```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;
```

## Handling Events & Forms
```jsx
import React, { useState } from "react";

const FormExample = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Submitted Form Data:\nFirst Name: ${formData.firstName}\nEmail: ${formData.email}`
    );
    setFormData({
      firstName: "",
      email: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Form Example</h1>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <br />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormExample;
```

## useRef - DOM manipulations
```jsx
import React, { useRef } from "react";

const MyForm = () => {
  const inputRef = useRef();
  const countRef = useRef(0);

  const handleButtonClick = () => {
    console.log("Input value:", inputRef.current.value);
    inputRef.current.focus();
    inputRef.current.select();
    countRef.current++;
    console.log("Current count:", countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleButtonClick}>Get Input Value, Focus Input, Increment Count</button>
    </div>
  );
};

export default MyForm;
```
Certainly! Continuing with the React CheatSheet:

---

## Difference in `useRef` and `useState`
- `useState` can be used to store and update form data as the user types or selects options when both storage and update are needed.
- `useRef` can be used to get references to input fields, allowing direct access to their values or triggering their methods when the data is not needed to be stored, and you don't want to rerender the component.

## Saving Multiple Data - Object State
We have 2 options:
1. Use 3 states to save different values.
2. Have just one state with an object containing all 3 values.

```jsx
// Single states for name, age, and email = Multi State
const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [email, setEmail] = useState('');

// Object state for user = One State
const [user, setUser] = useState({
  name: '',
  age: 0,
  email: ''
});

// Event handler for updating name
const handleNameChange = (event) => {
  setName(event.target.value);
};

// Event handler for updating user object
const handleUserChange = (event) => {
  // Updating the object replaces it as a whole, so we have to use the old object using the spread operator
  setUser({
    ...user,
    [event.target.name]: event.target.value
  });

  // The issue here is using the old state. In case it is being updated at the same time, we might get the wrong value for oldState because of scheduling
  setUser((prevState) => ({
    ...prevState,
    [event.target.name]: event.target.value
  }));
  // We solve the above issue by using the function variation of setState which provides the UPDATED old value and will never be wrong. Especially helpful when running asynchronously
};
```

You can also update array data in the same way using spread and passing old value:
```jsx
setItems(prevItems => [...prevItems, newItem]);
```

## Passing Data - Child & Parent
```jsx
import React, { useState } from 'react';

// Child Component
const ChildComponent = ({ childData, onChildDataChange }) => {
  const handleInputChange = (event) => {
    const newChildData = event.target.value;
    onChildDataChange(newChildData); // Data is saved in parent onChange
    // A child component can also receive functions from the parent component, this can be used to send data to parents
    // This concept is LIFTING STATE UP
  };

  return (
    <div>
      <h2>Child Component</h2>
      <input type="text" value={childData} onChange={handleInputChange} />
      <p>Child Data: {childData}</p>
    </div>
  );
};

// Parent Component
const ParentComponent = () => {
  const [parentData, setParentData] = useState('Hello from parent!');

  const handleChildDataChange = (newChildData) => {
    setParentData(newChildData);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Parent Data: {parentData}</p>
      <ChildComponent childData={parentData} onChildDataChange={handleChildDataChange} />
      {/* Here, the parent is sending the data and a function to update data to the child */}
      {/* Passing data to the child, this concept is PASSING STATE DATA */}
    </div>
  );
};

export default ParentComponent;
```

## Extras

### Types of React Components
1. **Stateless/Presentational/Dumb/Pure Components:**
   - Pure components always produce the same output for the same input props and do not have any side effects.
   - Primarily used for rendering UI elements and do not contain any logic or state management.

2. **Stateful/Container/Smart/Impure Components:**
   - Impure components may produce different output for the same input props or have side effects.
   - Typically used for managing state, handling complex logic, making API calls, or interacting with the DOM.

3. **Higher Order Components (HOCs):**
   - Functions that take a component as input and return a new component with additional props or behavior.
   - Used for reusing component logic, such as handling authentication, handling data fetching, or providing common functionality to multiple components.

4. **Controlled Component:**
   - A component connected to a state for managing data, allowing Two Way Binding where we both use and update its data programmatically.

### Rendering Lists and Conditional Content
**MyComponent.js - Rendering Lists**
```jsx
import React from 'react';
import DataItem from './DataItem'; // Import the child component

const MyComponent = ({ data }) => {
  // Here, data provides us with an array of objects of data that we want to render

  const renderDataItems = () => {
    // JSX can automatically render elements of arrays as HTML elements, we can directly return from map.
    return data.map(item => (
      // Specify a unique key for every component is crucial to help React identify items individually, and not update all the items when asked to. This prevents performance issues and unwanted bugs.
      <DataItem key={item.id} item={item} /> 
      // Render the DataItem child component with props, doing this helps to breakdown the logic and make it easily changeable and reusable.
      // We should never use index as the key as it becomes inconsistent when data is changed.
    ));
  };

  return (
    <div>
      <h1>My Data Items:</h1>
      {renderDataItems()} {/* We use a function to return the list of items we want to render */}
      {/* Call the renderDataItems function to render the data items and not directly map here for clean code */}
    </div>
  );
};

export default MyComponent;
```

**DataItem.js - Rendering Content Conditionally**
```jsx
import React from 'react';

const DataItem = ({ item }) => {
  return (
    <div>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      {item.age && <p>Age: {item.age}</p>}
      {/* && operator allows Conditionally rendering age only if it exists, else, it's false and doesn't render */}
      {item.gender ? <p>Gender: {item.gender}</p> : null}
      {/* We can also use the Ternary operator, but in most cases, && does the work*/}
    </div>
  );
};

export default DataItem;
```

### More About Forms

#### Form Validation - It Can be Done in 3 Ways
1. On Every Keystroke/Value Changes - Issues warnings even before typing is completed.
2. When Input Loses Focus - Issues only happen if the user misclicks and loses focus; he gets an error.
3. When the form is submitted - Allows the user to enter all data, but the error feedback is too late.

We can use the specific way to validate the form according to our needs. For example, every keystroke for the longest form or on submit for medium forms. Can be as per requirements.

```jsx
import React, { useState } from 'react

';

const FormValidationComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!isValidEmail(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission and additional validation if needed
  };

  const isValidEmail = (email) => {
    // Validate email format, you can use a library or regex for more complex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      <h1>Form Validation Example</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Only Frontend validation is not enough, we should always have Backend validation, as JavaScript validation can be bypassed using the inspector.

// We can use custom hooks to make/validate multiple inputs in a form because using a component the state will be handled individually but making it a hook will allow us to bind the state to the one main form component.

// We can use packages for form handling too like Formik or ReactHookForm
```


## Styling In React

### Inline Styling and Adding Classes Dynamically with Conditionals in JSX

#### Inline Styling
In React, you can apply inline styles using the `style` attribute. The style attribute accepts a JavaScript object where the CSS properties are written in camelCase.

```jsx
const MyComponent = () => {
  const customStyle = {
    color: 'blue',
    fontSize: '18px',
    backgroundColor: 'lightgray'
  };

  return (
    <div style={customStyle}>
      This is a styled component.
    </div>
  );
};
```

#### Adding Classes Dynamically with Conditionals
You can conditionally apply classes in JSX based on certain conditions.

```jsx
const MyComponent = ({ isError }) => {
  const dynamicClass = isError ? 'error' : 'normal';

  return (
    <div className={dynamicClass}>
      {isError ? 'Error Content' : 'Normal Content'}
    </div>
  );
};
```

#### Two Ways to Avoid Global Class Conflicts
When importing CSS files directly, classes can be used in any component. Two ways to avoid this:

1. **Inline Styles:**
   - Add styles to JSX using `style={{}}`. The dashes are removed, and names become camelCase.

2. **Styled Components:**
   - Use tagged template literals to create styled components.
   - Send props to styled components and render CSS dynamically.
   - Media queries can be used in styled components.

### Styled Components
Styled components use tagged template literals and elements as a method to style the element. They return a styled component of the specified element, which you can use in your code.

```jsx
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: ${(props) => (props.isError ? 'red' : 'black')};
  font-size: 18px;
`;

const MyComponent = ({ isError }) => {
  return (
    <StyledDiv isError={isError}>
      {isError ? 'Error Content' : 'Normal Content'}
    </StyledDiv>
  );
};
```

### CSS Modules
CSS modules take the CSS from your CSS classes and make them unique by giving them a new classname.

### Debugging
1. **Using Debugger:**
   - Go to Sources, select the file, and add debugger stops wherever you want to test. This will pause the code, and you can resume it after testing.

2. **React DevTools:**
   - Provides information about the components being used and rendered, including hooks and other info.

### Fragments, Portals, and Refs

#### Fragments
Used for grouping JSX, addressing the limitation of JSX where you can't return more than one root element.

Ways to solve this limitation:
- Wrapping everything in a `div` or other element creates a div soup.
- Wrapping returned components into an array.
- Creating a wrapper component that returns `props.children`.

React Fragments:
```jsx
<>
  <Component1 />
  <Component2 />
</>
```

#### Portals
Portals help to keep the DOM cleaner by reordering elements. They are useful for rendering modals, overlays, or sidedrawers outside of nested components.

Usage:
1. Add elements in `index.html` with an ID where you want to transfer your component.
2. Use `ReactDOM.createPortal(<component with props/>, document.getElementById('yourCustomElementId'))`.

#### Refs
Refs or references allow us to get access to other DOM elements for accessing data.

```jsx
import React, { useRef } from 'react';

const MyForm = () => {
  const inputRef = useRef();

  const handleButtonClick = () => {
    console.log('Input value:', inputRef.current.value);
    inputRef.current.focus();
    inputRef.current.select();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleButtonClick}>Get Input Value, Focus Input</button>
    </div>
  );
};

export default MyForm;
```

Note: Prefer not to use refs to manipulate the DOM; use them to read data and elements of the DOM.

### Side Effects/Hooks, Reducers & Context API

#### `useEffect`
`useEffect` executes a function whenever the specified dependencies change.

```jsx
import React, { useEffect, useState } from 'react';

const ExampleComponent = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Code to run on component mount or when dependencies change
    fetchData();
    return () => {
      // Cleanup function
      // Code to run before the component unmounts or before next useEffect run
    };
  }, [dependencies]);

  const fetchData = () => {
    // Fetch data or perform other side effects
  };

  return (
    <div>
      <p>{data}</p>
    </div>
  );
};
```

`useEffect` without dependencies runs every time the component is rendered.

#### Debouncing
Debouncing ensures that something is not updated again and again but only once when needed.

#### Th

rottling
Throttling controls the rate at which a function is called.

#### Cleanup Function
A cleanup function in `useEffect` runs before the `useEffect` runs after the first time and also runs when the component is unmounted from the DOM. It is useful to clear things/data or timers not used anymore.

#### `useReducer` and Context API
`useReducer` and the Context API are tools for managing state and side effects in a more complex application.

They provide a way to manage state and actions across multiple components efficiently.

```jsx
// Example using useReducer and Context API
// StateContext.js
import { createContext, useReducer } from 'react';

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
```

```jsx
// Example using the StateProvider in App.js
import React from 'react';
import { StateProvider } from './StateContext';
import Counter from './Counter';

const App = () => {
  return (
    <StateProvider>
      <Counter />
    </StateProvider>
  );
};

export default App;
```

```jsx
// Counter.js
import React, { useContext } from 'react';
import { StateContext } from './StateContext';

const Counter = () => {
  const { state, dispatch } = useContext(StateContext);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

These are advanced concepts in React that provide more structure and efficiency in state management for larger applications. They help in managing state in a predictable way and avoid prop drilling.


## `useReducer`

`useReducer` is a React hook that is useful for managing complex state, especially when there are multiple states or when one state depends on another state. It is an alternative to `useState`.

### Usage

```jsx
const [state, dispatch] = useReducer(reducerFn, initialState, initFn);
```

- `state`: The current state value.
- `dispatch`: A function to update the state. It takes an action that the `reducerFn` will evaluate.

- `reducerFn`: The function triggered automatically when `dispatch` is called. It receives the latest state and runs the action, returning the updated state.

- `initFn`: A function whose returned value is set as the initial state.

### Action

An action can be anything like a string or number, but conventionally, it's an object specifying the task type and payload/value.

```jsx
{ type: 'SAVE_VALUE', val: VALUE }
```

### `useEffect` & `useReducer`

Object destructuring can be used to get specific values from reducers and watch them in `useEffect` without the need to watch the whole reducer in the `useEffect`.

### `useState` vs `useReducer`

- `useState`: Suitable for basic data management, for independent pieces of data, and short data.
- `useReducer`: Useful for more powerful state management, especially for arrays and objects updates. It ensures that you're using the latest state, especially when multiple states are related or different actions are involved.

## Context API

Context in React is a behind-the-scenes, disconnected singular state storage for all components. It allows sharing data between components at any level.

### Implementation

1. Create a new folder named `store` in `src`.

2. Create two files:

   - `name-context.js`:

     ```jsx
     import React from "react";

     const nameContext = React.createContext({
       arr: [],
       amount: 0,
       addItem: (item) => {},
       removeItem: (id) => {},
       clearAll: () => {},
     });

     export default nameContext;
     ```

   - `name-reducer.js`:

     ```jsx
     import { useReducer } from "react";
     import NameContext from "./name-context";

     const defaultNameState = {
       arr: [],
       amount: 0,
     };

     const nameReducer = (state, action) => {
       // Handle different actions here
       return defaultNameState; // Return default value if action is not specified
     };

     const NameProvider = (props) => {
       const [nameState, dispatchNameAction] = useReducer(
         nameReducer,
         defaultNameState
       );

       const addItemToNameHandler = (item) => {
         dispatchNameAction({ type: "ADD", item: item });
       };

       const removeItemFromNameHandler = (id) => {
         dispatchNameAction({ type: "REMOVE", id: id });
       };

       const clearNameHandler = () => {
         dispatchNameAction({ type: "CLEAR" });
       };

       const nameContext = {
         arr: nameState.arr,
         amount: nameState.amount,
         addItem: addItemToNameHandler,
         removeItem: removeItemFromNameHandler,
         clearAll: clearNameHandler,
       };

       return (
         <NameContext.Provider value={nameContext}>
           {props.children}
         </NameContext.Provider>
       );
     };

     export default NameProvider;
     ```

3. Wrap all the components that need to use this store with the `NameProvider`:

   ```jsx
   import React from 'react';
   import NameProvider from './store/name-reducer';

   const App = () => {
     return (
       <NameProvider>
         {/* Other components that need to use this store */}
       </NameProvider>
     );
   };

   export default App;
   ```

4. To use the context in a component, use the `useContext` hook:

   ```jsx
   import React, { useContext } from 'react';
   import NameContext from '../store/name-context';

   const MyComponent = (props) => {
     const nameCtx = useContext(NameContext);

     // Access context data
     const data = nameCtx.arr;

     // Update state using the functions provided in the context
     nameCtx.addItem(item);
   };
   ```

### Limitation of Context

Not optimized for high-frequency changes or very fast updates, such as button clicks.

## Rules for Hooks

1. Only call hooks in the top level, not in nested functions or if statements.

2. Optionally, try to add everything being used in `useEffect` to be added in dependencies.

3. Hooks like `useEffect` also don't allow adding any async/promise returning data in them. You can bypass it by creating a sub-function with async or using `.then` promises in it.

4. Hooks can be used only in functions/components (except custom hooks).

## Forward Refs

Forward refs allow passing functionalities from children to parent using refs to access special functionalities or values.

### `useImperativeHandle`

`useImperativeHandle` is a hook that allows calling something in a component programmatically. It is used in conjunction with `forwardRef`.

#### Usage:

```jsx
import { forwardRef, useImperativeHandle } from 'react';

const ChildComponent = forwardRef((props, ref) => {
  const [state, setState] = useState(initialValue);

  useImperativeHandle(ref, () => ({
    reset: () => setState(initialValue),
    increment: () => setState(state + 1),
  }));

  return <div>{state}</div>;
});

const ParentComponent = () => {
  const childRef = useRef(null);

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={() => childRef.current.reset()}>Reset</button>
      <button onClick={() => childRef.current.increment()}>Increment</button>
    </div>
  );
};
```

This way, you can use the `reset` and `increment` functions in the `ChildComponent` from the `ParentComponent`.

## How React Works, `useCallback`, and `useMemo`

### How React Works

1. All the components created by us go through ReactDOM and are shown in the Real DOM.

2. React uses a virtual DOM to determine what the current component tree looks like and what it should look like.

3. ReactDOM receives the differences and then updates the Real DOM accordingly.

4. Whenever State/Props/Context of a component changes, the component is re-executed.

5. Re-evaluating Components !== Rendering the DOM. React executes the component function and then updates only those parts of the DOM that need to be changed based on the differences.

6. Comparing the last snapshot with the current snapshot and updating only specific elements.

7. On every re-evaluation, all the child component functions are also re-evaluated.

### Re-evaluation Issue

- This is a component issue. Components' logic runs every time

 anything changes.

- Re-evaluating Components !== Rendering the DOM.

- React executes the component function and then updates only those parts of the DOM that need to be changed based on the differences.

### `React.memo`

To stop functional components from being re-evaluated on every run and only update when the prop changes, you can wrap the exported functional component with `React.memo`.

#### Example:

```jsx
export default React.memo(FuncCompo);
```

This will make the component update only when the received props are changed and not on every parent reevaluation. However, it has a limitation; it works only with primitive props.

### `useCallback` & `useMemo`

`useCallback` and `useMemo` are hooks that help with performance optimization.

#### `useCallback`

`useCallback` is used to memoize functions so that they don't get recreated on each render unless their dependencies change.

```jsx
const memoizedCallback = useCallback(() => {
  // function logic
}, [dependency1, dependency2]);
```

It returns a memoized version of the callback function.

#### `useMemo`

`useMemo` is used to memoize the result of an expensive computation so that it doesn't get recalculated on each render unless its dependencies change.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

It returns a memoized version of the value.

These hooks are useful in scenarios where you want to avoid unnecessary recalculations and function creations, improving the performance of your React application.



useCallback
used To prevent child components from re-evaluating even if functions change

it allows us to basically save a function at one place in memory and not recreate it with every execution.

it points every recreated function to the same location so that it dosent get changed

to use it we can simply wrap a function with useCallback

Example
  const functionName = useCallback(() => {
//state updates or other code.
  }, []);
UseCallback also takes an array as a dependacy like useEffect , where we add those states which will change the functionality of the function. leaving it empty means that no matter the change the function will always remain the same.

when there are case , the function has to be re-created because its dependent on values coming from outside the function , we have to add it as a dependancy in useCallback. or else it will keep using the original stored closure value and will never update it because of useCallback.

States and components changes
useState dosent change the value on every re-rendering, because useState is a react based hook which explicitly saves all the info strictly on first render and its not removed / recreated unless the component is removed and added to the dom again. same goes for useReducer.

State updates and Schedules - Everytime a setState function is called to change the value of the state , the value is not changed instantly , instead it schedules the state update. this will effect the code a lot especially when there are multiple state changes and react prioritizes some state change before than the others

The state change order is always kept, and executed in order.

that is why a functional form of the state change is recommended to be used so that we always get the latest value

Ex - setState(oldState => !oldState)

if we dont do this we get the state values only from the last time component was rerendered.

we can also useanother way than the functional way , which is by using useEffect with the dependencies states that we are using , to ensure that we get the latest value on every state change

in case we have a 2 consecutive state updates with no delays in between [callbacks/promises] , example having them in same function , they are batched together and counted as a single state update causing only one rerender.

useMemo
this allows to stop reexcution of specific parts of component while re-evaluation

when we use React.memo , we control the props of the full component. But when there is one props that needs to be changed at the same time there is performance heavy functionality that is not changed but is still executed because of one prop change.

we can prevent this using useMemo it helps to Memoize any kind of data , that means to store any kind of data and not make it be re-excuted, the same as useCallback does for functions.

it is used in the same way as useCallback , first argument is an anonymous function returning the performance heavy task , and second is the dependencies array which will allow to make the task run when the dependencies are changed and give the updated value.

usage =
   const result = useMemo(() => {
       return array.sort((a,b) => a-b);
   }, [array]);
and leaving it empty means the result is never changed and dosent have to be excuted again and again. adding array as dependency here means whenever the array is changed it will be rerendered and it does change on every execution as its not primitive

so to even prevent this array from being recreated on every execution we can simply create the value of array too using useMemo

example = const arr = useMemo(() => [2,5,6,10,9], []);

now the array will never be considered changed , empty dependency will ensure that it dosent need to be changed at all and will remain the same.

Note - use this only for very high performance intensive tasks if needed , because using this is taking up some of your performance itself too.

Class-based Components
Normally we use functional component to define components which return the JSX

The other way is to make class based component which will have a render() function that returns the JSX.

Example -
  class Product extends Component {
      render() {
      return <h2>Product</h2>
      }
  }
Functional approach is nowaydays used as default everywhere , class-based were required in past (React < 16.8) for states management components and nowaydays they are only used in case for Error boundaries

React 16.8 brought hooks which gave class-based functionalities to functional

Basic Usage
A class based component show be extended from Component , to render and access this.props

and a render() function has to be there , returning the JSX

Class based can work together with Functional Components

States and Events in Classes
Functions are written in the class and not in render method

in class based the state has to be named as state and can only be an object nothing else.

example
  constructor() {
      super()
      this.state = {
          name : "",
          bool : true,
          obj : {...}
      }
  }
the state has to be initialized in constructor always and super needs to be called as it is extended from Component

for setting the state we use this.setState();

this.setState({name: "Aj"}) in case of class based the object is not overwrited but merged so other data stays even if we change only one thing,

we can get the old value of state the same way as useState -

this.setState((oldState) => {name : oldState.name + "12"})

we can define helper functions that render specific JSX in render method

in class based , we have to use state also using this.state.name

while passing functions in javascript we have to call them using "this" and also bind the class "this" to it if we are using it in function.

<button onClick={this.toggle.bind(this)}>

Class-based Lifecycles
Class based dont use hooks but lifecycle methods

componentDidMount() = Called once component is mounted [evaluated and redered ] = useEffect(..., [])

this runs only once when the component is rendered for the first time.
componentDidUpdate() = called once component was updated / state changed = useEffect(...,[someValue]);

in the didUpdate function props we can get prevProps and prevState to compare specific state values and update accordingly
    componentDidUpdate(prevProps, prevState){
        if(prevState.value !=== currentValue){
        //other code only executed if this value changed.
        }
    }
    ```



- componentWillUnmount() = Right before component is unmounted = cleanup in useEffect 

### Context in Class based

- Class-based can use Context in almost the same way as functions, only change is how we use it , without useContext() and we can connect only one Context to a single classBased component.

### Error Boundaries - Best use case for class-based

- generally whenever we throw an Error at any place , the app crashes with error , or we use try catch

- For this we can create a new class based component , example named ErrorBoundary and give it a lifecycle method `componentDidCatch()` and this does not have any hook for now.

- `componentDidCatch(){}`  this method is executed whenever any child throws an error.

- Example -



```javascript
  class ErrorBoundary extends Component {
      constructor() {
          super();
          this.state = {hasError: false}
      }
      componentDidCatch(error){
          this.setState({hasError: true})
      }
      render() {
      if(this.state.hasError){
          return <p>Something Went Wrong</p>
      }
          return this.props.children;
      }
  }
and now we can wrap our components in this component and whenever an error is thrown , this will catch and handle them.
How to connect to Backend DB , using Https Requests
FrontEnd/React doesnt directly connect to a Database because of security conditionals and performance that is why a backend app(node,php) is used as mediator between react and db.

Sending requests can be done in 2 ways

Axios package
Fetch Api = already available by browser
Sending GET request

fetch('url'); is by default a get request. and then we get a response with a delay that is why we can use promises.
we can use
    fetch('url').then(response => {
        return response.json(); //this is also delayed and sends a response
    }).then(data => {
        console.log(data.results);   
    });
    ```



- Async/Await 

  - It is a replacement of .then and .catch block , a javascript feature that we can simply use with react.

- We can simply handle loading states and errors to show loading data  or error while requests are being made.

- Handling Errors 

  - 2xx codes = accepts

  - 4xx / 5xx responsed might have to be handled

  - We can catch errors using `.catch`  for .then or try catch for async await

  - **Fetch** dosent give an error for error status codes whereas axios can catch it.

  - To check for errors in fetch , we have to check response.ok or response.status and throw error manually

- Sending POST request

  - fetch takes a second argument with object where we can send post request and the data to be sent



  ```javascript
    fetch('url', {
        method: 'POST',
        body: JSON.stringify(data), //this sends data as json 
        headers:  {
        'Content-type' : 'application/json' //tells that data is json
        }
    })
    ```



## Custom React Hooks

- Custom hooks are simply functions containing stateful logic , that can use other hooks and react state.

- We can use custom hooks when we have shared functionality between multiple components that are using hooks too 

- Usage

  - We should create a separate file for the customhook in a folder named 'hooks' in src, and a must rule is for the function to start with 'use' this tells react that it is going to use other hooks.



  ```javascript
    const useCustom = () => {
        //code with states and hooks that you want to use at multiple places
    }
    ```



  - Now we can simply use our hook based code in our custom hook and use that at the place that we want by simple calling it like a function.

  - When we call a custom hook in a component the state and hooks of it are tied to that specific component, and not common between all components.

  - as the custom hook is tied to the function it is used in , it will re-evaluate on every change of the custom hook too. that is why we can use useCallback & useMemo to save it from re-rendering if needed.

  - we can return any state/number/variable from a custom component the the component that we want to use it in.

  - we can simply pass arguments/parameters to the custom hook for different use cases.

  - dont forget to update the inside hooks of custom hook , with dependencies of props

## Redux - State Management , App wide

- Local State - data in single component = useState and useReducer

- Cross-Component State - affects multiple components = uses props to transfer state [useState, useReducer]

- App-Wide State - state that effects entire app = prop chains , context , redux

- Why Redux in place of Context ?

  - context has some disadvantages that redux can fulfill [therefore we can use both also too]

  - context can become very complex because of multiple providers

  - context is not that performant , not good for high frequency changes

- How does Redux Work

  - Redux always has all the data at one central store [state]

  - Components make a subscription to get the data directly from store

  - To update the store data , we have Reducer Functions which mutate /change the data

  - Components dispatch/trigger actions with descriptions which forward info to reducer and update the store.

### Basic Redux without React

Redux is based on observer pattern , which is the reason why it is able to do state updates as its able to observe all the changes in the state.

1. install - `npm install redux`

2. Create a reducer , with initial state and actions to perform



   ```javascript
     const nameReducer = (state = {counter : 0}, action)=> {
         if(action.type === "..."){
              return {
                 counter: state.counter + 1,
             }
         }
         //and so on state updates
     }
     ```



   - automatically called by redux, always recieves old/existing state and  an action. 

   - it should always return a new state object 

   - it should be a pure function , without any calls / hooks

3. Create a store pointing at the reducer



   ```javascript
     import {createStore} from 'redux'
     const store = createStore(nameReducer);
     ```



4. Create a subcriber which gets triggered on every action and can get state



   ```javascript
     const nameSubscriber = () => {
       const latestState = store.getState();
     }
     ```



   - it is a function does not get any parameter , but can get the state in this because it gets triggered everytime a state update occurs.

5. subscribe your subscriber to the store



   ```javascript
     store.subscribe(nameSubscriber);
     ```



   - this function redux calls everytime state update occurs

6. now simply dispatch your actions to the store to perform actions on state



   ```javascript
     store.dispatch({type: 'increment'});
     ```



   - this calls reducer to run again and that calls the subscriber.

### Using Redux With React

- `npm install redux react-redux` to install redux in the project

- Create a folder "store" in your src for redux

- Create a file to create your store. ex-index.js



  ```javascript
  import {createStore} from 'redux'

  // Create a reducer , with initial state and actions to perform
  const nameReducer = (state = {counter : 0}, action)=> {
       if(action.type === "..."){
           return {
               counter: state.counter + 1,
           }
       }
       //and so on state updates

      return state;
   }

  //automatically called by redux, always recieves old/existing state and an action.
  // it should always return a new state object
  // it should be a pure function , without any calls / hooks

  const store = createStore(nameReducer);

  //this helps us access the specific state.
  export default store;
Next we need to wrap out app with a provider that will give all the components of the app access of the store
  //in app.js
  //other imports ...
  import {Provider} from 'react-redux'
  import store from "./store/index";

   ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
   )
Next in the component that we want to use the store in , we need to import a hook useSelector
  import {useSelector} from 'react-redux';

    const compo = () => {

        const counter = useSelector(state => state.counter);
        //like this we can get specific state data we want too
        //useSelector manages creation of subscription for state updates automatically
        // it creates a subscription when component is mounted and updates the data on its own
        // it also unsubscribes when the component is removed from DOM 

        //... other code
        // can simply use the counter data normally we will get updated on its own

    }
To update this state in react redux, we use useDispatch hook which will help us to send actions to the store reducer
    const dispatch = useDispatch(); 
    //this returns a dipatch function with which we can call the redux store
    const increment = () => {
        dispatch({type: 'increment'});
    }
Redux with Class-Based Components
with useDispatch and useSelector react-redux also gives another function named connect to connect class based components with redux

connect needs 2 arguments =

first is a function mapStateToProps which gets the redux state as an argument and the keys are passed to the component as props
second is another function mapDispatchToProps gets dispatch as an argument and in this we can send function as props to the component and call the dispatch actions
Usage

  import {connect} from 'react-redux';
  class Counter extends Component {
      //we can use the data sent in props props
      incrementHandler() {
          this.props.increment(); //accessing the dispatch function
      } 

      value = this.props.counter; //accessing the value

      //other code...
  }

  const mapStateToProps = state => {
      return {
          counter: state.counter 
          // accessing the redux state , keys are passed as props
      }
  }
  // function names can be anything , but this is conventional
  const mapDispatchToProps = dispatch => {
      // this function will recieve the dispatch
      return {
          increment: () => dispatch({type: 'increment'}),
          decrement: () => dispatch({type: 'decrement'})
      }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Counter);
Attaching payloads to Actions
we can simply get data in the reducer in the actions , by passing data while dispatching in component
  // in the reducer simply access the value using action
  const nameReducer = (state = {counter : 0}, action)=> {
     if(action.type === "ADD"){
         return {
             counter: state.counter + action.amount,
         }
     }
  }
  // now add the data while dispatching from the component
  dispatch({type: 'ADD', amount: 5});
  // this amount will be accessible in the reducer 
Working with multiple state properties
to have multiple states in the reducer and work with them specifically
  // in the file with your reducer 

  // creating an overall initial state
  const initialState = {
      counter: 0,
      showCounter: true
  }

  const counterReducer = (state = initialState, action) => {

      if(action.type === 'ADD') {
          // never update the existing state directly because it is a reference , it can work but it can cause unforeseen issues
          return {
              counter: state.counter + 1,
              showCounter: state.showCounter
              // we are having to specify the full state because react dosent merge it instead it just updates the overall state with what we return    
              // always return a brand new object with all the properties
          }
      }

      if(action.type === 'toggle'){
          return {
              showCounter: !state.showCounter,
              counter: state.counter
          }
      }

      return state;

  }

  const store = createStore(counterReducer);
  export default store
Now we can simple access these values using useSelector in the component we want.
Redux Challenges
having to remember all the action names

a huge state object at one place for bigger projects

having to return the whole state again everytime a change happens

all of these issues can be solved using manual minor fixes , but there is better way that is to use Redux Toolkit

Redux Toolkit
It is made by the same team of redux , to make things easier to use and not a must use

installation - npm install @reduxjks/toolkit , you can now remove redux from you packages , as this already has it.

How to create Slice in Toolkit
In the file where we created the reducer, example store/index.js

we have createReducer and createSlice [more powerful] in @reduxjs/toolkit

createSlice = we prepare a slice of global state , of data that is not connected and in pieces
    import {createSlice, configureStore} from '@reduxjs/toolkit';

    // 1. Create slice for the state you want
    // createSlice wants an object as argument
    const counterSlice = createSlice({
        name: 'counter', //any custom name that you wish,
        initialState : {counter: 0, showCounter: true}, // this gives it an initial value to start with
        reducers: { // this takes all the reducers we need to perform state updates
            increment(state){ // we dont need if checks here , cause we can directly access these 
               state.counter++; // toolkit uses immer which automtically mutates and does the update , so we can directly work with the state without having to copy it
            },
            increase(state,action){
               state.counter += action.payload; // toolkit automatically attaches any data in a property names payload which cannot be changed
            }
        }

    })

    const initialAuthState = {
        isAuthenticated: false,
    }

    const authSlice = createSlice({
        name: 'authentication',
        initialState : initialAuthState, 
        reducers: {
            login(state) {
                state.isAuthenticated = true;
            },
            logout(state) {
                state.isAuthenticated = false;
            }  
        }
    })

    // 2. To let the store know about the slice and reducer to use
    const store = createStore(counterSlice.reducer);
    // this is good if we have just one slice but when we are working with multiple slices

    // 2. We can use configureStore in toolkit, alternative to combineReducers of redux to send multiple reducers in state.
    const store = configureStore({
        // reducer : counterSlice.reducer   // this is in case of one main reducer
        reducer : { 
            counter : counterSlice.reducer,
            auth: authSlice.reducer
        }
        // this can be used for multiple slices, these slices will be merged together and used in store automatically
    });

    export default store;
Dispatching Actions in Slice of Toolkit
createSlice automatically assigns the reducer functions to the slice as actions through which we can access the methods
  counterSlice.actions.increment();
  // toolkit creates action objects when we call these reducers , 
  // which are unique by default, that is why these are also called action creators
  // these returned objects will already have uniques properties automatically being handled behind the scenes.
  // that is why we dont have to worry about creating unique actions and adding if else
to access these actions we will have to export them too and import where we want to use them

in the file where you created your reducer ... example store/index.js
  export const counterActions = counterSlice.actions;
  export const authAction = authSlice.actions;
now in ther component you want to use these , we dispatch the unique object returned by these actions
  import {counterActions} from '.../store/index';
  import {useSelector , useDispatch} from 'react-redux'

  const Counter = () => {
      // const counter = useSelector(state => state.counter);
      // if single slice is in store, we can also simply access our redux state in the same old way
      const counter = useSelector(state => state.counter.counter);
      // we have to specify the key of that slice when multiple are set
      const authenticated = useSelector(state => state.auth.isAuthenticated);

      const dispatch = useDispatch();

      const incrementHandle = () => {
          dispatch(counterActions.increment());
      }

      const increaseHandle = () => {
          dispatch(counterActions.increase(10)); 
          // example dipatches {type: UNIQUE_IDENTIFIER, payload: 10}
          // this value is automatically stored in payload and can be access only as payload
          // we can also send any data , array object anything in place of 10 and access as payload
      }    
  }
Splitting Up Toolkit Codes
We can separate slices into different files in the store

export the slice ... export default authSlice .... we cann also just export the reducer

and then import it for the store in index

import authReducer from './auth'

also shiting specific actions into their specific files.

Advanced Toolkit
Handling Async Tasks and Side Effects with Redux
Reducers have a rule , tht they must be pure , synchronous and no side-effects

this is why it is not allowed to add async functions in our redux reducers

now we have 2 options to handle side-effects and async tasks

Write in useEffect etc of components and dispatch only the results
Make our own action creators instead of using the default ones of toolkit
Adding async calls to the component directly
Adding async calls in components directly with the transformations of data is not recomended as

as we have add all the exact same logic of the reducers in the component before sending it to backend
we wont be able to mutate state as in reducers , because toolkit is not being used in the components
Fat Reducers vs Fat Components vs Fat Actions

Synchronous and pure code = Prefer reducers , avoid action creators and components

Async Code and side effects = Prefer Action creators and components , avoid reducers doing the work

. Another good way is creating async call using the useEffect in a component

. we get data using UseSelector of the cart

. watch changes in the cart and add the async call using useEffect

. therefore everytime the cart changes useEffect will perform the async call

. we will have to also check if it is the first call or not as , useEffect will be called the first time App.js is rendered too / when cart is created.

Adding Async calls using Action Creator Thunk
Right now action creators are being used automatically by toolkit when we are using the reducers given by the toolkit

To create action creators manually - we use Thunk

What is Thunk

A function that delays an action until later
An action creator function , which does not return the action data directly but another function which will return the action
Using Thunk

Go to the end of the creation of slices to create an async thunk middleware
const cartSlice = createSlice({...})

export const sendCartData = (cartData) => {
    // return {type: '', payload: 0} // this was done by toolkit automatically
    return async (dispatch) => { // now we can use async await here because we are not in reducer yet and we are performing actions before sending the data to the reducer
        dispatch(cartActions.setStatus({status: "Fetching Data..."}));

        const response = await fetch('url', {...});

        if (response.ok)
            dispatch(cartActions.setStatus({status: "Fetching Complete});
        else 
            dispatch(cartActions.setStatus({status: "Error Occured"});    
    }
}
now in a cart watching useEffect in App.js
useEffect(() => {
 if(isInitial){
    isInitial = false;
    retun;
 }
 dispatch(sendCartData(cart)); //this sends the updated cart info
 // Redux toolkit allows us to send a function as an action which returns another function
 // Toolkit itself handles the function action and give it the access to dispatch in it too , for performing actions there
 // redux will go and call the function we made in slice itself
}, [cart,dispatch]);
//vs code will suggest to add dispatch here , adding it is no issue as it stays as the same function everytime and wont trigger the useEffect
as thunk actions will increase , we can create a separate file cart-actions.js that will store all these thunk functions.
Redux DevTools
We can simply install a ReduxDevTools as an extension in browser

If we used redux without reduxToolkit we had to make a setup for DevTools to work , but with toolkit no setup is needed it works out of the box

With this we can see all the actions dispatched .. and all the data updates of redux. also controlit manually in browser

Router
Changes the conventional routing , of rendering/fetching multiple html pages. But rendering the html content using react by conditionally checking the route of the page.

The third party package that helps us do this is react-router

To install npm install react-router-dom

Basic Usage
Wrap your app with the BrowserRouter Component, to activate react router features in index.js
   import {BrowserRouter} from 'react-router-dom'

   //...


   root.render(

   <BrowserRouter>
       <App />
     </BrowserRouter>
   );

Import Route in your app.js and set the routes for components accordingly
import {Route} from 'react-router-dom';


//import Home component
//import other components
// as above components will be loaded as pages , we can store them
// in a different folder named pages or screens.

function App() {
    return (
        <div>
            <Route path="/">  //yourDomain.com/
                <Home/>
            </Route>
            <Route path="/other"> //yourDomain.com/other
                <Other/>
            </Route>
        </div>
    )
}

export default App;
Working With Links and NavLinks
We cannot simply set the Links to redirect to the route , because that refreshes the page and resets all the info.

for this react-router has Link component to be used for routing links , prevent browser default , persist the changes and prevent refreshes

Usage of basic Link -
  import {Link} from 'react-router-dom';


  const Header = () => {

      return (
          <header>
              //nav ul li ...
                  <Link to='/home'>Home</Link>
                  <Link to='/products'>Products</Link>
          </header>
      )

  }

Link dosent give any classes to the element, react-router also gives a NavLink component which allows us to add a class to the active link
import {NavLink} from 'react-router-dom';

// ... imports , component data ... in the component


<NavLink activeClassName={classes.active} to='/home'>
Home
</NavLink>
Dynamic routes and params
In case of rendering a list of items and redirect to details page of each item , we can create page for each product with dynamic routes and pass parameters to it.
  <Route path='/item-details/:itemId'> 
      <ItemDetails/>
  </Route>
  // this means we can load , domain/item-details/anything
  // whatever we write in anything , /item1 , /p2123w 
  // will redirect us to the item details page
We can retrive the custom details passed in the route using useParams hook . in the detail page that we loaded =
  import {useParams} from 'react-router-dom'

  const ItemDetail = () => {
      const params = useParams();

      console.log(params.itemId); 
      //we can access multiple custom params using this key that we provided in the route
      // example /:itemId/:itemPrice
  }
When multiple routes match the current path all will be loaded. example - /products will list products and /products/id will render specific product. but both will be rendered at the same time cause both match /products

React router matches from top to bottom and from start of the path not the enitre path.

For this we have Switch and Exact
  import { Route, Switch } from 'react-router-dom';
   // Switch makes it that only one of the matched routes are rendedered and not all
  // but because of router functionality , the first one in order will be rendered which is not always right
  // for that we can use exact which will only let the route render if its exactly the same.
  <Switch>
      <Route path='/welcome'>
         <Welcome />
      </Route>
      <Route path='/products' exact>
          <Products />
      </Route>
      <Route path='/products/:productId'>
           <ProductDetail />
      </Route>
  </Switch>

We can also use dynamic javascript in the Routes
Nested Routes & Redirects
React Router allows us to make routes anywhere in any component

We can define Route inside of components , and render specific data only in it when the component is loaded
 <section>
    <h1>The Welcome Page</h1>
    <Route path="/welcome/new-user">
      <p>Welcome, new user!</p>
    </Route>
</section>

 // this will allow us to load the paragraph when , the new user route is added to welcome page.
We can also Redirects to redirect a user to a page that we want to
  import {Redirect} from 'react-router-dom';
  // exact is needed or else route will always match and loop it.
  <Route path='/' exact> 
   <Redirect to='/home'>
  </Route>
Extras
We can create a custom layout component for the basic layout to be used with all routes content .. and wrap our conditional route data in it.
  <Layout> //containing navbar and props.children to render these inside components
      <Switch>
          <Route path="/home"><Home/></Route>
          <Route path="/other"><Other/></Route>
      </Switch>
  </Layout>
We can also simply use Route anywhere just as an if else to render dynamic content according to the current route.

NOT FOUND PAGE , to create a not found url catch
  // add a route at the end of all your routes already created that
  // will catch all the remainging url and render not found page

  // this will work because react matches routes from top to bottom
  <Switch>
      <Route path="/home"><Home/></Route>
      // after all the routes at end add
      <Route path="*">
          <NotFoundPage />
      </Route> 
  </Switch>
useHistory is a hook provided by react-router which allows us to programatically navigate through pages using javascript, and not by just Link/NavLink
  import { useHistory } from 'react-router-dom';

  const Component = () => {
      const history = useHistory();

      history.push('/other'); // sends to next page and allows the user to go back as it is pushed in history
      history.replace('/other'); // sends to the next page and dosent allow the user to go back to previous page
  }
Prompt components is used to give user an alert when he is leaving a page/accidentally pressed back button while filling a form.
  import { Prompt } from 'react-router-dom';

  <Prompt
      when={isFillingForm} //if this this true then the user will be prompted if he tries to leave the page
      message={(location) =>
        'Are you sure you want to leave? All your entered data will be lost!'
      }
  />
useRouteMatch gives the inner react-router based info about current route & useLocation gives the browser level current route info
  const match = useRouteMatch();
  const location = useLocation();
// match will have the url , but also our made param :itemId and parameter
// location will have the url and route only

// using match for current page url in nested routes
// allows us to manage routes only on the first level and all others will be automatically updated

React router also offers a custom way to write the url , not just by using string but by
history.push(`${location.pathname}?sort=${(Ascending ? 'asc' : 'desc')}`);

//can be written as

history.push({
   pathname: location.pathname,
   search: `?sort=${(Ascending ? 'asc' : 'desc')}`
});
Query Parameters
when we just need to pass data and not make that part of the route but have it in url to be shareable.

useHistory can be used to add query parameters to the current page

useLocation can be used to get the current pathname with the query parameters.
  import {useLocation, useHistory} from 'react-router-dom';

  // in the component
  const history = usehistory();
  const location = useLocation();

  history.push('/page?sort=asc'); 
  // this will still rerender the current component even if we are in it

  const queryParams = new URLSearhParams(location.search);
  // this is built in constructor class of browser, which will return our query params as object

  const sortAsc = queryParams.get('sort') === 'asc';
  // now we can simply use the current param value
Version 6 Changes
Video reference = React Router 6 - What Changed & Upgrading Guide

Switch is replaced with Routes

Route is now self closed and the component is now passed with element prop

<Route path='/home' element={<Home />} />
Internal logic for selecting the routes has been changed and exact is no longer needed, Router V6 loads the url automatically if its exactly whats written.

Now router also selects the best path automatically

name/* will not be loaded even if its declared before a name/:id cause we have manually specified that we are expecting text after it
name/edit will be loaded even if name/:id is declared before it. As now router will look at what the very exact match is best for it.
NavLink activeClassName prop is removed , now we have to manually find out if the link is active, we can do this by

    // className can take a function in Navlinks now which will give the nav data to it.

    <NavLink className={(navData) => navData.isActive ? classes.active: ''} to='/home'>
      Home
    </NavLink>
    ```



- **Redirect** is replaced with Navigate



  ```jsx
    <Route path='/' element={<Navigate to='/home'/>} />
    // this will push the next page into history

    <Route path='/' element={<Navigate replace to='/home'/>} />
    // this will work exactly like the old redirect and replace the history
    ```



- Now nested **Route** also need to be wrapped in **Routes** 

- Because of new logic of choosing routes , to access nested routes

  1. we have to write `/home/*` in the main route to catch all the nested routes inside.

  2. in the inner component containg the nested route , we no more have to write `/home/nest` instead normally `nest` in the path and react will understand it because now it is relative.

  3. This also effects the **Links** inside components , their path is also relative now.

- Another option to make nested routes , is by adding Route children in the main app.js



  ```jsx
    // in app.js

    <Route path='/home/*' element={<Home/>}>
        <Route path='other' element={<Other />} />
    </Route>


    // to define where the nested content has to be rendered , in home.js
    // A new component OUTLET is available and will be simply replaced with the nested content

    <section>
        <Outlet/>
        <h1>Hi</h1>
    </section>
    ```



- **useHistory** is no longer there in v6 and is replaced with **useNavigate**



  ```js
    const navigate = useNavigate();
    navigate('/home'); // will push into history
    navigate('/home', {replace: true}); // will redirect/replace in history

    // forward and backward navigation is also possible by
    navigate(-1) // backward
    navigate(1) // forward
    ```



- **Prompt** component also no more exists in v6

- For even more latest and better changes of v6.4 = [React Router 6.4 - Getting Started](https://www.youtube.com/watch?v=L2kzUg6IzxM)

## Deployment

- Before deployment steps 

  1. Test Code

  2. Optimize Code - and add Lazy Loading

  3. Build App for production

  4. Upload Production Code to Server

  5. Configure Server

### Adding Lazy Loading

- Most of the bundles are download on first render of the website.

- Lazy loading is divinding the code into chunks and only downloading them when speicific route/functionality needs it.

- To use it



```js
  import React from 'react';

  const NewPost = React.lazy(() => import('./pages/NewPost'));
  // this will make the app to not import this component right when the app is loaded
  // instead the component will only be downloaded when it is being rendered

  <Route path='/new-post'>
    <NewPost />  // the component is downloaded only when this URL is hit.
  </Route>
This rises and issue that , when the page is loaded it is going to take time to download the component. So react needs a fallback UI to show at the mean time.

For this we have Suspense Component

We Wrap all of our code where we will use lazy loading and define what has to be shown in the mean time
  import {Suspense} from 'react';

  <section>
      <Suspense fallback={<p>Loading...</p>}>  // can define any jsx in here
      // other elements/components inside
      </Suspense>
  </section>
Building and Uploading for production
create-react-app already has script , npm run build   in package.json which will minify/optimize all our codes into one build folder which we can deploy at any server we wish.

We can also directly deploy our react project on netlify, using github repository and set it up to run build command itself and use the build command for production , this allows us to get CI/CD too.

We can use any other static hosting provider too by only deploying our build folder.

Server Side Routing and Client Side Routing
In case of react , we make Single Page Applications. All the routing and urls are handled by the js provided by our main URL. therefore we use only one URL

In case of multi-page-apps , different pages are rendered by hitting different URLs therefore that dosent need any setup.

Some Places to deploy your React Code at
Netlify - free

Vercel - free

Firebase

Heroku

AWS

Tests in React
Manual Testing - Writing code and testing it right there , this method is error-prone because we cant test all scenarios and combinations manually

Automated Testing - We write code that will run and test all the building blocks of our project one by one multiple times automatically

Unit Tests - Test the most basic components / functions in isolation [most used/important]
Integration Tests - Test combination and working of modules with each other
End to End Tests - Test complete scenarios of user flows , can be done manually and is mostly completed by integration and unit tests itself
Tools
For running the tests , example Jest

For Simulating things on the screen , react testing library

both are available in create-react-app out of the box

Writing Tests
Arrange - Set up the test data , conditions and environment

Act - Run the logic to be tested (a function)

Assert - Compare execution results with expected values

Example
Create a sample component
  //Greeting.js
  import React from 'react';

  function Greeting({ name }) {
    return (
      <div>
        <h1>Hello, {name}!</h1>
      </div>
    );
  }

  export default Greeting;
Now write a test for the component
  //Greeting.test.js
  import React from 'react';
  import { render,screen } from '@testing-library/react';
  import Greeting from './Greeting';

  test('renders a greeting message with the provided name', () => { 
  //test funtion is offered by jest , and here we write the test name
    const { getByText } = render(<Greeting name="John" />); 
  // we render the component on screen
    const greetingMessage = screen.getByText(/Hello, John!/i);
  // now we select the component
   expect(greetingMessage).toBeInTheDocument(); 
  //expect helps us asser the resulta and check if the check has passed
  });
Now we can run the tests using npm test
Testing Suites
We can group multiple tests into one test suite to organize tests together
  describe('Button component', () => {
    test('displays the button label', () => {
      const { getByText } = render(<Button label="Click me" />);
      const buttonElement = getByText(/Click me/i);
      expect(buttonElement).toBeInTheDocument();
    });
  });();
  });
Here we can put multiple Tests into the describe function , to group them together into one suite
User Events testing
we can simulate userEvents and run tests accordingly by
  import React from 'react';
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import LoginForm from './LoginForm';

  describe('LoginForm component', () => {
    test('disables the submit button until both fields are filled in', () => {
      render(<LoginForm />);
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // Verify that the submit button is disabled initially
      expect(submitButton).toBeDisabled();

      // Simulate user input in the username field
      userEvent.type(usernameInput, 'johndoe');

      // Verify that the submit button is still disabled
      expect(submitButton).toBeDisabled();

      // Simulate user input in the password field
      userEvent.type(passwordInput, 'password123');

      // Verify that the submit button is now enabled
      expect(submitButton).not.toBeDisabled();
    });
  });
Integration test
The render function used to render a component, automatically runs the subcomponents used in a component and performs the required checks
Asynchronous Testing
For Asynchronous , Promises , we can use "screen.find" in place of "screen.get/query" as this returns a promise. and runs the tests multiple times for a certain time period which can also be specified.

To successfully use the find function we will also have to convet the test function into an async function and await for the "screen.find" to complete the testing.

Mock Requests
As we should not send requests to the actuall server while testing as that will send invalid data into the live server , we have 2 options
To not send the request at all and just check our local code if the component is not crashing

To send a request to a fake database for testing purpose

. To skip sending a request , we can replace out fetch with a Mock Function

Example -
  import React from 'react';
  import { render, screen } from '@testing-library/react';
  import UserList from './UserList';

  describe('UserList component', () => {
    test('fetches and displays a list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
      //this  replaces the fetch in the window , with a mock function
      // proviced by jest, and then create our own response to work with
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockUsers),
        })
      );

      render(<UserList />);

      expect(screen.getByText(/user list/i)).toBeInTheDocument();

      const userListItems = await screen.findAllByRole('listitem');
      expect(userListItems).toHaveLength(2);

      // Verify that fetch was called with the correct URL
      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users'
      );

    });

  });

THE END