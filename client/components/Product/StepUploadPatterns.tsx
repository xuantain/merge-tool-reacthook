import React, { useRef, SyntheticInputEvent } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import camera512png from '../../../assets/img/camera-512.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginLeft: 10,
      marginRight: 5,
      maxWidth: 345,
      width: 250,
      height: 250,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    media: {
      height: 140,
      backgroundSize: 'contain',
    },
    mediaInput: {
      display: 'none',
    }
  }),
);

const StepUploadPatterns = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const inputRef = useRef(null);
  let { patternFiles, setPatternFiles } = props;

  function handleChange(e: React.MouseEvent) {
    e.preventDefault();
    inputRef.current.click();
  }

  function onDrop(e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      var wasAdded = patternFiles.findIndex(function (pattern: any) {
        return pattern.fileName === file.name && pattern.lastModified === file.lastModified;
      });

      if (wasAdded > -1) {
        return;
      }

      let newItem = {
        file: file,
        fileName: file.name,
        fileType: file.type,
        lastModified: file.lastModified,
        imagePreviewUrl: reader.result
      };

      setPatternFiles([...patternFiles, newItem]);
    }

    reader.readAsDataURL(file)
  };

  return (
    <>
      {
        patternFiles && patternFiles.length > 0 ? patternFiles.map((item: any, index: number) => {
          return (
            <Card className={classes.card} key={'pattern-' + index}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.imagePreviewUrl}
                  title={item.fileName}
                />
              </CardActionArea>
            </Card>
          )
        }) : ''
      }
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={camera512png}
            title="Upload designs"
            onClick={handleChange}
          />
          <input type="file" accept="image/jpeg, image/png" multiple ref={inputRef}
            className={classes.mediaInput} onChange={(e) => onDrop(e)} />
        </CardActionArea>
      </Card>
    </>
  );
}

export default StepUploadPatterns;
