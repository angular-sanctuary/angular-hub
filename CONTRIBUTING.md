# Run the project

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v12.16.1 or higher)

### Setup

Run `npm ci` to install the application dependencies.

### Development

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application automatically reloads if you change any of the source files.

### Build

Run `npm run build` to build the client project. The client build artifacts are located in the `dist/angular-hub/analog/public` directory.

---

#### Before running your app

In order for the app to run correctly, you must have an **.env** file at the root of your app folder, with the following content:

```text
VITE_ANALOG_PUBLIC_BASE_URL="http://localhost:4200"
```

## Licenses

This project uses the MIT License for the project code.
It excludes the `angular-hub/src/content` folder, which includes trademarks and logos from the Angular community.

# Contribute

## Content

### Communities

To add a new community, update the `angular-hub/src/public/assets/data/community.json` by adding a new item to the array.  
The item should match this format:

```typescript
export interface Community {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location: string | null;
  url: string | null;
  logo: string | null;
  twitter: string | null;
  linkedin: string | null;
  callForPapers: string | null;
  events: Event[]; // default to []
}
```

### Events

> If you add a conference event, mind listing it on [developers-conferences-agenda](https://github.com/scraly/developers-conferences-agenda) too for a broader audience!

To add a new event, update the `angular-hub/src/public/assets/data/community.json` by adding a new item to the related community item (firstly add a community with previous section instructions if needed).  
The item should match this format:

```typescript
export interface Event {
  name: string | null;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location: string | null;
  url: string | null;
  date: string;
  language: string;
  isFree: boolean;
  isRemote: boolean;
  isOnsite: boolean;
  callForPapers: string | null;
  callForPapersEndDate: string | null;
}
```

### Podcasts

To add a new podcast, update the `angular-hub/src/public/assets/data/podcast.json` by adding a new item to the array.  
The item should match this format:

```typescript
export interface Podcast {
  name: string;
  url: string;
  logo: string;
  language: string;
}
```
