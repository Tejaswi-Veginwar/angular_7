import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Router } from "@angular/router";

import { Iseller } from '../iseller';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  // ********Seller form
  sellerForm: FormGroup;
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

  constructor(private fb: FormBuilder, private router: Router, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.sellerForm = this.fb.group({
      sellerName: ['', [Validators.required]],
      currencies: [[], [Validators.required]],
      offices: [[], [Validators.required]],
      dealTypeBidded: [false, [Validators.required]],
      dealTypeGuarnt: [true, [Validators.required]],
      sellerActDate: [this.dateValue, [Validators.required]],
      contactName: [''],
      emailAdd: ['', [Validators.email]]
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
      { "id": 1, "itemName": "United States" },
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
  get f() { return this.sellerForm.controls; }

  // ********Start currencies S dropdown actions*************
  cursOnItemSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerForm.value.offices = this.ofcsSelectedItems;
  }
  cursOnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerForm.value.offices = [];
  }
  cursOnSelectAll(items: any) {
    console.log(items);
    this.sellerForm.value.offices = items;
  }
  cursOnDeSelectAll(items: any) {
    console.log(items);
    this.sellerForm.value.offices = [];
  }

  // ********End currencies S dropdown actions*************

  // ********Start Office S dropdown actions*************
  ofcsOnItemSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerForm.value.offices = this.ofcsSelectedItems;
  }
  ofcsOnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.ofcsSelectedItems);
    this.sellerForm.value.offices = [];
  }
  ofcsOnSelectAll(items: any) {
    console.log(items);
    this.sellerForm.value.offices = items;
  }
  ofcsOnDeSelectAll(items: any) {
    console.log(items);
    this.sellerForm.value.offices = [];
  }

  // ********End Office S dropdown actions*************


  onSubmit() {
    this.submitted = true;
    let sellerValue = this.sellerForm.value;
    let dealValue, guarValue;
    // stop here if form is invalid
    if (this.sellerForm.invalid) {
      return;
    }
    else {
      if(sellerValue.dealTypeBidded){
        dealValue = "Yes"
      }
      else {
        dealValue = "No"
      }
      if(sellerValue.dealTypeGuarnt){
        guarValue = "Yes"
      }
      else {
        guarValue = "No"
      }
      
      var data = JSON.parse(localStorage.getItem('sellerListObj'));
      console.log("save insde---", data);
    
        var newObj: Iseller = {
          id: Math.floor((Math.random() * 100) + 1),
          sellername: sellerValue.sellerName,
          currencies: sellerValue.currencies,
          offices: sellerValue.offices,
          biddedDeals: dealValue,
          guarntDeals: guarValue,
          sellerActDate: this.datePipe.transform(sellerValue.sellerActDate, 'yyyy-MM-dd'),
          contactName: sellerValue.contactName,
          emailAdd: sellerValue.emailAdd
        }
        console.log("newObj---" + newObj.biddedDeals);
        data.push(newObj);
        console.log(data);
        localStorage.setItem('sellerListObj', JSON.stringify(data));
        localStorage.setItem('StatusAcion', 'Save');
        this.router.navigate(['sellerlist']);
    }

  }
}
