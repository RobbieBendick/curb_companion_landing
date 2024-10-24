import React, { useContext, useEffect, useState } from 'react';
import { CreateVendorContext } from './create-vendor.context';
import { StateDropdown } from '@/features/vendor/create/components/state-dropdown';
import { MultiSelectTags } from '@/features/vendor/create/components/multi-select-tags';
import { SelectedSchedule } from '@/features/vendor/create/components/selected-schedule';
import { MultiSelectDays } from '@/features/vendor/create/components/multi-select-days';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  styled,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Delete } from '@mui/icons-material';
import { TimePickers } from './components/time-pickers';
import { dayParser, hourParser } from '@/shared/helpers/string-formatters';
import { SkipGoBack } from './components/skip-go-back';
import axios from 'axios';

interface IBasicVendorFormValues {
  title: string;
  tags: string[];
  street: string;
  city: string;
  state: string;
  postalCode: string;
  catering: boolean;
  website: string;
  phoneNumber: string;
}

export function CreateVendorPageOne({ handleNext }: { handleNext: () => void }): React.ReactElement {
  const { vendor, setVendor } = useContext(CreateVendorContext);
  const initialValues: IBasicVendorFormValues = {
    title: vendor.title,
    tags: (vendor.tags && vendor.tags.map((tag) => tag)) || [],
    street: vendor.street || '',
    city: vendor.city || '',
    state: vendor.state || '',
    postalCode: vendor.postalCode || '',
    catering: vendor.catering || false,
    phoneNumber: vendor.phoneNumber || '',
    website: vendor.website || '',
  };
  let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/tags`;

  interface ITag {
    id: string;
    title: string;
    image: any;
  }

  const [tags, setTags] = useState<ITag[] | undefined>(undefined);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(apiUrl);
        const tagList: ITag[] = response.data.data;
        setTags(tagList);
      } catch (error) {
        console.error('Error fetching tags', error);
      }
    };

    // Fetch tags on page load
    fetchTags();
  }, []);

  const [errorMessage] = useState<string>('');
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    tags: yup.array().of(yup.string()).optional(),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    postalCode: yup.string().required('Postal Code is required'),
    website: yup.string().optional(),
    phoneNumber: yup
      .string()
      .max(10, 'Phone number cannot exceed 10 digits')
      .min(10, 'Phone numer cannot be less than 10 digits')
      .optional(),
  });

  const handleBasicVendorFormSubmit = async (values: IBasicVendorFormValues) => {
    setVendor({
      ...vendor,
      title: values.title,
      tags: values.tags,
      street: values.street,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      phoneNumber: values.phoneNumber,
      website: values.website,
      catering: values.catering,
    });
    console.log('vendor', vendor);
    handleNext();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleBasicVendorFormSubmit,
  });

  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <>
      <Box
        sx={{
          width: isMobile ? '90%' : '45%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, mt: 2 }}>
          Submit your vendor information
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <MultiSelectTags formik={formik} tagTitleList={tags} />
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Website"
                name="website"
                fullWidth
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Street"
                name="street"
                fullWidth
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="City"
                name="city"
                fullWidth
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StateDropdown formik={formik} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Postal Code"
                name="postalCode"
                fullWidth
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                helperText={formik.touched.postalCode && formik.errors.postalCode}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox name="catering" checked={formik.values.catering} onChange={formik.handleChange} />}
                label="Your vendor offers catering"
              />
            </Grid>

            {errorMessage && (
              <Typography sx={{ display: 'block', justifyContent: 'center', textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            )}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ paddingLeft: 0 }}>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export function CreateVendorPageTwo({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}): React.ReactElement {
  interface MenuItem {
    title: string;
    description: string;
    price: string;
    type: string;
  }
  const StyledMenuItemCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 1rem;
    height: 15rem;
    position: relative;
    width: 17rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    transition: transform 0.3s ease;
    &:hover {
      transform: translateY(-5px);
    }

    .content {
      flex-grow: 1;
    }

    .title {
      max-width: 13rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.5rem;
    }

    .description {
      display: -webkit-box;
      -webkit-line-clamp: 4; // limit lines to 4
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-wrap: break-word;
    }
    .type {
      position: absolute;
      bottom: 1rem;
      right: 1.5rem;
    }

    .price {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      font-style: italic;
    }

    .delete {
      position: absolute;
      top: 0.8rem;
      right: 0.7rem;
    }
  `;
  const { vendor, setVendor, menuItemList, setMenuItemList, menuItem } = useContext(CreateVendorContext);

  function MenuItemCard({ menuItem, index }: { menuItem: MenuItem; index: number }) {
    const handleDeleteMenuItem = (idx: number) => {
      const updatedList = localMenuItemList.filter((_, i) => i !== idx);
      setLocalMenuItemList(updatedList);
      setMenuItemList(updatedList);
    };

    return (
      <StyledMenuItemCard>
        <div className="content">
          <Typography variant="h6" className="title">
            {menuItem.title}
          </Typography>
          <Typography className="description">{menuItem.description || 'No description provided.'}</Typography>
        </div>
        <Typography variant="body1" className="type">{`${menuItem.type}`}</Typography>
        <Typography variant="body1" className="price">
          {menuItem.price ? `$${menuItem.price}` : ''}
        </Typography>
        <IconButton className="delete">
          <Delete onClick={() => handleDeleteMenuItem(index)} />
        </IconButton>
      </StyledMenuItemCard>
    );
  }

  const foodTypes: string[] = ['Entree', 'Combo', 'Side', 'Appetizer', 'Drink', 'Dessert'];
  const [localMenuItemList, setLocalMenuItemList] = useState<MenuItem[]>([]);

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    price: yup
      .string()
      .matches(/^\d+(\.\d{1,2})?$/, 'Please enter a valid price')
      .optional(),
    type: yup.string().required('Type is required'),
  });

  const addMenuItem = (item: MenuItem): void => {
    // add menu item to list
    setLocalMenuItemList((prevList: MenuItem[]) => [...prevList, item]);

    setMenuItemList([...localMenuItemList, item]);

    // reset form
    formik.resetForm();
  };

  const initialValues: MenuItem = {
    title: menuItem.title || '',
    description: menuItem.description || '',
    price: menuItem.price || '',
    type: menuItem.type || '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: addMenuItem,
  });

  if (menuItemList.length > 0 && localMenuItemList.length === 0) {
    setLocalMenuItemList(menuItemList);
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, pt: 2 }}>
        Create your menu
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: '60vh', margin: '0 auto' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid sx={{ justifyContent: 'center' }} container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                label="Price"
                name="price"
                fullWidth
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Type"
                name="type"
                fullWidth
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                {foodTypes.map((type: string) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ display: 'grid' }}>
              <Button variant="contained" color="primary" type="submit">
                Add Menu Item
              </Button>
            </Grid>
            <SkipGoBack handleNext={handleNext} handleBack={handleBack} />
          </Grid>
        </form>
      </Box>
      {localMenuItemList.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, mt: 5 }}>
            Menu Items
          </Typography>
          <Grid container sx={{ gap: '2rem', justifyContent: 'center' }}>
            {localMenuItemList.map((menuItem: MenuItem, index: number) => (
              <MenuItemCard menuItem={menuItem} index={index} />
            ))}
          </Grid>
        </Box>
      )}
      {localMenuItemList.length > 0 && (
        <Grid container sx={{ maxWidth: '60vh', marginInline: 'auto', mt: 5.5, mb: 4 }}>
          <Grid item xs={12} sx={{ display: 'grid' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                // set vendor's menu
                setVendor({
                  ...vendor,
                  menu: localMenuItemList,
                });

                handleNext();
              }}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export function CreateVendorPageThree({
  handleNext,
  handleBack,
}: {
  handleBack: () => void;
  handleNext: () => void;
}): React.ReactElement {
  interface ScheduleItem {
    days: string[];
    startTime: string | null;
    endTime: string | null;
  }
  const { vendor, selectedScheduleList, setSelectedScheduleList } = useContext(CreateVendorContext);

  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem[]>([]); // [[startHour, startMinute], [endHour, endMinute]]  MILLITARY TIME

  const addToScheduleHandler = () => {
    setSelectedSchedule([
      ...selectedSchedule,
      { days: formik.values.days, startTime: formik.values.startTime, endTime: formik.values.endTime },
    ]);

    setSelectedScheduleList([
      ...selectedSchedule,
      { days: formik.values.days, startTime: formik.values.startTime, endTime: formik.values.endTime },
    ]);

    formik.resetForm();
  };

  const validationSchema = yup.object({
    days: yup.array().min(1, 'At least one day must be selected'),
    startTime: yup.string().required('Start time is required'),
    endTime: yup.string().required('End time is required'),
  });

  const initialValues: ScheduleItem = {
    days: [],
    startTime: null,
    endTime: null,
  };

  const [errorMessage, setErrorMessage] = useState<string>('');

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: addToScheduleHandler,
  });

  return (
    <Box sx={{ minHeight: '85vh' }}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '35%',
            margin: '0 auto',
            maxWidth: '30rem',
            padding: '0 1rem',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, mt: 8 }}>
            Create your schedule
          </Typography>

          {/* Day(s) input field */}
          <MultiSelectDays formik={formik} />

          {/* Start / End time input fields */}
          <TimePickers formik={formik} />

          {/* Display selected days & time */}
          {formik.values.days.length > 0 &&
            formik.values.startTime &&
            formik.values.endTime &&
            !isNaN(Number(formik.values.endTime.split(':')[0])) &&
            !isNaN(Number(formik.values.endTime.split(':')[1])) && (
              <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                {dayParser(formik.values.days)} at {hourParser(formik.values.startTime)} -{' '}
                {hourParser(formik.values.endTime)}
              </Typography>
            )}
          <Button sx={{ backgroundColor: '#0ea47a', color: '#fff', mt: 2 }} type="submit">
            Add to schedule
          </Button>
          <SkipGoBack handleNext={handleNext} handleBack={handleBack} sendApiCall={true} />
        </Box>
      </form>
      <SelectedSchedule
        selectedSchedule={selectedSchedule}
        setSelectedSchedule={setSelectedSchedule}
        setSelectedScheduleList={setSelectedScheduleList}
        selectedScheduleList={selectedScheduleList}
      />
      {selectedSchedule.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5,
            mb: 4,
            flexDirection: 'column',
            minWidth: '35%',
            margin: '0 auto',
            maxWidth: '30rem',
            padding: '1rem 1rem',
          }}
        >
          <Button
            sx={{ backgroundColor: '#0ea47a', color: '#fff', mt: 5 }}
            onClick={async () => {
              try {
                let updatedVendor = {
                  ...vendor,
                  schedule: selectedSchedule,
                };
                let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/landing/create`, updatedVendor);
                if (res.status >= 200 && res.status < 300) {
                  handleNext();
                }
              } catch (error: any) {
                setErrorMessage(error.message.message);
              }
            }}
          >
            Continue
          </Button>
          {errorMessage && (
            <Typography sx={{ display: 'block', justifyContent: 'center', textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export function CreateVendorPageSuccess() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        textAlign={'center'}
        variant="h4"
        sx={{
          mt: 5,
        }}
      >
        Success!
      </Typography>
      <Typography
        variant="h5"
        textAlign={'center'}
        sx={{
          mt: 1,
        }}
      >
        Your vendor has been sent for review.
      </Typography>
      <Button
        sx={{
          mt: 1.9,
          marginInline: 'auto',
          backgroundColor: '#0ea47a',
          color: '#fff',
        }}
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
