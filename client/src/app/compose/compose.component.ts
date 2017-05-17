import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
    @ViewChild('drawCanvas') canvasRef: ElementRef;
    ctx: CanvasRenderingContext2D;

    @ViewChild('container') containerRef: ElementRef;
    @ViewChild('title') titleRef: ElementRef;

    stageWidth: number = 500;
    stageHeight: number = 300;
    color: string = "#ff7e00";

    clickX: any[] = [];
    clickY: any[] = [];
    clickDrag: any[] = [];
    drag: boolean = false;

    images: any[] = [];

    constructor(
        private http: Http,
    ) { }

    ngOnInit() {
      this.ctx = this.canvasRef.nativeElement.getContext('2d');

      this.loadImages("assets/smiley-cool.gif");
      this.loadImages("assets/gallery-field-thumb.jpg");
    }

    loadImages(imgPath) {
        let img = new Image();

        img.onload =  () => {
            this.images.push(img);
            this.drawImages();
        }

        img.src = imgPath;
    }

    drawImages() {
        if(this.images) {
            for (var i = 0; i < this.images.length; ++i) {
                this.ctx.drawImage(this.images[i], 100 * i, 55, 150, 110);
            }
        }
    }

    @HostListener('document:mouseup')
    onMouseUp() {
        this.drag = false;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
        console.log('click');
        var mouseX = event.pageX - this.getOffsetLeft();
        var mouseY = event.pageY - this.getOffsetTop();

        this.drag = true;
        this.addClick(event.pageX - this.getOffsetLeft(), event.pageY - this.getOffsetTop());
        this.redraw();
    }

    @HostListener('mousemove', ['$event'])
    changePixel(event) {
        if(this.drag){
            console.log('dragging');
            this.addClick(event.pageX - this.getOffsetLeft(), event.pageY - this.getOffsetTop(), true);
            this.redraw();
        }
    }

    addClick(x, y, dragging?) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clears the canvas

        this.ctx.strokeStyle = "#df4b26";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = 5;

        this.drawImages();

        for(var i=0; i < this.clickX.length; i++) {
            this.ctx.beginPath();
            if(this.clickDrag[i] && i){
                this.ctx.moveTo(this.clickX[i-1], this.clickY[i-1]);
            }else{
                this.ctx.moveTo(this.clickX[i]-1, this.clickY[i]);
            }
            this.ctx.lineTo(this.clickX[i], this.clickY[i]);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }

    done() {
        console.log('lala');
    }

    getOffsetLeft(): number {
        return this.canvasRef.nativeElement.offsetLeft + this.containerRef.nativeElement.offsetLeft;
    }

    getOffsetTop(): number {
        return this.canvasRef.nativeElement.offsetTop + this.containerRef.nativeElement.offsetTop + this.titleRef.nativeElement.offsetHeight;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.success || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}