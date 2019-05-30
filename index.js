var gameScene = new Phaser.Scene("Game");

var config = {
    type: Phaser.AUTO,
    scale: {
        type: Phaser.WEBGL,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: load,
        create: create,
        update: update
    },
    
}

var game = new Phaser.Game(config);

function load()
{
this.load.image("sky","assets/sky.jpg")
this.load.image("ball","assets/balls.png")
this.load.image("platform","assets/platforms.png")
this.load.image("star","assets/star.png")
}

function create()
{
    this.physics.world.setBoundsCollision(true, true, true, false);
    // this.add.image(400,300,"sky").setScale(5);
    
    // stars
    stars = this.physics.add.staticGroup();
    // stars.create(11,11,"star");
    setofStars();
    
    function setofStars(){
        for(let row = 0; row< 10; row++){

            for(let col = 0; col<34; col++){
                stars.create(19 + col*23,20+ row*23, "star");
            }
        }
    }


    //  ball 

    
        ball = this.physics.add.image(400,500, "ball");
        ball.setVelocity(-75,-300);
        ball.setBounce(1.01);
        ball.setGravity(-300);
        ball.setCollideWorldBounds(true);

    
    // platform
    platform = this.physics.add.sprite(400,550, "platform").setScale(0.4);
    platform.setCollideWorldBounds(true);
    platform.setGravity(0);

    //movement
    // this.anims.create({

    //     key:'left',
    //     frames: this.anims.generateFrameNumbers("platform",{start:0, end:3}),
    //     frameRate: 10,
    //     repeat: -1
    // })
    // this.anims.create({
    //     key:"right",
    //     frames: this.anims.generateFrameNumbers("platform",{start:5, end:8}),
    //     frameRate: 10,
    //     repeat: 1
    // })

    cursors = this.input.keyboard.createCursorKeys();

    //colliders
    this.physics.add.collider(ball,platform);
    this.physics.add.collider(ball,stars);
    
    this.physics.add.overlap(ball, stars, hitstar, null, this);
    
    
    function hitstar(ball,stars){
        stars.disableBody(true,true);
        
        if(stars.countActive(true)===0){
            console.log(5);
        }
    }

    function resetBall(){
        this.ball.setVelocity(0);
        this.ball.setPosition(this.platform.x,500);
        this.ball.setData("onPlat",true);
    }

    function reset(){
        this.resetBall();
    }
}

function update()
{
    if(cursors.left.isDown){
        platform.setVelocityX(-150);
        //platform.anims.play("left",true);
    }
    else{
        platform.setVelocityX(150);
        //platform.anims.play("right",true);
    }

}
































// var cursors;

// function load() {
    
//     this.load.image("sky", "assets/sky.jpg");
//     this.load.spritesheet("platforms", "assets/platforms.png", {frameWidth: 32, frameHeight: 48});
//     this.load.image("balls",'assets/balls.png');
//     this.load.image("stars","assets/star.png");
// }

// function render() {
//     this.add.image(84, 75, "sky");

//     this.physics.setColliderWorldBounds(true,true,true,false);
//     this.stars = this.physics.add.staticGroup({
//         key: "assets", frame: ["stars"],
//         frameQuantity: 10,
//         gridAlign: {width: 10, height: 6}
//     });

//     this.ball = this.physics.add.image(400,500,"assets","balls").setColliderWorldBounds(true);
//     this.ball.setData("onPlat1",true);

//     this.plat1 = this.physics.add.image(80, 145,"assets", "platforms").setScale(0.08).setImmovabe();
    
//     this.physics.add.collider(this.ball, this.stars, this.hitStar, null, this);
//         this.physics.add.collider(this.ball, this.plat1, this.hitPlat1, null, this);
   
//         function hitStar(ball, stars)
//         {
//             stars.disableBody(true, true);
    
//             if (this.stars.countActive() === 0)
//             {
//                 this.resetLevel();
//             }
//         }

//     this.anims.create({
//         key: 'left',
//         frames: this.anims.generateFrameNumbers('platforms',{start: 0, end:3}),
//         frameRate: 10,
//         repeat: -1
//     });
//     this.anims.create({
//         key:"right",
//         frames: this.anims.generateFrameNumbers('dude', {start: 5, end:8}),
//         frameRate: 10,
//         repeat: 1
//     });

    
    
//     // platforms.create(100,400,"platforms").setScale(1);
//     cursors = this.input.keyboard.createCursorKeys();
// }

// function update() {
//     if (cursors.left.isDown) {
//         plat1.setVelocityX(-120);
//         plat1.anims.play("left", true);
//     }
//     else if (cursors.right.isDown) {
//         plat1.setVelocityX(120);
//         plat1.anims.play("right",true);
//     }
// }



