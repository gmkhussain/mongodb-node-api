import React, {useState, useRef} from 'react'

// creating `context`
const StateContext = React.createContext()

function StateProvider({children}){

    const [myContext, setMyContext] = useState("Hello State");

    return(
        <StateContext.Provider value={{
            myContext,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export {StateContext, StateProvider}