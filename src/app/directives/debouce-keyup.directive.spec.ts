import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebouceKeyupDirective } from './debouce-keyup.directive';

@Component({
  template: `
    <input appDebouceKeyup (debounceKeyup)="onDebounceKeyup($event)">
  `
})
class TestComponent {
  onDebounceKeyup(event: Event) {
    // Handle the event
  }
}

describe('DebouceKeyupDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebouceKeyupDirective, TestComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(DebouceKeyupDirective));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit debounceKeyup event on keyup event', (done) => {
    const input = inputEl.nativeElement as HTMLInputElement;
    const event = new Event('keyup');
    spyOn(component, 'onDebounceKeyup');
    input.dispatchEvent(event);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onDebounceKeyup).toHaveBeenCalledWith(event);
      done();
    });
  });
});
