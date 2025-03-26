import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateBeforeTodayValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      return { dateNotBeforeToday: true };
    }
  }
  return null;
}