import { Component, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnChanges {

  @ViewChild('treemap', { static: true }) private treemapContent: ElementRef;
  @Input() data: string;
  margin: any;
  width: number;
  height: number;

  constructor() { }

  ngOnChanges() {
    this.crearTreemap();
  }

  onResize(evento: any) {
    this.crearTreemap(evento.target.innerWidth - 100, evento.target.innerHeight - 300);
  }

  crearTreemap(width: number = 645, height: number = 645) {
    console.log('Creando Treemap');
    this.margin = { top: 10, right: 10, bottom: 10, left: 10 };
    this.width = width - this.margin.right - this.margin.left;
    this.height = height - this.margin.top - this.margin.bottom;

    const elemento = this.treemapContent.nativeElement;

    const seleccion = d3.select(elemento);
    seleccion.select('svg').remove();

    const svg = seleccion.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    console.log(this.data);
    d3.json(this.data).then(
      (data: any) => {

        const root = d3.hierarchy(data).sum(d => d.value);

        d3.treemap().size([this.width, this.height]).padding(2)(root);

        const color = d3.scaleOrdinal()
          .domain(['infoPersonal', 'infoTweets', 'idiomaPlataforma'])
          .range(['#0D0D0D', '#05F2DB', '#1DB6F2', '#0583F2', '#0511F2']);

        (svg.selectAll('rect') as any)
          .data(root.leaves())
          .enter().append('rect')
          .attr('x', (d: any) => d.x0)
          .attr('y', (d: any) => d.y0)
          .attr('width', (d: any) => d.x1 - d.x0)
          .attr('height', (d: any) => d.y1 - d.y0)
          .style('stroke', 'black')
          .style('fill', (f: any) => color(f.parent.data.name));
        console.log();
        svg.selectAll('text')
          .data(root.leaves())
          .enter().append('text')
          .attr('x', (d: any) => d.x0 + 5 )
          .attr('y', (d: any) => d.y0 + 20 )
          .text( (d: any) => d.data.colname )
          .attr('font-size', '15px')
          .attr('fill', 'white');
      },
      (err: any) => console.log(err)
    );
  }

}
