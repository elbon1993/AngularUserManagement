import { Component, OnInit, ViewChild } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit{

  usersList: User[] = [];
  displayedColumns: string[] = ['userid', 'name', 'age', 'email', 'gender', 'aboutme', 'edit'];
  usersListBind = JSON.parse(localStorage.getItem('usersList'));

  ngOnInit() {
    // localStorage.setItem('usersList', JSON.stringify(this.usersList));
  }

  updateUser(user: User) {
    this.usersList = JSON.parse(localStorage.getItem('usersList'));
    if(this.usersList){
      this.usersList = this.usersList.filter(userDetails => {
        if(user.userid != userDetails.userid)
          return true;
        else
          return false;
      });
      this.usersList.push(user);
    } else {
      this.usersList = [];
    }
    this.usersList.sort((user1: any, user2: any) => { return user1.userid - user2.userid});
    this.usersListBind = this.usersList;
    localStorage.setItem('usersList', JSON.stringify(this.usersList));
  }

  @ViewChild(AddUserComponent, { static: false}) user: AddUserComponent;

  loadUser(userid: string) {
    let selectedUser = this.usersListBind.reduce((acc, user) => { 
      if(user.userid == userid) 
        return user; 
      else 
        return acc; 
    }, {});
    this.user.setUser(selectedUser);
  }

}

export interface User {
  userid: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  aboutme: string;
  dob: string;
}