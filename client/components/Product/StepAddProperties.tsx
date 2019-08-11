import React, { useRef, useState } from 'react';
import { Theme, useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CheckIcon from '@material-ui/icons/Check';

// Colors
import lightGreen from '@material-ui/core/colors/lightGreen';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      marginLeft: theme.spacing(1),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    designImg: {
      width: theme.typography.pxToRem(100),
      height: theme.typography.pxToRem(100),
    },
    card: {
      marginLeft: 10,
      marginRight: 5,
      width: theme.typography.pxToRem(100),
      height: theme.typography.pxToRem(100),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkedIcon: {
      display: 'none',
    },
    checked: {
      display: 'inline-block',
      position: 'absolute',
      top: 5,
      right: 5,
      background: lightGreen[500],
    },
  }),
);


const PatternMockupList = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { designName, patternFiles, mockups, setMockups, currentMockups, setCurrentMockups } = props;
  console.log(mockups);

  function usePattern (patternName: string) {

    const wasAdded = currentMockups[designName] && currentMockups[designName].includes(patternName);

    if (wasAdded) {

      setCurrentMockups((currentMockups: any) => {
        const idx = currentMockups[designName].indexOf(patternName);
        const newPatterns = currentMockups[designName] ? currentMockups[designName] : [];

        newPatterns.splice(idx, 1);
        currentMockups[designName] = newPatterns;

        return currentMockups;
      });

      setMockups((mockups: any) => {
        const newMockups = mockups.filter((tmpMockup: any, index: number) => {
          return (tmpMockup.designName === designName) && (tmpMockup.patternName !== patternName);
        });

        return newMockups;
      });
    }
    else {
      setCurrentMockups((currentMockups: any) => {
        const newPatterns = currentMockups[designName] ? [...currentMockups[designName], patternName] : [patternName];
        currentMockups[designName] = newPatterns;

        return currentMockups;
      });

      const newMockup = {
        'designName': designName,
        'patternName': patternName,
      };
      setMockups([...mockups, newMockup]);
    }

    console.log(mockups);
  }

  return (
    <>
      {
        patternFiles.map((pattern: any, index: number) => (
          <Card className={classes.card} key={'patternItem-' + index}>
            <CardActionArea>
              <CardMedia
                className={classes.designImg}
                image={pattern.imagePreviewUrl}
                title={pattern.fileName}
                onClick={() => { usePattern(pattern.fileName) }}
              />
              <CheckIcon className={clsx(classes.checkedIcon, { [classes.checked]: currentMockups[designName] && currentMockups[designName].includes(pattern.fileName) })} />
            </CardActionArea>
          </Card>
        ))
      }
    </>
  );
}

const StepAddProperties = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { designFiles, patternFiles, mockups, setMockups, currentMockups, setCurrentMockups } = props;

  return (
    <div className={classes.root}>
      {
        designFiles.map((design: any, index: number) => {
          return (
            <ExpansionPanel key={'designItem-' + index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"designItem-content-" + index}
                id={"designItem-header-" + index}
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.designImg}
                      image={design.imagePreviewUrl}
                      title={design.fileName}
                    />
                  </CardActionArea>
                </Card>
                <Typography className={classes.heading}>Design name: {design.fileName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <PatternMockupList
                  designName={design.fileName} patternFiles={patternFiles}
                  mockups={mockups} setMockups={setMockups}
                  currentMockups={currentMockups} setCurrentMockups={setCurrentMockups}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>
  );
}

export default StepAddProperties;
