import * as React from "react";
import Competitor from "../../components/notifications/CompetitorInfo";
import List from "@material-ui/core/List";
import { ICompetitor } from "~/data/notification/actionCreators";

interface ICompetitorListProps {
    notification: ICompetitor[];
}

class CompetitorList extends React.Component<ICompetitorListProps, {}> {
    render(): React.ReactNode {
        let element = <div />;
        if (this.props.notification.length > 0) {
            element = (
                <div>
                    <List>
                        {this.props.notification.map((competitor: ICompetitor, index: number) => (
                            <Competitor key={index} competitor={competitor} />
                        ))}
                    </List>
                </div>
            );
        }
        return element;
    }
}

export default CompetitorList;
