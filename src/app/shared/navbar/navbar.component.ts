import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { NavBarService } from '../../services/navBarInfo/nav-bar.service';
import { Subscription } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit, OnDestroy{


  imPostulante:boolean = true;
  
  
  pressedSideBar = false;
  pressedProfile = false;
  isAdmin = false;
  
  private user: any;


  private navBarServiceSubscription: Subscription | undefined;


  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  constructor(public categoriaService: CategoriaService,private router: Router, private navBarService: NavBarService,  
    private formBuilder: FormBuilder, private userService:UserService)
  {

    
  }
  
  ngOnInit(): void 
  {

    if (localStorage.getItem('token') && localStorage.getItem('refresh')) {
      const expiresIn = JSON.parse(localStorage.getItem('user')|| '{}').exp;
      const tokenDuration = new Date(expiresIn * 1000).getTime() - new Date().getTime();
      if (tokenDuration <= 300000) {
        this.userService.logoutUser();
      }

      else
      {
        this.isAdmin = true;
      }
    }
   
    
    //Esta parte permite que se envie el valor que se esta modificando al navbar y pueda cambiar los labeles y botones correspondientes
    this.navBarServiceSubscription = this.navBarService.imPostulante.subscribe(
      imPostulante => {
        this.imPostulante = imPostulante;
      }
    );

    this.user = {
      email: ' ',
      password: ' '
    };
  }


  onClickedProfile()
  {
    this.pressedProfile =  !this.pressedProfile;

  }


  onPressedCerrarSesion()
  {
    this.userService.logoutUser();
    if (!localStorage.getItem('token') && !localStorage.getItem('refresh')) 
    {
     
        this.isAdmin = false;
      
    }

  }

  onClickedMenu()
  {
    this.pressedSideBar =  !this.pressedSideBar;

  }


  onPressedAdministrarProductos() 
  {
    this.router.navigate(['inicio/administrarProveedor']);
    this.pressedSideBar =  !this.pressedSideBar;

  }


  onPressedPostularProveedor() 
  {
    this.router.navigate(['inicio/solicitar']);
    this.imPostulante = true;

    if(this.pressedSideBar)
    {
      this.pressedSideBar =  !this.pressedSideBar;

    }

  }

  onPressedBuscarServicio()
  {
    this.router.navigate(['inicio/buscarProducto']);
    this.imPostulante = false;

    if(this.pressedSideBar)
    {
      this.pressedSideBar =  !this.pressedSideBar;

    }

  }
  onPressedAdministrarPostulantes() 
  {
    this.router.navigate(['inicio/administrarPostulantes']);
    this.pressedSideBar =  !this.pressedSideBar;

  }


  ngOnDestroy(): void {
    this.navBarServiceSubscription?.unsubscribe();
  }
  





  onSubmit() {
    // TODO: Use EventEmitter with form value

    const loginInternForm = new FormData();

    
    this.user.email = this.loginForm.value.email as string;
    this.user.password = this.loginForm.value.password as string;


    console.log(this.loginForm.value.email as string);
    console.log(this.loginForm.value.password as string);

    this.userService.loginUser(this.user).subscribe(
      {
        

        next: value => 
        {
          this.isAdmin = true;

          this.onClickedProfile();
          
          console.log(value)
        
        },
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al cargar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
      })

  }










}


