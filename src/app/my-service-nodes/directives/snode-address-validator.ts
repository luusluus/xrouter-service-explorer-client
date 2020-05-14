import { Directive, OnInit, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[servicenodeAddressValidator][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: ServicenodeAddressValidatorDirective, multi: true}
  ]
})
export class ServicenodeAddressValidatorDirective implements Validator {
    @Input("serviceNodes") serviceNodes:any = [];

    constructor() {}

    validate(control: AbstractControl): ValidationErrors | null {
        /* validation rules */
        const address = control.value;

        /* check validation rules */
        if(this.serviceNodes !== undefined){
            const addressToCheck = this.serviceNodes.items.find(sn => sn.address === address);
            if (addressToCheck !== undefined) {
                return null;
            } else {
                return { servicenodeAddressValidator: true };
            }
        }
            
        return { servicenodeAddressValidator: true };
    }

}