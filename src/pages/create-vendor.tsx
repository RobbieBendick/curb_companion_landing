// import { CreateVendorContext, CreateVendorProvider } from '@/features/vendor/create/create-vendor.context';
import {
  CreateVendorPageOne,
  CreateVendorPageSuccess,
  CreateVendorPageThree,
  CreateVendorPageTwo,
} from '@/features/vendor/create/create-vendor-form.component';
import { Box, Step, StepLabel, Stepper, styled, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreateVendorProvider } from '@/features/vendor';

export function CreateVendorPage(): JSX.Element {
  // const { vendor, setVendor } = useContext(CreateVendorContext);

  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = ['Vendor Info', 'Menu', 'Schedule'];

  const handleNext = (): void => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = (): void => {
    if (activeStep === 0) return;
    setActiveStep((prevStep) => prevStep - 1);
  };

  const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 80vh;
  `;

  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <CreateVendorProvider>
      <Wrapper className="form-wrapper">
        <Box>
          <Stepper sx={{ mt: 4, marginInline: 'auto', width: isMobile ? '90%' : '50%'}} activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              <CreateVendorPageOne handleNext={handleNext} />
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              <CreateVendorPageTwo handleNext={handleNext} handleBack={handleBack} />
            </motion.div>
          )}
          {activeStep === 2 && (
            <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              <CreateVendorPageThree handleNext={handleNext} handleBack={handleBack} />
            </motion.div>
          )}
          {activeStep === 3 && (
            <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              <CreateVendorPageSuccess />
            </motion.div>
          )}
        </Box>
      </Wrapper>
    </CreateVendorProvider>
  );
}
