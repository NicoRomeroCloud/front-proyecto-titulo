import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal/public_api';
import { catchError, throwError } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Producto } from 'src/app/common/producto';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormMySPlantasService } from 'src/app/services/shop-form-my-splantas.service';
import { MySPlantasValidators } from 'src/app/validators/my-splantas-validators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

 


  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  cartItems: CartItem[] = [];

  countries: Country[] = [];
  shippingAddresStates: State[] = [];
  billingAddresStates: State[] = [];

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  public payPalConfig ?: IPayPalConfig;

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormMySPlantasService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  
        

  ngOnInit(): void {


    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                                  [Validators.required, 
                                  Validators.minLength(2), 
                                  MySPlantasValidators.notOnlyWhitespace]),
        lastName: new FormControl('', 
                                  [Validators.required, 
                                    Validators.minLength(2), 
                                    MySPlantasValidators.notOnlyWhitespace]),
        email: new FormControl('',
                                  [Validators.required, 
                                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    }),
        shippingAddress: this.formBuilder.group({
        street: new FormControl('', 
                [Validators.required, 
                Validators.minLength(2), 
                MySPlantasValidators.notOnlyWhitespace]),
        city: new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              MySPlantasValidators.notOnlyWhitespace]),
        state: new FormControl('', 
        [Validators.required]),
        country: new FormControl('', 
        [Validators.required]),
        zipcode: new FormControl('', 
                  [Validators.required, 
                  Validators.minLength(2), 
                  MySPlantasValidators.notOnlyWhitespace]),
    }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', 
                [Validators.required, 
                Validators.minLength(2), 
                MySPlantasValidators.notOnlyWhitespace]),
        city: new FormControl('', 
                              [Validators.required, 
                              Validators.minLength(2), 
                              MySPlantasValidators.notOnlyWhitespace]),
        state: new FormControl('', 
        [Validators.required]),
        country: new FormControl('', 
        [Validators.required]),
        zipcode: new FormControl('', 
                  [Validators.required, 
                  Validators.minLength(2), 
                  MySPlantasValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', 
        [Validators.required]),
        nameOnCard: new FormControl('', 
        [Validators.required, 
        Validators.minLength(2), 
        MySPlantasValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', 
        [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', 
        [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  
    const startMonth: number = new Date().getMonth() + 1;
    console.log("mes de comienzo: " + startMonth);

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    // años
    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Credit card años: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

    this.shopFormService.getCountries().subscribe(
      data => {
        console.log("viendo el país: " + JSON.stringify(data));
        this.countries = data;
      }
    );

    this.initConfig();

  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AcoluBHWBx0HqmdP0dE5-lDWMU15xi6UColezDKXPC3bllMYWxFIcEJsbXJDeMikPUpTyUyvvax-le2I',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalPrice.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalPrice.toString()
                        }
                    }
                },
                items: this.getItemsList()
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
           this.onSubmit();
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
         

        },
        onError: err => {
            console.log('OnError', err);
           
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
          
        }
    };

    
}

  getItemsList(): any[]{
    const items: any = [];
    let item = {};

    for(let tempCartItem of this.cartItems){
      item = {
        name: tempCartItem.name,
        quantity: tempCartItem.quantity,
        unit_amount: {currency_code: 'USD', value: tempCartItem.unitPrice}
        
      };
    console.log('HOLA DESDE ITEM LISTA XDDD'+ tempCartItem.name);
    console.log(this.cartService.totalPrice+'PRECIO DISEEEEEEEEEEEEN')

      items.push(item);
    }
    return items;
  }


  reviewCartDetails() {
  
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName')}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName')}
  get email(){return this.checkoutFormGroup.get('customer.email')}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city')}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')}
  get shippingAddressZipcode(){return this.checkoutFormGroup.get('shippingAddress.zipcode')}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street')}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city')}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state')}
  get billingAddressZipcode(){return this.checkoutFormGroup.get('billingAddress.zipcode')}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country')}

  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')}
  get creditCardnameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard')}
  get creditCardcardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')}
  get creditCardsecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode')}



  copyShippingAddressToBillingAddress(event){

    if (event.target.checked) {
       this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    
            //solucion de bug

            this.billingAddresStates = this.shippingAddresStates;

    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset;
      
      this.billingAddresStates = [];
    }
  }
  

  onSubmit(){

    

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //orden-configurar
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //obtener items
    const cartItems = this.cartService.cartItems;

    //crear ordenItems desde carrito
    //-camino largo
    let orderItms: OrderItem[] = [];
    for (let i = 0; i < cartItems.length; i++) {
      orderItms[i] = new OrderItem(cartItems[i]);
    }
    //camino corto
    //let orderItemsShort: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
  
    //compra-configurar
    let purchase = new Purchase();

    //poblar compra-cliente
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //poblar compra con direccion de compra
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));

    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    //poblar compra con direccion de facturacion
    purchase.billigAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const billigAddress1: State = JSON.parse(JSON.stringify(purchase.billigAddress.state));
    const billigAddress2: Country = JSON.parse(JSON.stringify(purchase.billigAddress.country));

    purchase.billigAddress.state = billigAddress1.name;
    purchase.billigAddress.country = billigAddress2.name;

    //poblar compra con orden y los items de la orden
    purchase.order = order;
    purchase.orderItems = orderItms;
    //llamar a la rest api por e CheckoutService
    console.log("entrando");
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {

          

          Swal.fire({icon: 'success',
                      title: `Su orden ha sido recibida de manera correcta.\nSu número de seguimiento de orden es: ${response.orderTrackingNumber}`,
                      showConfirmButton: true});
        
                      console.log("entrando 2");
          //resetear carrito
          this.resetCart();

        },
        error: err => {
          Swal.fire('Error',`Ha ocurrido un error: ${err.message}`);
        }
      }
    )
  
  
  }
  resetCart() {
    //reseteando info del carrito de compras
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //resetear el formulario
    this.checkoutFormGroup.reset();

    //ir a la pagina de productos
    this.router.navigateByUrl("/productos");
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // si el año actual es igual al año seleccionado, entonces comience con el mes actual

    // -si se selecciona el año actual
    //  -entonces solo mostrar los meses restantes del año
    //  -empezar en actual hasta 12

    // -1si se selecciona un año futuro
    //  -luego mostrar meses: 1-12

    let startMonth: number;

    if (currentYear === selectedYear) {
      
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("credit card en meses: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

  }

  getStates(formGroupName: string){
    const fromGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = fromGroup.value.country.code;
    const countryName = fromGroup.value.country.name;

    console.log(`${formGroupName} codigo del país: ${countryCode}`);
    console.log(`${formGroupName} nombre del país: ${countryName}`);

    this.shopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddresStates = data;
        }
        else{
          this.billingAddresStates = data;
        }

        fromGroup.get('state').setValue(data[0]);
      }
    );

  }


}
