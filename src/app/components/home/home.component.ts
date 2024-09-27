import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.loadJsFile("assets/js/dashboards-analytics.js", false, false);  
  }

  loadJsFile(url: string, async: boolean, defer: boolean) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    node.async = async;
    node.defer = defer;
    document.getElementsByTagName('head')[0].appendChild(node);  
  } 

}
