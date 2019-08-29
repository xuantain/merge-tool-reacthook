import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import mergeImages from 'merge-images';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

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

// Models
import { AMZ_Shirt_Strict, AMZ_DEFAULT_ROW, AMZ_FIELD_ORDER } from "../../models/amz-shirt.strict.model";

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
    }
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
  const [activeStep, setActiveStep] = useState(0);
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

    // var demo = {
    //   cols: [{ name: 'A', key: 0 }, { name: 'B', key: 1 }, { name: 'C', key: 2 }],
    //   data: [
    //     [ 'TemplateType=fptcustom', 'Version=2019.0519', 'TemplateSignature=U0hJUlQ=', 'The top 3 rows are for Amazon.com use only. Do not modify or delete the top 3 rows.'],
    //     [ 'Product Type', 'Seller SKU', 'Brand Name', 'Product Name' ],
    //     [ 'feed_product_type', 'item_sku', 'brand_name', 'item_name' ],
    //     [ 'shirt', 'DILO20052019001P', 'Dilostyle', 'I don\'t give a Hufflefuck tshirt' ]
    //   ]
    // };

    let exportedData = [ AMZ_DEFAULT_ROW ];

    const titles = AMZ_FIELD_ORDER.map(info => {
      return info[1];
    });

    const keys = AMZ_FIELD_ORDER.map(info => {
      return info[0];
    });

    exportedData.push(titles);
    exportedData.push(keys);

    let promises = [];

    for (const designName in currentMockups) {
      if (currentMockups.hasOwnProperty(designName)) {

        const design = currentMockups[designName];
        // console.log('currentMockups', currentMockups);

        design.patterns.map((patternName: string, index: number) => {

          const colors = design.data.color_name.split('/');
          const sizes = design.data.size_name.split('/');
          const colorMaps = design.data.color_map.split('/');
          const sizeMaps = design.data.size_map.split('/');

          let mugParent = {} as AMZ_Shirt_Strict;
          mugParent.feed_product_type = design.data.feed_product_type;
          mugParent.item_sku = design.data.item_sku;
          mugParent.brand_name = design.data.brand_name;
          mugParent.item_name = design.data.item_name;
          mugParent.department_name = design.data.department_name;
          mugParent.parent_child = 'parent';
          mugParent.variation_theme = design.data.variation_theme;

          // Add the Mug parent
          const parentRowData = keys.map(key => {
            return mugParent[key];
          });

          exportedData.push(parentRowData);

          let count = 0;

          // NOTE: Generate Mug child
          colors.map((color, cidx) => {
            sizes.map((size, sidx) => {

              count++;

              let mugChild = Object.assign({}, design.data);

              mugChild.parent_sku = mugParent.item_sku;
              mugChild.item_sku = mugParent.item_sku + '-' + count;
              mugChild.parent_child = 'child';
              mugChild.color_name = color;
              mugChild.color_map = colorMaps[cidx];
              mugChild.size_name = size;
              mugChild.size_map = sizeMaps[sidx];

              const childRowData = keys.map(key => {
                return mugChild[key];
              });

              // NOTE: Merge design with color to pattern and then upload to Dropbox to get the public link.
              promises.push(timeout((count - 1) * 3000, mergeDesignToPattern(designName, patternName, mugChild)));

              exportedData.push(childRowData);
            });
          });
        });
      }
    }

    Promise.all(promises).then(res => {
      console.log('Promise.all', res);

      res.map(info => {
        exportedData.map(row => {
          if (row[1] === info.sku) {
            row[14] = info.url;
          }
        })
      });

      /* convert from array of arrays to workbook */
      const worksheet = XLSX.utils.aoa_to_sheet(exportedData);
      const new_workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(new_workbook, worksheet, 'amz-shirts');

      const exportFileName = 'amz-shirts-' + Date.now() + '.xlsx';
      XLSX.writeFile(new_workbook, exportFileName, { type:'base64', bookType: 'xlsx' });
    });
  }

  function mergeDesignToPattern (designName: string, patternName: string, mugChild: any) {
    // console.log('mergeDesignToPattern', designName, patternName);

    const designIdx = designFiles.findIndex((design: any) => {
      return design.fileName === designName;
    });
    const designSrc = designFiles[designIdx].imagePreviewUrl;

    const patternIdx = patternFiles.findIndex((pattern: any) => {
      return pattern.fileName === patternName;
    });
    const patternSrc = patternFiles[patternIdx].imagePreviewUrl;

    return mergeImages([
      { src: patternSrc },
      { src: designSrc, opacity: 0.3 }
    ])
    .then((b64: any) => {

      // TODO: Save to the dropbox folder and then wait for syncing to the server. Get the image link afterward to update to "data" for each mockup

      // const canvas = createCanvas(1000, 1000, 'pdf');
      // const img = new Image();
      // saveAs(b64, designName + patternName);
      // document.querySelector('#demoImg').src = b64;

      const fileName = designName.replace('.png', '-') + patternName.replace('.png', '-') + Date.now() + '.png' ;
      return uploadMockupToDropbox(fileName, b64, mugChild);
    });
  }

  function uploadMockupToDropbox (fileName: string, b64: any, mugChild: any) {
    const i = b64.indexOf('base64,');
    const buffer = Buffer.from(b64.slice(i + 7), 'base64');

    return services.dropbox.filesUpload({path: '/mockups/' + fileName, contents: buffer})
      .then(function (newFileInfo) {
        // console.log(newFileInfo, newFileInfo.sharing_info);
        // https://www.dropbox.com/sh/7jyd3yzxfghzmye/AAClDv4NEMP9IinbLKl1oQ_Va/design-text-1pattern-TShirt-black.png?dl=0

        const settings = {
          "requested_visibility": "public",
          "audience": "public",
          "access": "viewer"
        };

        return services.dropbox.sharingCreateSharedLinkWithSettings({path: newFileInfo.path_display, settings: settings})
          .then(function (sharedInfo) {
            // console.log('sharedInfo', sharedInfo.url);
            mugChild.main_image_url = sharedInfo.url;

            return { sku: mugChild.item_sku, url: sharedInfo.url };
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
            return { sku: mugChild.item_sku, url: 'cannot get shared link "' + fileName + '"' };
          });
      })
      .catch(function (error) {
        // console.error('dropbox filesUpload', error);
        return { sku: mugChild.item_sku, url: 'cannot upload image "' + fileName + '"' };
      });
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
