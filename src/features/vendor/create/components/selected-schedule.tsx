import { dayParser, hourParser } from '@/shared/helpers/string-formatters';
import {
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';

import DeleteIcon from '@mui/icons-material/Delete';

interface ScheduleItem {
  days: string[];
  startTime: string | null;
  endTime: string | null;
}
export function SelectedSchedule({
  selectedSchedule,
  setSelectedSchedule,
  setSelectedScheduleList,
  selectedScheduleList,
}: {
  selectedSchedule: ScheduleItem[];
  setSelectedSchedule: any;
  setSelectedScheduleList: any;
  selectedScheduleList: ScheduleItem[];
}) {
  const handleDeleteScheduleItem = (indexToDelete: number) => {
    setSelectedSchedule((prevSchedule: ScheduleItem[]) => {
      const updatedSchedule = [...prevSchedule];
      updatedSchedule.splice(indexToDelete, 1);
      return updatedSchedule;
    });
    setSelectedScheduleList(selectedSchedule);
  };

  if (selectedScheduleList.length > 0 && selectedSchedule.length === 0) {
    setSelectedScheduleList(selectedSchedule);
  }

  return (
    <>
      {selectedSchedule.length > 0 && (
        <motion.div>
          <TableContainer sx={{ width: '65%', margin: '0 auto', mt: 10 }}>
            <Typography variant="h5" sx={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>
              Scheduled Times
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day(s)</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell></TableCell> {/* Empty TableCell for the delete button */}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedSchedule.map((item: ScheduleItem, index: number) => {
                  if (!item.startTime || !item.endTime || item.days.length === 0) return null;
                  return (
                    <TableRow key={`schedule-item-${index}`}>
                      <TableCell>{dayParser(item.days)}</TableCell>
                      <TableCell>{hourParser(item.startTime)}</TableCell>
                      <TableCell>{hourParser(item.endTime)}</TableCell>

                      <TableCell>
                        <IconButton onClick={() => handleDeleteScheduleItem(index)} aria-label="Delete" color="primary">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      )}
    </>
  );
}
