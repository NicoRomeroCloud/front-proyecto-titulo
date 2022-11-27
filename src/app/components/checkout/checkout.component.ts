import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { ShopFormMySPlantasService } from 'src/app/services/shop-form-my-splantas.service';
import { MySPlantasValidators } from 'src/app/validators/my-splantas-validators';

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

  countries: Country[] = [];
  shippingAddresStates: State[] = [];
  billingAddresStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormMySPlantasService,
              private cartService: CartService) { }

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
    }

    console.log("info enviada");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('customer').value.email);
    console.log("el pais de direccion de compra es: " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("la region de direccion de compra es: " + this.checkoutFormGroup.get('shippingAddress').value.state.name);


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
