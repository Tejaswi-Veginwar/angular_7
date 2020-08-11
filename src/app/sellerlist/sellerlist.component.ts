import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Iseller } from '../iseller';


@Component({
  selector: 'app-sellerlist',
  templateUrl: './sellerlist.component.html',
  styleUrls: ['./sellerlist.component.scss']
})
export class SellerlistComponent implements OnInit {
  // *******deleteSelected
  SelectedIDs: any[] = [];
  disabledDelSel: boolean = true;

  sellerListObj: Iseller[] = [
    // { "id": 2, "itemName": "EUR" },{ "id": 6, "itemName": "AUD" }
    { id: 1, sellername: "Test Seller 1", currencies: [{ "id": 1, "itemName": "USD" }], offices: [{ "id": 1, "itemName": "United States" }], biddedDeals: 'No', guarntDeals: 'Yes', sellerActDate: "2020-07-09", contactName: "Test Seller 1", emailAdd: "testseller1@gmail.com"  },
    { id: 2, sellername: "Test Seller 2", currencies: [{ "id": 6, "itemName": "AUD" }], offices: [{ "id": 2, "itemName": "Singapore" }], biddedDeals: 'Yes', guarntDeals: 'Yes', sellerActDate: "2020-07-11", contactName: "Test Seller 2", emailAdd: "testseller2@cybage.com" }
  ]

  constructor(private router: Router) {
    // First time when we travals from sellerlist to edit
    console.log("constructor called-------");
    
    // localStorage.setItem('sellerListObj', JSON.stringify(this.sellerListObj));
  }
  ngOnInit() {
    // localStorage.clear();
    console.log("ngOnit callled---------");
    let status = localStorage.getItem('StatusAcion');
    if(status == 'Save'){
      console.log("inside save");
      
      let sellerListObjNew = JSON.parse(localStorage.getItem('sellerListObj'));
      this.sellerListObj = sellerListObjNew
    }
    else  {
      console.log("inside else");
      this.sellerListObj = JSON.parse(localStorage.getItem('sellerListObj'));
    }
  }

  getCurrList(obj) {
    console.log(obj.map(x => x.itemName).join(","));
  }
  //sorting
  key: string = 'sellername'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  //initializing p to one
  p: number = 1;

  deleteRow(id) {
    for (let i = 0; i < this.sellerListObj.length; ++i) {
      if (this.sellerListObj[i].id === id) {
        this.sellerListObj.splice(i, 1);
      }
    }
  }

  selectID(id, event) {
    this.SelectedIDs.push(id);
    console.log(this.SelectedIDs[0] + "---seee");
    if(this.SelectedIDs.length > 0){
      this.disabledDelSel = false;
    }
    else {
      this.disabledDelSel = true;
    }
  }

  deleteSelected() {
    for(let i = 0; i < this.sellerListObj.length; ++i) {
      for(let j = 0; j < this.SelectedIDs.length; j++){
        if (this.sellerListObj[i].id === this.SelectedIDs[j]) {
            this.sellerListObj.splice(i, 1);
            // To disable the button
            this.disabledDelSel = true;
        }
      }
    }
  }


  addNewSeller() {
    console.log("called after");
    localStorage.setItem('sellerListObj', JSON.stringify(this.sellerListObj));
    console.log(JSON.parse(localStorage.getItem('sellerListObj')));

    this.router.navigate(['sellerform']);
  }

  editRow(selectedId) {
    localStorage.setItem('sellerListObj', JSON.stringify(this.sellerListObj));
    this.router.navigate(['/edit', selectedId]);
  }

  
}

