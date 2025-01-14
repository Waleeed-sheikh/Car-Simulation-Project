const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");         //context or reference to the canvas and all the project items will be in 2d
const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50,"KEYS");

const traffic=[      //all the traffic cars
     new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2), //argument after the dummy is the speed of traffic cas for now
    //  new Car(road.getLaneCenter(1),300,30,50,"DUMMY",1)
];

animate();

function animate(){


    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);       // traffic will also follow the rules ssuch as cautious of border
    }

    car.update(road.borders,traffic);// tell about borders to sensors

    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx);                 ///always have to render road first   
    

    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red")
    }

    car.draw(ctx,"blue");

    ctx.restore();
    requestAnimationFrame(animate);
}