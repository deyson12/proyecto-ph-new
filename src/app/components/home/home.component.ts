import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScriptLoaderService } from '../../services/script-loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private scriptLoaderService: ScriptLoaderService) {}

  ngOnInit(): void {
    this.scriptLoaderService.cargarScript("assets/js/dashboards-analytics.js", false, false);
  }

}
