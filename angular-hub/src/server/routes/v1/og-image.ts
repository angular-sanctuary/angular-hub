import { ImageResponse } from '@analogjs/content/og';
import { Event } from '../../../models/event.model';

export default defineEventHandler(async (event) => {
  const data = await fetch('http://localhost:4200/api/v1/events/upcoming');
  const events: Event[] = await data.json();
  const eventLength = events.length;
  const topEvents = events.slice(0, 3);

  const fontFile = await fetch(
    'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff',
  );
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();
  const query = getQuery(event); // query params

  const template = `
    <div tw="bg-gray-50 flex flex-col w-full h-full items-center justify-center">
        <h2 class="text-5xl">${eventLength} upcoming events</h2>
     ${topEvents.map((event) => `${event.name}`)}
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
