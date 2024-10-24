import { Box, useMediaQuery } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function TimePickers({ formik }: { formik: any }) {
  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        mt: 4,
      }}
    >
      <Box
        sx={{
          minWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            className="start-time-picker"
            value={formik.values.startTime}
            onChange={(newValue: any) => {
              let newStartTime = newValue.format('HH:mm'); // 14:20
              if (newStartTime) {
                formik.setFieldValue('startTime', newStartTime);
              }
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          minWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="End Time"
            className="end-time-picker"
            value={formik.values.endTime}
            onChange={(newValue: any) => {
              let newEndTime = newValue.format('HH:mm'); // 14:20
              if (newEndTime) {
                formik.setFieldValue('endTime', newEndTime);
              }
            }}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
