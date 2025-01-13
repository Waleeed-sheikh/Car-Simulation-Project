class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;
        this.controls=new Controls() // controls class is in control.js , check it you will understand

    }

   update(){
   this.#move();    
   }

   
   #move(){
    if(this.controls.forward){ ///agar up key press hoti hy
        this.speed+=this.acceleration;
    }
    if(this.controls.reverse){
        this.speed-=this.acceleration;
    }
    if(this.speed>this.maxSpeed){
        this.speed=this.maxSpeed
    }
    if(this.speed<-this.maxSpeed/2){
        this.speed=-this.maxSpeed/2                 //-sign to indicate car is going backwards
    }
    if(this.speed>0){
        this.speed-=this.friction
    }
    if(this.speed<0){
        this.speed+=this.friction
    }
    if(Math.abs(this.speed)<this.friction){
        this.speed=0
    }

    if(this.speed!=0){
        const flip=this.speed>0?1:-1;

        if(this.controls.left){
            this.angle+=0.03*flip
        }
        if(this.controls.right){
            this.angle-=0.03*flip
        }

    }

    
    this.x-=Math.sin(this.angle)*this.speed;
    this.y-=Math.cos(this.angle)*this.speed

   }
    draw(ctx){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(-this.angle)  /////we use - because we are mimcking rotation on the model of unit circle and initially our circle is rotated so the - will negate that
        ctx.beginPath(); ////built in function by canvas 2d api
        ctx.rect(
            -this.width/2, //// calculation to create car (for now a rectangle )  in the center
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill() ///built in function by canvas 2d api
        ctx.restore();
    }
}