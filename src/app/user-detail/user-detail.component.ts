import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../interfaces/user.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  imports: [HttpClientModule, CommonModule],
  providers: [DataService],
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: User | undefined = undefined;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap?.get('id');
    if (idParam === null || idParam === undefined || isNaN(+idParam)) {
      this.error = 'Invalid user id';
      return;
    }
    const id = +idParam;
    if (!this.dataService.hasUsers()) {
      this.dataService.getUsers().subscribe({
        next: (users) => {
          this.dataService.setUsers(users);
          this.setUser(id);
        },
        error: (error) => {
          this.error = 'Error fetching users';
          console.error(error);
        },
      });
    } else {
      this.setUser(id);
    }
  }

  setUser(id: number) {
    this.user = this.dataService.getUserById(id);
    if (!this.user) {
      this.error = 'User not found';
    }
  }
}
