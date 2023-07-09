import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebouceKeyup]'
})
export class DebouceKeyupDirective implements OnInit, OnDestroy {

  @Input() debounceTime = 500;
  private readonly onKeyupEvent: Observable<Event>;
  @Output() debounceKeyup = new EventEmitter();
  private subscription!: Subscription;

  constructor(private el: ElementRef) {
    this.onKeyupEvent = fromEvent(el.nativeElement, 'keyup');
  }

  ngOnInit() {
    this.subscription = this.onKeyupEvent
      .pipe(debounceTime(this.debounceTime))
      .subscribe(($event: Event) => this.keyupEvent($event));
  }

  keyupEvent(event: Event) {
    console.log("hereeee")
    event.preventDefault();
    event.stopPropagation();
    this.debounceKeyup.emit(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
