import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { delay } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  arrData: User[] = []
  myUsers: User[] = []

  async ngOnInit(): Promise<void> {
    let response = this.arrData = await this.usersService.getAll()
    this.myUsers = response.data
    this.getId()
  }

  myUser: User[] | any

  getId() {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.id
      this.myUser = this.myUsers.find(user => user.id == id)
    })
  }

  deleteUsers($event: any){
    Swal.fire({
      title: 'Warning!',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      iconColor: 'red',

      showCancelButton: true,
      cancelButtonText: 'Cancel',

      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',

      reverseButtons: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/home'])
        let deleteUser: any = this.myUsers.find(user => user.id == $event.target.value)
        let deletePos: number = this.myUsers.indexOf(deleteUser)
        this.myUsers.splice(deletePos, 1)
        console.log(this.myUsers)
        
        Swal.fire({
          title: 'Exito',
          icon: 'success',
          text: 'Se a eliminado a ' + deleteUser.first_name + ' ' + deleteUser.last_name + ' correctamente',
          timer: 2500,
          showConfirmButton: false    
        })
      }
    })
  }
}
