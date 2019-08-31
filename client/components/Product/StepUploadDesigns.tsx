import React, { useRef } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';

import services from '../../services';

// Models
import { DESIGN } from "../../models/amz-shirt.strict.model";

import camera512Icon from '../../../assets/img/camera-512.png';
import dropboxIcon from '../../../assets/img/dropbox-icon.png';


interface FadeProps {
  children: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

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
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gridListWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 512,
      height: 384,
    },
  }),
);

const StepUploadDesign = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const inputRef = useRef(null);
  const { designs, setDesigns, currentDesigns, setcurrentDesigns } = props;
  const [ isOpenDropbox, setIsOpenDropbox] = React.useState(false);
  const [ designsOnDropbox, setDesignsOnDropbox ] = React.useState<any[]>([]);

  function closeDropboxPopper() {
    setIsOpenDropbox(false);
  }

  const chooseDesignsOnDropbox = (e: React.MouseEvent) => {
    e.preventDefault();

    services.dropbox.filesListFolder({
      path: '/designs'
    }).then(response => {
      console.log('designs/', response)

      const requestedEntries = response.entries.filter(entry => {
        return (entry['.tag'] === 'file');
      }).map(entry => {
        return {
          path: entry['path_display'],
          size: {'.tag': 'w1024h768'} as DropboxTypes.files.ThumbnailSizeW1024h768,
          format: {'.tag': 'png'} as DropboxTypes.files.ThumbnailFormatPng,
        };
      });

      services.dropbox.filesGetThumbnailBatch({
        entries: requestedEntries as DropboxTypes.files.ThumbnailArg[]
      }).then(response => {
        console.log('designs/*', response);
        setDesignsOnDropbox(response.entries);
        setIsOpenDropbox(true);
      });
    });
  };

  const chooseDesignsFromLocal = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files as FileList;

    Array.from(files).forEach((file: File) => {

      let reader = new FileReader();

      reader.onloadend = () => {
        const wasAdded = designs[file.name] && (designs[file.name].name === file.name) && (designs[file.name].lastModified === file.lastModified);

        let newDesign: DESIGN;

        if (wasAdded) {
          newDesign = designs[file.name];
        } else {
          newDesign = {
            id: Object.keys(designs).length + 1, // TODO: async so still not get id yet
            src: reader.result,
            name: file.name,
            type: file.type,
            lastModified: file.lastModified,
            addedAt: Date.now(),
          } as DESIGN;

          setDesigns(designs => {
            return {...designs, [file.name]: newDesign};
          });
        }

        setcurrentDesigns([...currentDesigns, newDesign]);
      }

      reader.readAsDataURL(file)
    });
  };

  return (
    <>
      {
        currentDesigns && currentDesigns.length > 0 ? currentDesigns.map((design: DESIGN, index: number) => {
          return (
            <Card className={classes.card} key={'design-' + index}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={design.src.toString()}
                  title={design.name}
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
            image={camera512Icon}
            title="Upload designs"
            onClick={chooseDesignsFromLocal}
          />
          <input type="file" accept="image/jpeg, image/png" multiple ref={inputRef}
            className={classes.mediaInput} onChange={(e) => onDrop(e)} />
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={dropboxIcon}
            title="Get Designs from Dropbox"
            onClick={chooseDesignsOnDropbox}
          />
        </CardActionArea>
      </Card>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={isOpenDropbox}
        onClose={closeDropboxPopper}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpenDropbox}>
          <div className={classes.gridListWrap}>
            <GridList className={classes.gridList} cellHeight={160} cols={3}>
              {designsOnDropbox.map(design => (
                <GridListTile key={design.metadata.id} cols={1}>
                  <img src={'data:image/jpeg;base64, ' + design.thumbnail} alt={design.metadata.name} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default StepUploadDesign;
