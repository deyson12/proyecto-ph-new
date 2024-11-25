import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

constructor() {
  console.log('Entera a cons')
}

ngOnInit(): void {
    console.log('Entra a oninit');
}

}
