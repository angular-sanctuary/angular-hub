import { defineEventHandler } from 'h3';
import communities from '../../../public/assets/data/community.json';

export default defineEventHandler(() => communities);
