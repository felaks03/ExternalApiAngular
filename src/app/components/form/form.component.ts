import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { createModifiersFromModifierFlags } from 'typescript';
import { CardUserComponent } from '../card-user/card-user.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myUsers!: User[] | undefined

  constructor
  (
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) 
  {
    this.formModel = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z ]{2,254}/)
      ]), 
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z ]{2,254}/)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\S+\@\S+\.[com,es]/)
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[https://]\S+\.[png, jpg, webp]/)
      ]),
    }, [])
  }

  idFind: number = 0
  myUser: User | undefined
  updating: boolean = false

  getUpdateUser() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.idFind = params.id
      console.log(this.idFind)
    })
    if(this.idFind != undefined){
        this.myUser = this.myUsers?.find(user => user.id == this.idFind)
        this.updating = true
    } else {
      this.updating = false
    }
  }

  formModel: FormGroup

  async ngOnInit(): Promise<void> {
    let response = await this.usersService.getAll()
    this.myUsers = response.data
    this.getUpdateUser()
  }

  id: number = 12

  async getData(){
    if(this.formModel.value){
      this.formModel.value.id = this.id
      this.id++
      let response = await this.usersService.getAll()
      this.myUsers = response.data
      this.myUsers?.push(this.formModel.value)

      if(this.updating){
        Swal.fire({
          title: 'Exito',
          icon: 'success',
          text: this.myUser?.first_name + ' ' + this.myUser?.last_name + ' se ha actualizado correctamente',
          timer: 3000,
          showConfirmButton: false    
        })
      } else {
        Swal.fire({
          title: 'Exito',
          icon: 'success',
          text: this.formModel.get('first_name')?.value + ' ' + this.formModel.get('last_name')?.value + ' se ha añadido correctamente',
          timer: 3000,
          showConfirmButton: false    
        })
      }
      this.router.navigate(['/home'])
    } else {
      alert("el formulario no está relleno")
    }
  }

  checkControl(_input: string, _error: string) {
    return this.formModel.get(_input)?.hasError(_error) && this.formModel.get(_input)?.touched
  }
}