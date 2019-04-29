import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    createMuiTheme,
    MuiThemeProvider,
    createGenerateClassName,
    jssPreset,
} from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";

import { AppRouter } from "./router";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import LoginForm from "./pages/login/LoginForm";

// Add your custom theme here.
// https://material-ui.com/customization/themes/
const theme = createMuiTheme();
const store = configureStore();

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </MuiThemeProvider>
    </JssProvider>,
    document.getElementById("root"),
);

// * Enable HMR for the whole project
if ((module as any).hot) {
    (module as any).hot.accept();
}
