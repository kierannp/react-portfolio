
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
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">0</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Birth in Michigan to Catherine Nehil and Annette Puleo</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">5</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Got Interested in Insects, Wanted to be an "Antomologist"</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">6</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>First Existential Crisis: The Sun's Inevitable Extinguishment</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">6.5</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Diagnosed with Learning Disability: Couldn't Read</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">9</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Truly Gained Ability to Read</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">12</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Got Interested in Homesteading, Started Building Stuff</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">16</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Start of Depressive Episode</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">18</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Gap Year, Volenteered in Nepal and Uganda for 6 Months</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">19</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Started Undergrad in Material Science Engineering and Statistics at MSU</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">20</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Got Interested in Machine Learning</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">21</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Interned at Textron, Saw the Utility of Computer Science</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">22</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Got Interested in Jungian Psychology</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">23</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Finished Undergrad at MSU, Honors in Both Degrees with 3.8/4.0 GPA</TimelineContent>
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

      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">24</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary"/>
        </TimelineSeparator>
        <TimelineContent>Won the NSF Graduate Research Fellowship</TimelineContent>
      </TimelineItem>

    </Timeline>
  );
}


export default TimeLine
  