import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editseller',
  templateUrl: './editseller.component.html',
  styleUrls: ['./editseller.component.scss']
})
export class EditsellerComponent implements OnInit {
  editId: number;
  sellerdataObj;
  singleobj;
  sellerFormEdit: FormGroup;
  submitted = false;

   // ********Start currencies S dropdown variables**********
   cursDropdownList = [];
   cursSelectedItems = [];
   cursDropdownSettings = {};
   // ********End Office S dropdown variables*************
 
   // ********Start Office S dropdown variables**********
   ofcsDropdownList = [];
   ofcsSelectedItems = [];
   ofcsDropdownSettings = {};
   // ********End Office S dropdown variables*************
 
   //*******mindate is disbale previous date */
   public minDate: Date = new Date();
   public dateValue: Date = new Date('');

  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.editId = Number(this.activatedroute.snapshot.params['id']);
    console.log(typeof (this.editId));
    this.sellerdataObj = JSON.parse(localStorage.getItem('sellerListObj'));
    console.log(this.sellerdataObj);
    this.singleobj = this.sellerdataObj.filter(x => x.id === this.editId);
    console.log(this.singleobj[0]);

    // To show selected items inside dropdown
    this.cursSelectedItems = this.singleobj[0].currencies;
    this.ofcsSelectedItems = this.singleobj[0].offices;

    // To display proper details for checkboxes
    if(this.singleobj[0].biddedDeals === 'Yes'){
      this.singleobj[0].biddedDeals = true;
    }
    else {
      this.singleobj[0].biddedDeals = false;
    }
    if(this.singleobj[0].guarntDeals === 'Yes'){
      this.singleobj[0].guarntDeals = true;
    }
    else {
      this.singleobj[0].guarntDeals = false;
    }


    // To show input values on form when user comes for edit
    this.sellerFormEdit = this.fb.group({
      sellerName: [this.singleobj[0].sellername, [Validators.required]],
      currencies: [this.singleobj[0].currencies, [Validators.required]],
      offices: [this.singleobj[0].offices, [Validators.required]],
      sellerActDate: [this.singleobj[0].sellerActDate],
      dealTypeBidded: [this.singleobj[0].biddedDeals, [Validators.required]],
      dealTypeGuarnt: [this.singleobj[0].guarntDeals, [Validators.required]],
      contactName: [this.singleobj[0].contactName],
      emailAdd: [this.singleobj[0].emailAdd]
    })

    // ********Start currencies S dropdown*************
    this.cursDropdownList = [
      { "id": 1, "itemName": "USD" },
      { "id": 2, "itemName": "EUR" },
      { "id": 3, "itemName": "GBP" },
      { "id": 4, "itemName": "DZD" },
      { "id": 5, "itemName": "ARP" },
      { "id": 6, "itemName": "AUD" }
    ];
    this.cursDropdownSettings = {
      singleSelection: false,
      text: "Select Currencies",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    // ********End currencies S dropdown*************



    // ********Start Office S dropdown*************
    this.ofcsDropdownList = [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Germany" },
      { "id": 7, "itemName": "France" },
      { "id": 8, "itemName": "Russia" },
      { "id": 9, "itemName": "Italy" },
      { "id": 10, "itemName": "Sweden" }
    ];
    this.ofcsDropdownSettings = {
      singleSelection: false,
      text: "Select Offices",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    // ********End Office S dropdown*************

  }
  // convenience getter for easy access to form fields
  get f() { return this.sellerFormEdit.controls; }

  // ********Start currencies S dropdown actions*************
  cursOnItemSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerFormEdit.value.offices = this.ofcsSelectedItems;
  }
  cursOnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerFormEdit.value.offices = [];
  }
  cursOnSelectAll(items: any) {
    console.log(items);
    this.sellerFormEdit.value.offices = items;
  }
  cursOnDeSelectAll(items: any) {
    console.log(items);
    this.sellerFormEdit.value.offices = [];
  }

  // ********End currencies S dropdown actions*************

  // ********Start Office S dropdown actions*************
  ofcsOnItemSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerFormEdit.value.offices = this.ofcsSelectedItems;
  }
  ofcsOnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerFormEdit.value.offices = [];
  }
  ofcsOnSelectAll(items: any) {
    console.log(items);
    this.sellerFormEdit.value.offices = items;
  }
  ofcsOnDeSelectAll(items: any) {
    console.log(items);
    this.sellerFormEdit.value.offices = [];
  }

  // ********End Office S dropdown actions*************
  onEditSubmit() {
    this.submitted = true;
    let sellerEditValue = this.sellerFormEdit.value;
    console.log("inside update---");
    console.log(sellerEditValue);
    let dealValue, guarValue;
    // stop here if form is invalid
    if (this.sellerFormEdit.invalid) {
      return;
    }
    else {
      sellerEditValue.sellername = sellerEditValue.sellerName;
      sellerEditValue.id = this.editId;
      sellerEditValue.sellerActDate = this.datePipe.transform(sellerEditValue.sellerActDate, 'yyyy-MM-dd');

      if(sellerEditValue.dealTypeBidded){
        sellerEditValue.biddedDeals = "Yes"
      }
      else {
        sellerEditValue.biddedDeals = "No"
      }
      if(sellerEditValue.dealTypeGuarnt){
        sellerEditValue.guarntDeals = "Yes"
      }
      else {
        sellerEditValue.guarntDeals = "No"
      }

      this.sellerdataObj.splice(0,1,sellerEditValue);
      console.log("update object");
      console.log(this.sellerdataObj);
      
      
      localStorage.setItem('sellerListObj', JSON.stringify(this.sellerdataObj));
      localStorage.setItem('StatusAcion', 'Edit');
      this.router.navigate(['sellerlist']);

    }

  }

}
