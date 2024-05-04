import { defineEventHandler } from 'h3';
import podcasts from '../../../public/assets/data/podcast.json';

export default defineEventHandler(() => podcasts);
