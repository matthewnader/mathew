
let app = new PIXI.Application({ width: 800, height: 600 });

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
PIXI.loader
  .add("ship.png")
  .add("laser.png")
  .add("alien.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let ship = new PIXI.Sprite(PIXI.loader.resources["ship.png"].texture);
  ship.width = 100
  ship.height = 100
  ship.interactive = true;
  //Add the ship to the stage
  

  let laser = new PIXI.Sprite(PIXI.loader.resources["laser.png"].texture);

  laser.width = 30
  laser.height = 30

  let alien = new PIXI.Sprite(PIXI.loader.resources["alien.png"].texture);

  alien.width = 50
  alien.height = 50
  alien.y = 550 ;
  alien.x = 350 ;


  app.stage.addChild(laser);
  app.stage.addChild(ship);
  app.stage.addChild(alien);




  var ship_speed = 7

  var direction = ship_speed;

  var firing = false

  window.addEventListener(
    "keydown", function(k){

     
        console.log("firing");
        if (firing == false ){
          firing = true
        }
    
    }, false
  );

  var gameLoop = function (delta) {
    ship.x += direction;
    if (ship.x > 700) {
      direction = -1 * ship_speed
      ship.y += 10 
    }

    if (ship.x < 0 ) {
      direction = ship_speed
      ship.y += 10 
    }
    if ( firing ){
      laser.y = laser.y + 10;
    }else
    {
      laser.y = ship.y + 75;
      laser.x = ship.x + 35.5;
    }
    
    if ( laser.y > 600 ){
      firing = false;
    }

    if ( alien.containsPoint(laser.position) ){
      console.log("HIT")
      console.log(laser.position)
      console.log(alien.position)
      alien.visible = false
    }

  }

  

  app.ticker.add(delta => gameLoop(delta));
}  

