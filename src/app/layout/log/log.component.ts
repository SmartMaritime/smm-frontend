import { Component } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
    isSignUp = false;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }

  onLogin(form: any) {
    const { email, password } = form.value;
    console.log('Connexion avec', email, password);
    // → appelle ton service d'authentification ici
  }

  onRegister(form: any) {
    const { email, password, confirmPassword } = form.value;
    console.log('Inscription avec', email, password, confirmPassword);
    // → appelle ton service d'inscription ici
  }
}
