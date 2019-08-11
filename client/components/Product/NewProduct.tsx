import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Grid from '@material-ui/core/Grid';

// Step Components
import StepUploadDesigns from './StepUploadDesigns';
import StepUploadPatterns from './StepUploadPatterns';
import StepAddProperties from './StepAddProperties';

// Colors
import lightGreen from '@material-ui/core/colors/lightGreen';

import utils from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1),
    },
    instructions: {
      // marginTop: theme.spacing(1),
      // marginBottom: theme.spacing(1),
    },
    actions: {
      textAlign: 'center',
    },
    rowImg: {
      width: 70,
      height: 70,
    },
    media: {
      height: 140,
      backgroundSize: 'contain',
    },
    mediaInput: {
      display: 'none',
    },
    green: {
      background: lightGreen[500],
    },
  }),
);

const NewProductPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [ designFiles, setDesignFiles ] = utils.useStateWithLocalStorage('designFiles', []);
  const [ patternFiles, setPatternFiles ] = utils.useStateWithLocalStorage('patternFiles', []);
  const [ mockups, setMockups ] = utils.useStateWithLocalStorage('mockups', []);
  const [ currentMockups, setCurrentMockups ] = useState({});

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [activeStep, setActiveStep] = useState(2);
  const steps = ['Select Designs', 'Select Patterns', 'Add Properties'];

  function handleNext() {
    if (activeStep === steps.length - 1) {
      generateMockups();
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  function getStepContent(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <StepUploadDesigns designFiles={designFiles} setDesignFiles={setDesignFiles} />
        );
      case 1:
        return (
          <StepUploadPatterns patternFiles={patternFiles} setPatternFiles={setPatternFiles} />
        );
      case 2:
        return (
          <StepAddProperties
            designFiles={designFiles}
            patternFiles={patternFiles}
            mockups={mockups}
            setMockups={setMockups}
            currentMockups={currentMockups}
            setCurrentMockups={setCurrentMockups}
          />
        );
      default:
        return 'Unknown step';
    }
  }

  function generateMockups () {
    console.log('Generate mockup');
  }

  function mergeDesignToPattern (designName: string, patternName: string) {
    console.log('mergeDesignToPattern', designName, patternName);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {
        activeStep === steps.length ? (
          <Grid container className={classes.actions}>
            <Grid item xs={12}>
              <Typography className={classes.instructions}>
                All steps completed - you are finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
          </Grid>
          </Grid>
        ) : (
          <>
          <Grid container className={classes.actions}>
            <Grid item xs={12}>
              <Button onClick={() => utils.link({path: '/dashboard'})} className={classes.button}>
                Cancel
              </Button>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Grid>
          </Grid>
          {
            getStepContent(activeStep)
          }
          </>
      )}
    </div>
  );
}

export default NewProductPage;
