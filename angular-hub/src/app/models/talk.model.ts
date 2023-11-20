import {Author} from "./author.model";

export interface Talk {
  title: string;
  description: string;
  author: Author;
}
