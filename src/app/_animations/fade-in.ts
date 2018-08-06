// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [
 
        // route 'enter' transition
        transition(':enter', [
 
            // css styles at start of transition
            style({ opacity: 0, transform: 'translateX(-50%)' }),
 
            // animation and styles at end of transition
            
            animate('.4s', style({ opacity: 1, transform: 'translateX(0)' }))
        ]),
    ]);