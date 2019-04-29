import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { withStyles, WithStyles, StyleRules } from "@material-ui/core/styles";
import { Paper, MenuItem } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { connect } from "react-redux";
import axios from "~/common/axiosConfigure";
import { TextFieldId } from "~/containers/activity/ActivityForm";
const Autosuggest = require("react-autosuggest");

interface IAutocompleteState {
    suggestions: string[];
}

export interface IInputProps extends WithStyles<typeof styles> {
    TextFieldProps: TextFieldProps;
    inputProps: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
        setClickedValue: (field: string, value: string) => void;
    };
    currentUser: {
        accountId: string;
    };
}

class AutocompleteTextField extends React.Component<IInputProps, IAutocompleteState> {
    constructor(props: IInputProps) {
        super(props);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            suggestions: [],
        };
    }

    componentDidMount() {
        axios
            .get(
                `/activities/location/suggestion?accountId=${
                    this.props.currentUser ? this.props.currentUser.accountId : "1"
                }`,
            )
            .then((response: AxiosResponse<string[]>) => {
                this.locations = response.data;
            });
    }
    // Imagine you have a list of languages that you'd like to autosuggest.
    private locations: string[] = [];

    // Teach Autosuggest how to calculate suggestions for any given input value.
    private getSuggestions = (value: string): string[] => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let i = 1;
        return inputLength === 0
            ? []
            : this.locations.filter(location => {
                  if (i > 5) return false;
                  if (location.toLocaleLowerCase().indexOf(inputValue) === 0) {
                      i = i + 1;
                      return true;
                  }
                  return false;
              });
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    private getSuggestionValue = (suggestion: string): string => {
        this.props.inputProps.setClickedValue(TextFieldId.Location, suggestion);
        return suggestion;
    };

    // Use your imagination to render suggestions.
    private renderSuggestion = (
        suggestion: string,
        { isHighlighted }: { isHighlighted: boolean },
    ): JSX.Element => (
        <MenuItem selected={isHighlighted} component="div" name="autocompleteSelection">
            <div>{suggestion}</div>
        </MenuItem>
    );

    // Render Input Component
    private renderInput = (inputProps: any): JSX.Element => {
        const { ref, ...other } = inputProps;
        return (
            <TextField
                fullWidth
                inputRef={ref}
                InputProps={{
                    ...other,
                }}
                {...this.props.TextFieldProps}
            />
        );
    };

    private renderSuggestionsContainer = (options: any): JSX.Element => {
        const { containerProps, children } = options;

        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        );
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    private onSuggestionsFetchRequested = ({ value }: { value: string }): void => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    private onSuggestionsClearRequested = (): void => {
        this.setState({
            suggestions: [],
        });
    };
    private onSuggestionHighlighted = ({ suggestion }: { suggestion: string }): void => {
        if (suggestion) this.props.inputProps.value = suggestion;
    };
    public render(): React.ReactNode {
        const { classes } = this.props;
        // Finally, render it!
        return (
            <Autosuggest
                theme={
                    classes && {
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }
                }
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderInputComponent={this.renderInput}
                renderSuggestion={this.renderSuggestion}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
                onSuggestionHighlighted={this.onSuggestionHighlighted}
                inputProps={this.props.inputProps}
            />
        );
    }
}

type styleClassNames = "suggestionsContainerOpen" | "suggestion" | "suggestionsList" | "container";

const styles: StyleRules<styleClassNames> = {
    container: {
        flexGrow: 1,
        position: "relative",
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: "block",
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
    },
};

// specify exactly which slice of the state we want to provide to our component
const mapStateToProps = (state: any) => {
    return {
        currentUser: state.currentUser.currentUser,
    };
};

export default connect(
    mapStateToProps,
    null,
)(withStyles(styles)(AutocompleteTextField));
