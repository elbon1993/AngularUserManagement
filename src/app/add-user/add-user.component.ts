import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() onUpdate = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  AddEditBtn = 'Add';

  userForm;

  ngOnInit() {
    this.userForm = this.fb.group({
      userid: ['', Validators.required],
      username: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      aboutme: ['']
    });
  }

  setUser(user: any) {
    this.AddEditBtn = 'Update';
    this.userForm.setValue(user);
  }

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userForm.value);
    this.onUpdate.emit(this.userForm.value);
    this.userForm.reset();
    this.AddEditBtn = 'Add';
  }

  resetAddEditBtn() {
    this.AddEditBtn = 'Add';
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}