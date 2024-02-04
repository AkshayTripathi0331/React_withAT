import React from "react";

const Name = ({name}) => {
    console.log("inside name component")
    return(
        <>
          <h2> Name is: {name}</h2>
        </>
    )
}

export default React.memo(Name)