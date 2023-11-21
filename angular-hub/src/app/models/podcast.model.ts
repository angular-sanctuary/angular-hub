import {LanguageTag} from "./language.model";

export interface Podcast {
    title: string;
    url: string;
    logo: string;
    language: LanguageTag;
}
