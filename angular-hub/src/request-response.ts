import { InjectionToken } from '@angular/core';
import type { IncomingMessage, ServerResponse } from 'http';

export const REQUEST = new InjectionToken<IncomingMessage>('ANALOG_REQUEST');
export const RESPONSE = new InjectionToken<ServerResponse>('ANALOG_RESPONSE');
