import { FormGroup, AbstractControl } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
      }

      if (control.value !== matchingControl.value) {
          return {'passwordNotMatching': {value: control.value}}
      } else {
          return;
      }
  }

  // return (control: AbstractControl): {[key: string]: any} | null => {

  //   const control = formGroup.controls[controlName];
  //   const matchingControl = formGroup.controls[matchingControlName];
  //   if (control.value !== matchingControl.value)
  //   return forbidden ? {'forbiddenName': {value: control.value}} : null;
  // };
}
