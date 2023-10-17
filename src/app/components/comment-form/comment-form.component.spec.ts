import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentFormComponent } from './comment-form.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, CommentFormComponent], // Add HttpClientModule to the imports array
    });
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
