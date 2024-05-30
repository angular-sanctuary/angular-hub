/// <reference types="vite/client" />

declare module '*.analog' {
  import { Type } from '@angular/core';
  const cmp: Type<unknown>;
  export default cmp;
}
