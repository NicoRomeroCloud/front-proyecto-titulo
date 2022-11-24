import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormMySPlantasService } from 'src/app/services/shop-form-my-splantas.service';

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
  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormMySPlantasService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
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

  }
  copyShippingAddressToBillingAddress(event){

    if (event.target.checked) {
       this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset;
      
    }
  }
  

  onSubmit(){
    console.log("info enviada");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('customer').value.email);

  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // si el año actual es igual al año seleccionado, entonces comience con el mes actual

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

}
