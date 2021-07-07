
import React from "react"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

const TimeLine = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">0</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Born in Michigan to Lesbian Parents Catherine Nehil and Annette Puleo</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">14 - 18</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Slogged Through Highschool</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">18 - 19</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Gap Year, Volenteered in Nepal and Uganda</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">19</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Started Studying Material Science Engineering and Statistics at MSU</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">20</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Began Self-Teaching Machine Learning</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">21</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Internship at Textron</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">22</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Covid Induced Life Reflection, Began Studying Jungian Psychology</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">23</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Finished Undergrad at MSU</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">23</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
        </TimelineSeparator>
        <TimelineContent>Started PhD in Interdisciplinary Material Science at Vanderbilt University</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}


export default TimeLine
  