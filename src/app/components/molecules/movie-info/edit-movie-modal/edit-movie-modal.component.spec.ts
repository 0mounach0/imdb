import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMovieModalComponent } from './edit-movie-modal.component';

describe('EditMovieModalComponent', () => {
  let component: EditMovieModalComponent;
  let fixture: ComponentFixture<EditMovieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMovieModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize years array correctly', () => {
    const currentYear = new Date().getFullYear();
    const expectedYears = [];
    for (let year = currentYear; year >= 1700; year--) {
      expectedYears.push(year);
    }
    expect(component.years).toEqual(expectedYears);
  });

  it('should emit null when cancelChanges() is called', () => {
    spyOn(component.closed, 'emit');
    component.cancelChanges();
    expect(component.closed.emit).toHaveBeenCalledWith(null);
  });

  it('should emit updated movie data when saveChanges() is called', () => {
    const updatedMovie = { ...component.movie };
    spyOn(component.closed, 'emit');
    component.saveChanges();
    expect(component.closed.emit).toHaveBeenCalledWith(updatedMovie);
  });
});
