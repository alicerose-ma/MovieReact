// import React, { createContext, useReducer } from 'react'
// import { View, Text } from 'react-native'

// export default (reducer, actions, initialState) => {
//     const StateContext = React.createContext();
//     const DispatchContext

//     const Provider = ({ children }) => {
//         const [state, dispatch] = useReducer(reducer, initialState)

//         for (let key in actions) {
//             boundActions[key] = actions[key](dispatch)
//         }

//         return <Context.Provider value={{ state , ...boundActions}} >
//                 {children}
//         </Context.Provider>
//     }

//     return { Context, Provider }
// };


import React, { createContext, useReducer } from 'react'

export default (reducer, actions, initialState) => {
    const StateContext = createContext();
    const DispatchContext = createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState)
        const boundActions = {};

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }

        return <StateContext.Provider value={state} >
            <DispatchContext.Provider value={boundActions}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    }

    return { StateContext, DispatchContext, Provider }
};
