import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { rrulestr } from 'rrule';
import IOccurrence from 'shared/interfaces/occurrence';

interface Props {
  schedule: IOccurrence[];
}

export const BuildEachDay: React.FC<Props> = ({ schedule }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();

  const scheduleWidget: JSX.Element[] = [];
  if (schedule.length === 0) {
    return <Typography textAlign="center">No schedule available</Typography>;
  }
  schedule.forEach((item) => {
    const { start, end, recurrence } = item;
    if (!item || !recurrence || !start || !end) return;

    recurrence.forEach((rruleString: string) => {
      const rrule = rrulestr(rruleString);
      const rruleInstances = rrule.between(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Next 7 days

      const sortedInstances: { [key: string]: Date[] } = {};

      rruleInstances.forEach((instance) => {
        const dayOfWeek = daysOfWeek[instance.getDay()];
        if (!sortedInstances[dayOfWeek]) {
          sortedInstances[dayOfWeek] = [instance];
        } else {
          sortedInstances[dayOfWeek].push(instance);
        }
      });

      Object.keys(sortedInstances).forEach((day) => {
        const isToday = daysOfWeek[todayIndex] === day;
        const startTime = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        scheduleWidget.push(
          <ListItem
            sx={{
              justifyContent: 'space-between',
              fontWeight: isToday ? 'bold' : 'normal',
              fontSize: 14,
            }}
            key={`${day}-${start}-${end}`}
          >
            <Typography>{day.substring(0, 3)}</Typography>
            <Typography>
              {startTime} - {endTime}
            </Typography>
          </ListItem>
        );
      });
    });
  });

  return (
    <List
      sx={{
        width: '80%',
        marginInline: 'auto',
      }}
    >
      {scheduleWidget}
    </List>
  );
};

export default BuildEachDay;
