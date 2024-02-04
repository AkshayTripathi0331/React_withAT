// function Test(){
    
// function sum(a,b){
//     return a+b;
// }

// console.log(sum(2,3));
// console.log(sum(2,3));

// };
// export default Test

import Name from "./components/Name";
import Result from "./components/Result";


function sum2(){
    const obj = {};

    return function(a,b) {
        console.log('obj is:', obj);
        if (!obj[`${a},${b}`]) {
          console.log('inside if');
          obj[`${a},${b}`] = a + b;
      }
        return obj[`${a},${b}`]
    }

}
const memoizedSum = sum2();

console.log(memoizedSum(3,4));
console.log(memoizedSum(3,4));



function App() {
    return(
        <div>
         <Name name="Akshay" subject="Maths"/>
         <Result marks= "90"/>
        </div>
    )
}

export default App;

//React.memo is only used for functional component

//for class based component we have two things pure components and shouldComponentUpdate 

//Reat.memo vs useMemo


// React.memo is a higher-order component provided by React for functional components. It's used to memoize the rendering of a functional component based on its props. If the props of a memoized component have not changed, React skips the rendering and returns the last rendered result.

//UseMemo: useMemo is a hook in React used for memoizing the result of a computation. It's used to memoize values between renders. It's not specifically for components but is often used in functional components to optimize expensive computations.