import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  right: {
    alignItems: 'center'
  }
}));

function getSteps() {
  return ['Select Images', 'Analysing', 'Result'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select Images';
    case 1:
      return 'Analysing...';
    case 2:
      return 'Score is ...';
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  //const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  let curr = 0

  const checkResult = () => {
    console.log("checking")
    if (Math.random() > 0.5 ? true : false) {
      console.log("Done Analysis")
      handleNext()
    }
    else {
      setTimeout(checkResult, 1000)
    }
  }


  const handleNext = () => {
    setActiveStep(prev => prev + 1);
    curr = curr+1
    if (curr === 1) {
      setTimeout(checkResult, 1000)
    }
  };

  const handleReset = () => {
    curr = 0
    setActiveStep(0);
  };

  const path = {
    removeUrl: 'https://localhost:3000/',
    saveUrl: 'https://localhost:3000/'
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
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
          activeStep === 0 ? (
            <Container maxWidth="sm">
              <Grid container spacing={1}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}><UploaderComponent asyncSettings={path}></UploaderComponent></Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Container>
          ) : (
            activeStep === 1 ? (
              <Container maxWidth="sm">
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <CircularProgress />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  </Grid>
                </Grid>
              </Container>
            ) : (
              <Container maxWidth="sm">
                <Grid container spacing={1}>
                  <Grid item xs={12}><Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography></Grid>
                  <Grid item xs={10}></Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleReset}
                      className={classes.button}
                    >
                      Retry
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            )
          )
        )}
      </div>
    </div>
  );
}