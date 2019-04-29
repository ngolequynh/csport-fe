import * as React from "react";
import Button from "@material-ui/core/es/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import "~/containers/AddTeam/FloatingAddButton.scss";

interface IFloatingAddButtonProps {
    onClickAddTeamButton: () => void;
}

function FloatingAddButton(props: IFloatingAddButtonProps) {
    return (
        <div>
            <Button
                onClick={props.onClickAddTeamButton}
                variant="fab"
                color="primary"
                aria-label="add"
                id="button"
            >
                <AddIcon />
            </Button>
        </div>
    );
}

export default FloatingAddButton;
