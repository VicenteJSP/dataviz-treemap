import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ejemplo: Treemap con D3.js';
  usuario: string;

  buscarUsuario(usuario: string) {
    // this.usuario = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json';
    this.usuario = './assets/documents/ejemplo.json';
  }
}
