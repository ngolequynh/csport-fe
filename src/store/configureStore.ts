import thunk from "redux-thunk"; // import thunk
import { createStore, applyMiddleware, compose } from "redux";
import myReducer from "../data/rootReducer";

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = (f: any) => f;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === "development") {
    devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
}

// config store for redux
export default function configureStore() {
    const store = createStore(
        myReducer,
        compose(
            applyMiddleware(thunk),
            devtools,
        ),
    ); // create store sử dụng thunk

    if ((module as any).hot) {
        // Enable Webpack hot module replacement for reducers
        (module as any).hot.accept("../data/rootReducer.ts", () => {
            const nextRootReducer = require("../data/rootReducer.ts");
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
