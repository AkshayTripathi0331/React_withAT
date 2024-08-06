Q1. What is React and its key features ?
A. Its a javascript liberary for building user interfaces , primarily for single page applications. 
- It allows developers to create large web applications that can update and render efficiently in response to data changes.
- reusable UI components that manage their own state
- Components can be functional or class-based, and they help in organizing the code into small, manageable parts
- React uses a virtual DOM to improve performance. Instead of manipulating the real DOM directly, React creates a virtual representation of the DOM and only updates the parts of the DOM that have changed.
This approach minimizes the number of costly DOM operations, making updates faster and more efficient.
- Hooks allow us to use state and other React features without writing a class. There are built-in hooks like useState, useEffect, and useMemo are very useful for handling side effects, memoization, and managing state in functional components.
We can also create custom hooks to encapsulate reusable logic.
- React follows unidirectional data flow, meaning data flows from parent components to child components through props. This makes it easier to track changes and debug applications.
- React has a vast ecosystem of libraries and tools that complement its functionality. Libraries like React Router and Redux are often used alongside React to handle routing and state management.
- React provides several features and techniques for performance optimization, such as code splitting, lazy loading, and memoization.
- Tools like React Profiler help in identifying performance bottlenecks and optimizing rendering.
- With frameworks like Next.js, React supports server-side rendering and static site generation, improving SEO and performance for web applications.

Q2. Whats the key difference between class component and functional component?
A. 
# Class Components vs. Functional Components in React

| Feature                     | Class Components                                                                                                                | Functional Components                                                                                                   |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Definition**              | ES6 classes that extend `React.Component`                                                                                        | Simple JavaScript functions that return JSX                                                                             |
| **State Management**        | Managed with `this.state` and updated using `this.setState()`                                                                    | Managed using the `useState` hook                                                                                       |
| **Lifecycle Methods**       | Utilize lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`                             | Use the `useEffect` hook to handle side effects, replacing traditional lifecycle methods                                |
| **Syntax and Complexity**   | Uses ES6 class syntax; often more complex due to the `this` keyword, state, and lifecycle methods                                | Simpler function syntax, making them more readable and concise                                                          |
| **Hooks**                   | Cannot use hooks                                                                                                                 | Can use hooks like `useState`, `useEffect`, `useMemo`, `useCallback`, making them more flexible and powerful            |
| **Performance**             | Slightly slower due to class hierarchies and `this` management                                                                   | Often faster; with hooks, they can avoid unnecessary renders using `useMemo` and `useCallback`                          |
| **Community Preference**    | Still valid and used in many applications                                                                                        | Preferred by many developers for simplicity and modern features; the recommended way to build components in React       |
| **Example**                 | ```jsx<br>class Greeting extends React.Component {<br>  constructor(props) {<br>    super(props);<br>    this.state = { message: "Hello, " + props.name + "!" };<br>  }<br>  render() {<br>    return <h1>{this.state.message}</h1>;<br>  }<br>}``` | ```jsx<br>import React, { useState, useEffect } from 'react';<br>function Greeting({ name }) {<br>  const [message, setMessage] = useState("Hello, " + name + "!");<br>  useEffect(() => {<br>    console.log("Component mounted or updated");<br>    return () => {<br>      console.log("Component unmounted");<br>    };<br>  }, [message]);<br>  return <h1>{message}</h1>;<br>}``` |
| **Conclusion**              | Class components are still widely used but are less preferred in modern React development                                        | Functional components provide a cleaner, more intuitive way to manage state and side effects and are the standard today |


