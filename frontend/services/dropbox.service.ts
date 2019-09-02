import { Dropbox } from 'dropbox';

const { DROPBOX_TOKEN } = process.env;

const dropbox = new Dropbox({
  accessToken: DROPBOX_TOKEN,
  fetch
});

export default dropbox;
