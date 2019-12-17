import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChange } from '@angular/core';
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

  crearTreemap() {
    console.log('Creando Treemap');
    this.margin = { top: 10, right: 10, bottom: 10, left: 10 };
    this.width = 445 - this.margin.right - this.margin.left;
    this.height = 445 - this.margin.top - this.margin.bottom;

    const elemento = this.treemapContent.nativeElement;

    const svg = d3.select(elemento).append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    d3.json(this.data).then(
      (data: any) => {

        const root = d3.hierarchy(data).sum(d => d.value);

        d3.treemap().size([this.width, this.height]).padding(2)(root);

        svg.selectAll('rect')
          .data(root.leaves())
          .enter().append('rect')
          .attr('x', (d: any) => d.x0)
          .attr('y', (d: any) => d.y0)
          .attr('width', (d: any) => d.x1 - d.x0)
          .attr('height', (d: any) => d.y1 - d.y0)
          .style('stroke', 'black')
          .style('fill', 'slateblue');
        console.log();
        svg.selectAll('text')
          .data(root.leaves())
          .enter().append('text')
          .attr('x', (d: any) => d.x0 + 5 )
          .attr('y', (d: any) => d.y0 + 20 )
          .text( (d: any) => d.data.name )
          .attr('font-size', '15px')
          .attr('fill', 'white');
      },
      (err: any) => console.log(err)
    );
  }

}
