import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  subject: Yup.string().required('Subject is required'),
  description: Yup.string().required('Description is required'),
  email: Yup.string().email('Invalid email address').optional(),
});

export const FeedbackPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '85vh',
        padding: '15px',
      }}
    >
      <Formik
        initialValues={{
          name: '',
          subject: '',
          description: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <Grid container spacing={2} maxWidth={800} minHeight={500}>
              <Grid item xs={12}>
                {' '}
                <Typography
                  justifyContent="center"
                  textAlign="center"
                  fontWeight="bold"
                  variant="h4"
                  marginBottom="20px"
                >
                  Give us your feedback!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Field
                  required
                  name="name"
                  as={TextField}
                  label="Name"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  required
                  name="subject"
                  as={TextField}
                  label="Subject"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject}
                  error={touched.subject && Boolean(errors.subject)}
                  helperText={touched.subject && errors.subject}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  required
                  name="description"
                  as={TextField}
                  label="Description"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email (Optional)"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FeedbackPage;
