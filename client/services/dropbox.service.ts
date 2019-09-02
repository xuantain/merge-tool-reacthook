import { Dropbox } from 'dropbox';
import dropboxConfig from "../../.dropbox.config";

const accessToken = dropboxConfig.DROPBOX_TOKEN;

const dropbox = new Dropbox({
  accessToken,
  fetch
});

export default dropbox;
