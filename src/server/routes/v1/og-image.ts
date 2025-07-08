/*
import { ImageResponse } from '@analogjs/content/og';
import { Event } from '../../../models/event.model';

export default defineEventHandler(async (event) => {
  const data = await fetch('https://angular-hub.com/api/v1/events/upcoming');
  const events: Event[] = await data.json();
  const eventLength = events.length;
  const topEvents = events.slice(0, 3);

  const fontFile = await fetch(
    'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff',
  );
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();
  const query = getQuery(event); // query params

  const template = `
    <div tw="bg-[#303030] text-slate-200 flex flex-col w-full h-full items-center justify-center">
        <div class="flex justify-center items-center gap-4">
            <img src="https://angular-hub.com/assets/images/logo.png" width="200" height="200" alt="OG Playground" />
            <h1 class="text-8xl text-[#00B8E6]">ANGULAR HUB</h1>
        </div>
        <h2 class="text-6xl text-center">Discover ${eventLength} upcoming community events</h2>
      </div>
  `;

  const cards = `
   ${topEvents.map((event) => {
     return `<h4 class="text-xl font-bold my-1">
      ${event.name}
    </h4>
    <div class="flex gap-4 mb-2">
      <div class="flex justify-center items-center w-20 h-20">
        <img
          class="rounded-xl"
          [src]="${event.community?.logo}"
          aria-hidden="true"
          height="70"
          width="70"
          alt=""
        />
      </div>
      <div class="flex-1">
        <span class="font-bold text-primary" itemprop="date">
          ${event.date}
          ${event.endDate ? '- ' + event.endDate : ''}
        </span>
      </div>
    </div>`;
   })}
  `;

  return new ImageResponse(template, {
    debug: true, // disable caching
    fonts: [
      {
        name: 'Inter Latin',
        data: fontData,
        style: 'normal',
      },
    ],
  });
});
*/