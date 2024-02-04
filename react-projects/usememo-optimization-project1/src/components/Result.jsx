import React, {useMemo}from "react";         

const Result = ({marks, subject}) => {
    console.log("inside result component");

    const percentageMarks = useMemo(()=> {
      console.log("inside useMemo")
      return (marks*100)/100
      },[]);

    return(
        <>
          <h2> Result is: {marks}</h2>
          <h2>Pecentage is {percentageMarks}</h2>
          <h2>For subjects: {subject}</h2>
        </>
    )
}

export default React.memo(Result)