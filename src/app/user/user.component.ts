import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: []
})
export class UserComponent implements OnInit {
  public user: { name: string };
  isLoggedIn = false;
  public data: string;

  constructor(private userService: UserService, private dataService: DataService) {
  }

  ngOnInit() {
    this.user = this.userService.user;
    this.dataService.getDetails().then((val: string) => {
      this.data = val;
    });
  }

}
