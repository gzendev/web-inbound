import {Directive, Input, forwardRef} from '@angular/core';
import {NG_VALIDATORS, AbstractControl, Validator, Validators, ValidatorFn} from '@angular/forms';
import {NativeDateAdapter} from '@angular/material';
import {format, parse} from 'date-fns/esm';

import {Constants} from '@utils/constants';

export class AngularMaterialDateAdapter extends NativeDateAdapter {

  private static readonly MONTH_YEAR_FORMAT = 'MM/yyyy';

  public parse(value: any): Date | null {
    if (!value) {
      return null;
    }
    return parse(value, Constants.DATE_FORMAT, new Date());
  }

  public format(date: Date, displayFormat: any): string {
    if (displayFormat.year && displayFormat.month && displayFormat.day) {
      return format(date, Constants.DATE_FORMAT);
    }
    if (displayFormat.year && displayFormat.month) {
      return format(date, AngularMaterialDateAdapter.MONTH_YEAR_FORMAT);
    }
    return date.toDateString();
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => MaxValidatorDirective),  multi: true}],
})
export class MaxValidatorDirective implements Validator {

  private validator: ValidatorFn;

  @Input()
  public set max(max: string) {
    this.validator = Validators.max(parseInt(max, 10));
  }

  public validate(control: AbstractControl): {[key: string]: any} {
    return this.validator(control);
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => MinValidatorDirective),  multi: true}],
})
export class MinValidatorDirective implements Validator {

  private validator: ValidatorFn;

  @Input()
  public set min(min: string) {
    this.validator = Validators.min(parseInt(min, 10));
  }

  public validate(control: AbstractControl): {[key: string]: any} {
    return this.validator(control);
  }

  // retorna fecha en formato adecuado para API Gefco
  public getDate(timeStr: string): Date {
    return timeStr ? new Date(`${Constants.BASE_DATE.getFullYear()}-${Constants.BASE_DATE.getMonth()}-${Constants.BASE_DATE.getDay()} ${timeStr}:00`) : null;
  }

}
