import {trigger, state, style, animate, transition, query, animateChild, stagger} from '@angular/animations';

export const appearFromLeft = trigger('appearFromLeft', [
  state('void', style({ transform: 'translateX(-40%)', opacity: 0 })),
  state('*', style({ transform: 'translateX(0)', opacity: 1 })),
  transition(':enter', animate('250ms ease')),
]);

export const staggerEffect = trigger('stagger', [
  transition(':enter', [
    query(':enter', stagger('.1s', [animateChild()]))
  ])
]);

export const dropdownArrow=  trigger('dropdownArrow', [
  state('true', style({ transform: 'rotate(90deg)' })),
  state('false', style({ transform: 'rotate(-90deg)' })),
  transition('true <=> false', animate('150ms linear')),
]);



