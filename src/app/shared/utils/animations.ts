import { trigger, state, style, animate, transition } from '@angular/animations';

export const appearFromLeft = trigger('appearFromLeft', [
  state('void', style({ transform: 'translateX(-20%)', opacity: 0 })),
  state('*', style({ transform: 'translateX(0)', opacity: 1 })),
  transition(':enter', animate('100ms ease-in')),
]);
