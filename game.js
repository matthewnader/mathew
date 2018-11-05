let b = new Bump(PIXI);

let app = new PIXI.Application({ width: 800, height: 600 });

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
PIXI.loader
  .add("ship.png")
  .add("laser.png")
  .add("alien.png")
  .add('spritesheet', 'mc.json')
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
  });

  var scoreText = new PIXI.Text('0', style);
  scoreText.x = 10;
  scoreText.y = 20;



  let ship = new PIXI.Sprite(PIXI.loader.resources["ship.png"].texture);
  ship.width = 100
  ship.height = 100
  ship.interactive = true;
  ship.calculateBounds()
  //Add the ship to the stage


  let laser = new PIXI.Sprite(PIXI.loader.resources["laser.png"].texture);

  laser.width = 30
  laser.height = 30
  laser.calculateBounds()
  let alien = new PIXI.Sprite(PIXI.loader.resources["alien.png"].texture);

  alien.width = 50
  alien.height = 50
  alien.hitArea = new PIXI.Rectangle(0, 0, 50, 50);
  alien.y = 550;
  alien.x = 350;
  alien.calculateBounds()
  app.stage.addChild(scoreText);
  app.stage.addChild(laser);
  app.stage.addChild(ship); laser
  app.stage.addChild(alien);




  var ship_speed = 7

  var direction = ship_speed;

  var firing = false

  window.addEventListener(
    "keydown", function (k) {


      console.log("firing");
      if (firing == false) {
        firing = true
      }

    }, false
  );
  let score = 0
  var explosionTextures = []
  for (i = 0; i < 26; i++) {
    var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png');
    explosionTextures.push(texture);
  }

  // create an explosion AnimatedSprite
  var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);

  explosion.visible = false


  explosion.anchor.set(0.5);
  explosion.rotation = Math.random() * Math.PI;
  explosion.scale.set(0.75 + Math.random() * 0.5);
  app.stage.addChild(explosion);

  var gameLoop = function (delta) {
    ship.x += direction;
    if (ship.x > 700) {
      direction = -1 * ship_speed
      ship.y += 10
    }

    if (ship.x < 0) {
      direction = ship_speed
      ship.y += 10
    }
    if (firing) {
      laser.y = laser.y + 10;
    } else {
      laser.y = ship.y + 75;
      laser.x = ship.x + 35.5;
    }

    if (laser.y > 600) {
      firing = false;
    }

    if (b.hitTestRectangle(alien, laser)) {
      console.log("HIT")
      console.log(laser)
      console.log(alien)
      score = score + 1
      console.log(score)
      scoreText.text = score
      firing = false;
      laser.y = ship.y + 75;
      laser.x = ship.x + 35.5;
      explosion.position = alien.position;
      explosion.gotoAndPlay(0);
      explosion.visible = true
      alien.position.x = Math.random() * 600
      setTimeout(function() {
        explosion.visible = false
      }, 500)
    }

  }


  app.ticker.add(delta => gameLoop(delta));
}
