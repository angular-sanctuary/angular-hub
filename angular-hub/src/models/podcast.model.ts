import { MediaChannel } from './media-channel.model';

export interface Podcast {
  name: string;
  logo: string;
  language: string;
  mediaChannels: MediaChannel[];
}
