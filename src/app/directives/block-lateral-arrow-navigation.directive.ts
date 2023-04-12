import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[BlockLateralArrowNavigation]'
})
export class BlockLateralArrowNavigationDirective {
    @HostListener("keydown.arrowleft", ["$event"]) arrowLeftPressed(
        event: KeyboardEvent
    ) {
        event.stopPropagation();
    }

    @HostListener("keydown.arrowright", ["$event"]) arrowRightPressed(
        event: KeyboardEvent
    ) {
        event.stopPropagation();
    }

    @HostListener("keydown.arrowup", ["$event"]) arrowUpPressed(
        event: KeyboardEvent
    ) {
        event.stopPropagation();
    }

    @HostListener("keydown.arrowdown", ["$event"]) arrowDownPressed(
        event: KeyboardEvent
    ) {
        event.stopPropagation();
    }

    constructor() {
    }
}
