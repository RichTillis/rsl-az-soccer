import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
  styleUrls: ['./dynamic-form-item.component.scss'],
})
export class DynamicFormItemComponent implements OnInit {
  @Input() public formGroup: FormGroup;
  @Input() public formArray: FormArray;
  @Input() public item: string;
  itemName: string;
  
  constructor() { }

  ngOnInit() {
    this.itemName = this.item[0].toUpperCase() + this.item.slice(1);
    console.log(this.formGroup);
    console.log(this.item);
    console.log(this.formArray);
    //this.formArray = this.formGroup.controls.images;
  }

  addNewItem() : void {
    const control = <FormArray>this.formArray;
    control.push(this.formGroup);
  }

  removeItem(i : number) : void {
   const control = <FormArray>this.formArray;
   control.removeAt(i);
  }

}