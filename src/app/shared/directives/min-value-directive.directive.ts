import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[minValue][formControlName],[minValue][formControl],[minValue][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValueDirectiveDirective, multi: true}]
})
export class MinValueDirectiveDirective implements Validator{

  @Input()
  minValue: number;

  validate(c: FormControl): {[key: string]: any} {
    let v = c.value;
    return ( v < this.minValue)? {"minValue": true} : null;
  }

}
