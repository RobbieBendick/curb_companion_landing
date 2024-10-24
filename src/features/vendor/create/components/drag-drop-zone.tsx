import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import DeleteIcon from '@mui/icons-material/Delete';

function DragDrop({ fileLimit, label }: { fileLimit: number; label: string }) {
  /// Deconstruct props in parameter area.

  interface File {
    name: string;
    lastModified: number;
    lastModifiedDate: Date;
    size: number;
    type: string;
  }

  /// File types allowed in the DropZone.
  const fileTypes = ['JPG', 'PNG'];

  /// Files currently uploaded
  const [files, setFiles] = useState<File[]>([]);

  /// Error message under the DropZone div.
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (file: File) => {
    /// Check if too many files in the DropZone.
    if (files.length >= fileLimit) return setErrorMessage(`Maximum images: ${fileLimit}`);

    /// Check to see if file already exists in the DropZone.
    let fileAlreadyExists = false;
    files.forEach((singleFile) => {
      if (file.name === singleFile.name && file.size === singleFile.size) fileAlreadyExists = true;
    });

    /// If file exists already in the DropZone, return an error message.
    if (fileAlreadyExists) return setErrorMessage('File already exists.');
    else setErrorMessage('');

    // Place file into state.
    if (files.length > 0) {
      setFiles([...files, file]);
    } else {
      setFiles([file]);
    }
  };

  /// Takes in a file size in bytes, and returns the file size in MB.
  let sizeInMB = (fileSize: number) => fileSize / 1e6;

  /// Round number to hundredths.
  let roundToHundredths = (x: number) => Math.round(100 * x) / 100;

  /// Removes the specific file being deleted from state.
  let removeItem = (index: number) => setFiles([...files.filter((_, i) => i !== index)]);

  // Change the style of the DropZone. (UGLY, IDK HOW TO DO THIS BETTER)
  useEffect(() => {
    let input = document.querySelector('.file-uploader') as HTMLInputElement;
    if (input) {
      input.style.border = '2px dashed #0ea47a';
      input.style.maxWidth = '100%';
      input.style.minWidth = '100%';
      input.style.maxHeight = '100%';
      input.style.height = '60px';

      let dragDropSVG = document.querySelector(
        '#root > div.MuiBox-root.css-rocs8 > div > div:nth-child(2) > div > form > div > div:nth-child(2) > label > svg'
      ) as HTMLElement;
      if (dragDropSVG) {
        let children = dragDropSVG.children;
        for (let i = 0; i < children.length; i++) {
          let child = children[i];
          if (child.tagName === 'path') {
            child.setAttribute('fill', '#0ea47a');
          }
        }
      }
    }
  }, []);

  return (
    <>
      <Typography textAlign="start" sx={{ mb: 0.8 }}>
        {label}
      </Typography>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} classes="file-uploader" />
      <Box
        sx={{
          border: '2px dashed #0ea47a',
          borderTop: 'none',
          borderBottom: files.length > 0 ? '2px dashed #0ea47a' : 'none',
        }}
      >
        {files.length > 0 &&
          files.map((file, i) => {
            return (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    pt: 1,
                    ml: 1.5,
                    mb: 1,
                    mr: 2,
                    alignItems: 'center',
                  }}
                >
                  <Typography key={file.name}>{file.name}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ pr: 0.5 }}>{roundToHundredths(sizeInMB(file.size))} MB</Typography>
                    <Button onClick={() => removeItem(i)}>
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Box>
              </>
            );
          })}
      </Box>
      {errorMessage !== '' && (
        // red
        <Typography sx={{ color: '#d32f2f' }} variant="subtitle1">
          {errorMessage}
        </Typography>
      )}
    </>
  );
}

export default DragDrop;
