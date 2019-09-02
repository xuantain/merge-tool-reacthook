import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

// Step Components
import StepUploadDesigns from './StepUploadDesigns';
import StepUploadPatterns from './StepUploadPatterns';
import StepAddProperties from './StepAddProperties';

// Colors
import lightGreen from '@material-ui/core/colors/lightGreen';

// Models
import { DESIGN, PATTERN, MOCKUP, MUG, MUG_PATTERN, COLOR, AMZ_DEFAULT_ROW, AMZ_FIELD_ORDER } from "../../models/amz-shirt.strict.model";

import mergeImages from 'merge-images';
import { saveAs } from 'file-saver';

import services from '../../services';
import utils from '../../utils';

// Rough implementation. Untested.
function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      promise.then(resolve, reject);
    }, ms);
  })
}

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
    demoImg: {
      width: 200,
      height: 200
    },
    progress: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
    },
    hide: {
      display: 'none',
    }
  }),
);

const NewProductPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [ designs, setDesigns ] = utils.useStateWithLocalStorage('designs', {});
  const [ patterns, setPatterns ] = utils.useStateWithLocalStorage('patterns', {});
  const [ mockups, setMockups ] = utils.useStateWithLocalStorage('mockups', []);
  const [ mugs, setMugs ] = utils.useStateWithLocalStorage('mugs', {});
  const [ currentDesigns, setcurrentDesigns ] = React.useState<DESIGN[]>([]);
  const [ currentPatterns, setcurrentPatterns ] = React.useState<PATTERN[]>([]);
  const [ currentMugs, setCurrentMugs ] = useState({});
  const [ completed, setCompleted ] = React.useState(0);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Select Designs', 'Select Patterns', 'Add Properties'];

  function handleNext() {
    if (activeStep === steps.length - 1) {
      // NOTE: Finish step
      if (Object.keys(currentMugs).length > 0) {
        generateMockupsFromMugs();
      } else {
        return;
      }
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
          <StepUploadDesigns
            designs={designs} setDesigns={setDesigns}
            currentDesigns={currentDesigns} setcurrentDesigns={setcurrentDesigns}
            currentMugs={currentMugs} setCurrentMugs={setCurrentMugs}
          />
        );
      case 1:
        return (
          <StepUploadPatterns
            patterns={patterns} setPatterns={setPatterns}
            currentPatterns={currentPatterns} setcurrentPatterns={setcurrentPatterns}
          />
        );
      case 2:
        return (
          <StepAddProperties
            designs={designs} patterns={patterns}
            currentDesigns={currentDesigns} currentPatterns={currentPatterns}
            mugs={mugs} setMugs={setMugs}
            currentMugs={currentMugs} setCurrentMugs={setCurrentMugs}
          />
        );
      default:
        return 'Unknown step';
    }
  }

  function generateMockupsFromMugs () {

    function getRandomInt(max: number) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    const timer = setInterval(() => {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          clearInterval(timer);
          return oldCompleted;
        }

        oldCompleted += getRandomInt(4) * 10;
        oldCompleted = Math.min(oldCompleted, 95);

        return oldCompleted;
      });
    }, 300);


    let REQUEST_TIME = 3000;
    let genMockupPromises = [];

    // NOTE: 1 Design will creates 1 Mug + relevant data (patterns + colors)
    // NOTE: 1 Mockup = 1 Design + 1 Pattern + 1 Color
    for (const designName in currentMugs) {
      if (currentMugs.hasOwnProperty(designName)) {

        let newMug = currentMugs[designName] as MUG;

        if (newMug.patterns.length) {
          // NOTE: Save Mug to History
          newMug.id = mugs.length + 1; // async cannot assign id like this
          newMug.addedAt = Date.now();
          newMug.name = 'mug-' + designName.replace('.png', '-') + newMug.addedAt;

          setMugs({...mugs, [newMug.name]: newMug});

          newMug.patterns.map((mugPattern: MUG_PATTERN) => {

            // NOTE: If the Mug have color then create Mockup
            if (mugPattern.colors.length) {

              mugPattern.colors.map((color: COLOR, cidx: number) => {
                const fileName = 'mockup-' + designName.replace('.png', '-') + mugPattern.name.replace('.png', '-') + Date.now() + '.png' ;

                const newMockup = {
                  id: mockups.length + 1,
                  name: fileName,
                  addedAt: Date.now(),
                  mugId: newMug.id,
                  mugName: newMug.name,
                  designId: newMug.designId,
                  designName: newMug.designName,
                  patternId: mugPattern.id,
                  patternName: mugPattern.name,
                  sku: mugPattern.data.item_sku,
                  color: color,
                  link: '/mockups/' + mugPattern.data.item_sku + '/' + fileName,
                  sharedLink: null,
                } as MOCKUP;

                setMockups([...mockups, newMockup]);

                // NOTE: Merge design with color to pattern and then upload to Dropbox to get the public link.
                genMockupPromises.push(timeout(cidx * REQUEST_TIME++, generateMockupImage(newMockup)));
              });
            }
          });
        }
      }
    }

    Promise.all(genMockupPromises).then((res) => {

      let newMockups = [...mockups];

      res.map(info => {
        let newMockup = info.newMockup;

        if (!info.error || (info.error.status === 409)) {
          newMockup.uploadedAt = Date.now();
          newMockup.sharedLink = info.sharedLink;
          newMockup.b64 = null;
        }

        newMockups.push(newMockup);
      });

      setMockups(newMockups);
      setCompleted(100);

      setTimeout(() => {
        utils.link({ path: '/dashboard' });
        clearInterval(timer);
      }, 3000);
    });
  }

  function generateMockupImage (newMockup: MOCKUP) : Promise<any> {

    const designSrc = designs[newMockup.designName].src;
    const patternSrc = patterns[newMockup.patternName].src;

    var canvas = document.createElement('canvas') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');

    return new Promise(function (resolve) {

      var textureIMG = new Image();
      textureIMG.src = patternSrc;

      textureIMG.onload = function() {
        canvas.width = textureIMG.width;
        canvas.height = textureIMG.height;

        ctx.drawImage(textureIMG,0,0);
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = newMockup.color.hex;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var colorFilledB64 = canvas.toDataURL();

        mergeImages([
          { src: patternSrc },
          { src: colorFilledB64, opacity: 0.3 },
          { src: designSrc }
        ])
        .then((b64: any) => {

          newMockup.b64 = b64;

          // TODO: Save to the dropbox folder and then wait for syncing to the server. Get the image link afterward to update to "data" for each mockup

          // const canvas = createCanvas(1000, 1000, 'pdf');
          // const img = new Image();
          // resolve(saveAs(b64, designName + patternName));
          return resolve(uploadMockupToDropbox(b64, newMockup));
        });
      };
    });
  }

  async function uploadMockupToDropbox (b64: any, newMockup: MOCKUP) : Promise<any> {
    const i = b64.indexOf('base64,');
    const buffer = Buffer.from(b64.slice(i + 7), 'base64');
    const uploadUrl = newMockup.link || '/mockups/' + newMockup.sku + '/' + newMockup.name;

    return services.dropbox.filesUpload({path: uploadUrl, contents: buffer})
      .then(function (newFileInfo) {
        // console.log(newFileInfo, newFileInfo.sharing_info);
        // https://www.dropbox.com/sh/7jyd3yzxfghzmye/AAClDv4NEMP9IinbLKl1oQ_Va/design-text-1pattern-TShirt-black.png?dl=0

        const settings = {
          'requested_visibility': {'.tag': 'public'} as DropboxTypes.sharing.RequestedVisibility,
          'audience': {'.tag': 'public'} as DropboxTypes.sharing.LinkAudiencePublic,
          'access': {'.tag': 'viewer'} as DropboxTypes.sharing.RequestedLinkAccessLevel,
        };

        return services.dropbox.sharingCreateSharedLinkWithSettings({path: newFileInfo.path_display, settings: settings})
          .then(function (sharedInfo) {

            return { mockupName: newMockup.name, newMockup: newMockup, sharedLink: sharedInfo.url };

            //   {
            //     ".tag": "file",
            //     "url": "https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0",
            //     "name": "Prime_Numbers.txt",
            //     "link_permissions": {
            //         "can_revoke": false,
            //         "resolved_visibility": {
            //             ".tag": "public"
            //         },
            //         "revoke_failure_reason": {
            //             ".tag": "owner_only"
            //         }
            //     },
            //     "client_modified": "2015-05-12T15:50:38Z",
            //     "server_modified": "2015-05-12T15:50:38Z",
            //     "rev": "a1c10ce0dd78",
            //     "size": 7212,
            //     "id": "id:a4ayc_80_OEAAAAAAAAAXw",
            //     "path_lower": "/homework/math/prime_numbers.txt",
            //     "team_member_info": {
            //         "team_info": {
            //             "id": "dbtid:AAFdgehTzw7WlXhZJsbGCLePe8RvQGYDr-I",
            //             "name": "Acme, Inc."
            //         },
            //         "display_name": "Roger Rabbit",
            //         "member_id": "dbmid:abcd1234"
            //     }
            // }
          })
          .catch(function (error) {
            // console.error('dropbox sharingCreateSharedLinkWithSettings', error);
            return { error: error, mockupName: newMockup.name, newMockup: newMockup, sharedLink: 'cannot get shared link "' + newMockup.name + '"' };
          });
      })
      .catch(function (error) {
        // console.error('dropbox filesUpload', error);
        return { error: error, mockupName: newMockup.name, newMockup: newMockup, sharedLink: 'cannot get shared link "' + newMockup.name + '"' };
      });
  }

  return (
    <div className={classes.root}>
      {
        completed ? <LinearProgress className={classes.progress} variant="determinate" value={completed} /> : ''
      }
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
                disabled={(activeStep === steps.length - 1) && (Object.keys(currentMugs).length === 0)}
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
