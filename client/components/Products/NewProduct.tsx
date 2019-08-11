import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
    gridList: {
      width: 500,
      height: 450,
    },
    rowImg: {
      width: 70,
      height: 70,
    }
  }),
);

const NewProductPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const steps = getSteps();

  // MODEL
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
  }

  function isStepOptional(step: number) {
    return step === 1;
  }

  function handleNext() {
    let newSkipped = skipped;

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }

  const tileData = [
    {
      img: 'https://cdn.shopify.com/s/files/1/1312/0893/products/004.jpg?v=1491851162',
      title: 'Image',
      author: 'author',
      cols: 2,
    },
  ];


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div align="center">
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
            </div>
            <div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewProductPage;
