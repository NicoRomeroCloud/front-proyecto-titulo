import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login2-status',
  templateUrl: './login2-status.component.html',
  styleUrls: ['./login2-status.component.css']
})
export class Login2StatusComponent implements OnInit {

  

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout():void{

    Swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesión de manera correcta`, 'success');
    this.authService.logout();

    this.router.navigateByUrl('/products');

  }

}
