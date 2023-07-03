import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
	timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { FC } from "react";
import { convertTimeFormat } from "../utils/CabRequestHelper";

interface ITimelineProps {
	pickupTime: string;
	pickUpLocation: string;
	dropLocation: string;
}

const TimelineComponent: FC<ITimelineProps> = ({
	pickupTime,
	pickUpLocation,
	dropLocation,
}: ITimelineProps): JSX.Element => {
	return (
		<Timeline
			sx={{
				[`& .${timelineOppositeContentClasses.root}`]: {
					flex: 0,
					mb: 0,
				},
				marginTop: "0px",
				marginBottom: "0px",
				color: "black",
			}}
		>
			<TimelineItem>
				<TimelineOppositeContent>
					{convertTimeFormat(pickupTime)}
				</TimelineOppositeContent>
				<TimelineSeparator>
					<TimelineDot />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>{pickUpLocation}</TimelineContent>
			</TimelineItem>
			<TimelineItem>
				<TimelineOppositeContent
					color="textSecondary"
					marginLeft="40px"
				></TimelineOppositeContent>
				<TimelineSeparator>
					<TimelineDot />
				</TimelineSeparator>
				<TimelineContent>{dropLocation}</TimelineContent>
			</TimelineItem>
		</Timeline>
	);
};

export default TimelineComponent;
