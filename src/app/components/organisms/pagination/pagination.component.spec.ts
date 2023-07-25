import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct page number when navigateToPage() is called', () => {
    const pageNumber = 3;
    spyOn(component.$navigateToPage, 'emit');
    component.navigateToPage(pageNumber);
    expect(component.$navigateToPage.emit).toHaveBeenCalledWith(pageNumber);
  });

  it('should emit navigateToPreviousPage when navigateToPreviousPage() is called', () => {
    spyOn(component.$navigateToPreviousPage, 'emit');
    component.navigateToPreviousPage();
    expect(component.$navigateToPreviousPage.emit).toHaveBeenCalled();
  });

  it('should emit navigateToNextPage when navigateToNextPage() is called', () => {
    spyOn(component.$navigateToNextPage, 'emit');
    component.navigateToNextPage();
    expect(component.$navigateToNextPage.emit).toHaveBeenCalled();
  });

  it('should return the correct pagination numbers in getPaginationNumbers()', () => {
    component.currentPage = 3;
    component.totalPages = 5;
    const expectedNumbers = [1, 2, 3, 4, 5];
    expect(component.getPaginationNumbers()).toEqual(expectedNumbers);
  });
});
