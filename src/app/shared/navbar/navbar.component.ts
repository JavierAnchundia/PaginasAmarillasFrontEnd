import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { NavBarService } from '../../services/navBarInfo/nav-bar.service';
import { ProvinciaService } from 'src/app/services/provincia/provincia.service';
import { Subscription } from 'rxjs';
import {Provincia} from '../../models/provincia.model';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';


import { initFlowbite } from 'flowbite';
import { initCollapses, }from 'flowbite'
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit, OnDestroy{


  imPostulante:boolean = false;
  
  
  pressedSideBar = false;
  pressedProfile = false;
  isAdmin = false;
  
  private user: any;


  private navBarServiceSubscription: Subscription | undefined;

  lista_provinciasNavBar: Provincia[] = [];
  lista_provinciasSelectedNavBar: any[] = [];

  provinciaForm = new FormGroup({
    provinciasFormControlNavBar: this.formBuilder.array([]),

  });

  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  constructor(public categoriaService: CategoriaService,private router: Router, private navBarService: NavBarService,  
    private formBuilder: FormBuilder, private userService:UserService,  public provinciaService:ProvinciaService,
  
  )
  {

    
  }
  
  ngOnInit(): void 
  {
    initFlowbite();
    initCollapses();

    this.provinciaService.getAllProvincias().subscribe(
      {
        

        next: value => 
        {
          console.log(value)
          this.lista_provinciasNavBar = value as Provincia[];
          for (var provincia of this.lista_provinciasNavBar) {
            this.provinciasFormControlNavBar.push(this.formBuilder.control(''));
          }

        
        },
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al cargar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
      })

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
        console.log(this.router.url);
        console.log(imPostulante);
        console.log(this.imPostulante);


        this.imPostulante = imPostulante;

        /*if(this.router.url == "/inicio/solicitar")
          {
            //Aqui se lo setea en false, porque en el
            this.imPostulante = false;

          }

        else
        {
          this.imPostulante = imPostulante;
        }*/
      }
    );

    this.user = {
      email: ' ',
      password: ' '
    };


    //METODO QUE ES LLAMADA CUANDO EXISTA ALGUN CAMBIO EN LA LISTA DE PROVINCIAS
    this.provinciasFormControlNavBar.valueChanges.subscribe
      (
        provinciasListControls => 
        {
          console.log(provinciasListControls)
          console.log(this.provinciasFormControlNavBar.value)

          this.lista_provinciasSelectedNavBar = [] as any[];
          //Recorro con un for cada uno de los controles
          for (let i = 0; i < provinciasListControls.length; i++) 
          {
              
            console.log(provinciasListControls[i])

            if(provinciasListControls[i] == true)
            {
              this.lista_provinciasSelectedNavBar.push(this.lista_provinciasNavBar[i].id)
              const categoriaForm = new FormData();

              /*categoriaForm.append('categoria',this.lista_provinciasNavBar[i].id as string);
  
              this.categoriaService.getSubcategoriasInCategoria(categoriaForm).subscribe(
                {
                  
  
                  next: value => 
                  {
  
                    
                    for (var subcategoria of value as any as Subcategoria[]) {
                      
                      this.lista_subcategories.push(new Subcategoria(this.lista_categories[i].nombre.concat("-").concat(subcategoria.nombre as string) ))
                      this.subcategoriasFormControl.push(this.formBuilder.control(''));

                    }
  
  
                    
                    console.log(this.lista_subcategories)
                  
                  },
                  error: err => {
                    console.error('Error:' + err);
                    alert("Hubo un error al cargar los datos, intentelo de nuevo");
                    throw new Error(err);
            
                  }
                })*/

            }
            
          }

          this.provinciaService.setlistOfProvinciasObservable(this.lista_provinciasSelectedNavBar)
          console.log(this.lista_provinciasSelectedNavBar);

        }
      );
  }

  get provinciasFormControlNavBar() {
    return this.provinciaForm.get('provinciasFormControlNavBar') as FormArray;
  }



  get f(){
    return this.provinciaForm.controls;
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

    console.log(this.imPostulante);

  }

  onPressedBuscarServicio()
  {
    this.router.navigate(['inicio/buscarProducto']);
    this.imPostulante = false;

    if(this.pressedSideBar)
    {
      this.pressedSideBar =  !this.pressedSideBar;

    }
    console.log(this.imPostulante);

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


