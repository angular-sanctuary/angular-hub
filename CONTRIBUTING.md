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

### CFP

To add a new CFP, create a new markdown file in the `angular-hub/src/content/cfp` folder.

File name format depends on the CFP type:

- For a CFP that is open all year round like a meetup, the file name should be `cfp-name.md`.
- For a CFP that is open for a specific period of time, the file name should be `YYYY-MM-DD-cfp-name.md`.

```md
---
name: Angular Day
type: 'meetup'
location: Verona, Italy
deadline: 2023-09-30
url: https://2023.angularday.it/
logo: https://pbs.twimg.com/profile_images/1118451217309609984/DiZ0M3wW_400x400.png
tags:
  - Online
---
```

### Communities

To add a new community, create a new markdown file in the `angular-hub/src/content/communities` folder. The file name should be the name of the community in the format `community-name.md`. The file should contain the following front matter:

```md
---
name: Angular Athens
type: 'meetup'
location: Athens, Greece
url: https://www.meetup.com/angular-athens/
logo: https://pbs.twimg.com/profile_images/1702641363437719553/xxXXoN41_400x400.jpg
twitter: https://twitter.com/AngularAthens
tags:
  - Online
---
```

### Events

> If you add a conference event, mind listing it on [developers-conferences-agenda](https://github.com/scraly/developers-conferences-agenda) too for a broader audience!

To add a new event, create a new markdown file in the `angular-hub/src/content/events` folder.
The file name should be the date of the event in the format `YYYY-MM-DD-event-name.md`.

Make sure to add at least one of the following tags:

- On-Site
- Online
- Free

The file should contain the following front matter:

```md
---
title: 'Angular Athens 20th Meetup'
location: Athens, Greece
date: 2023-11-30
url: https://www.meetup.com/angular-athens/events/297342102/
logo: https://pbs.twimg.com/profile_images/1702641363437719553/xxXXoN41_400x400.jpg
tags:
  - Online
---
```

### Podcasts

To add a new podcast, create a new markdown file in the `angular-hub/src/content/podcasts` folder. The file name should be the name of the podcast in the format `podcast-name.md`.

The file should contain the following front matter:

```md
---
title: Ng-News
url: https://www.youtube.com/@ng-news
logo: assets/logos/ng-news.png
language: English
---
```
