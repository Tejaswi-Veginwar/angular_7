import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';



fdescribe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerComponent ],
      // Imported as per requriment
      imports: [
        FormsModule, 
        ReactiveFormsModule,
        AngularMultiSelectModule,
        DatePickerModule,
        RouterTestingModule.withRoutes([]),
      
      ],
      providers: [DatePipe]
    })
    .compileComponents().then(() => {
     
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('form invalid when empty', () => {
      expect(component.sellerForm.valid).toBeFalsy();
    });
  
  it('email field validity', () => {
    let email = component.sellerForm.controls['emailAdd'];
    expect(email.valid).toBeTruthy();
  })

  it('submitting a form', () => {
    expect(component.sellerForm.valid).toBeFalsy();
    component.sellerForm.controls['sellerName'].setValue("TestSellerFromTest");
    component.sellerForm.controls['currencies'].setValue('{ "id": 1, "itemName": "USD" }');
    component.sellerForm.controls['offices'].setValue('{ "id": 4, "itemName": "Canada" }');
    component.sellerForm.controls['dealTypeBidded'].setValue(true);
    component.sellerForm.controls['dealTypeGuarnt'].setValue(true);
    component.sellerForm.controls['sellerActDate'].setValue('2020-07-10');
    expect(component.sellerForm.valid).toBeTruthy();

   // component.onSubmit();
    
    
  })

});
