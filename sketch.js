// project 1 

let catcherX, catcherY 
let catcherWidth = 80
let catcherHeight = 20
let fallingObjects = [] 
let objectSize = 40
let score = 0
let hopeMeter = 50
let moodLevel = 80
let gameOver = false
let gameWon = false

// NOTE : what if everytime player catches fallingObjects/emojis the emoji gives out a definition of what the neurotransmitter does //

let levelName = "Positive Thoughts" 
let POSITIVE = "positive"
let NEGATIVE = "negative"  // wait i just remembered vs doesnt really need semi colons //

// positive + negative orbs colors and stuff //

//positive orb //
let positiveOrbs = [
    {label: "dopamine", emoji: "🎗️", color: "#f0f5bc"}, //make sure to label them so this can be a learning game abt neurotransmitters //
    {label: "serotonin", emoji: "🌿", color: "#ccebddff"},
    {label: "endorphins", emoji: "☺️", color: "#a3e0ff"},
    {label: "oxytocin", emoji: "💗", color: "#f7a0d3ff"},
]

//negative orb //
let negativeOrbs = [
    {label: "coristol", emoji: "🔥", color:"#9e160dff" },
    {label: "anxiety", emoji: "😩", color: "#af4102ff"},
    {label: "despair", emoji: "💔", color:"#91145dff"},
    {label: "stress", emoji: "😓", color : "#353b9eff"},
]

function createFallingObject() {
    let type= random ([POSITIVE, NEGATIVE])
    let orb = type === POSITIVE ? random(positiveOrbs) : random(negativeOrbs)
    return {
        ...orb,
        type,
        x: random(0, width - objectSize),
        y: -objectSize,
        speed: random(2,5)
    }
}

function setup() {

createCanvas(500, 600)
    catcherX = width / 2; 
    catcherY = height - 50;
    frameRate(60)
    // text settings // 
    textAlign(CENTER, CENTER)
    rectMode(CORNER)
    textSize(15)
    // spawning falling objects at the beginning of game //
    for(let i = 0; i < 5; i++) {
        fallingObjects.push(createFallingObject())
    }
}

function draw() {
    background("#d1e4faff")

       // level name //
       fill("#918cfdff")
         textSize(24)
         text(levelName, width / 2, 30)

         const maxHope = 100;
         const maxMood = 100;


       
       // hope meter 
        fill("#f7a4dff")
        rect(30, 50, 200, 20)
        fill("#bdffa3ff")
        rect(30, 50, 200 * (hopeMeter / maxHope), 20)
        fill(0)
        textSize(14)
        text("Hope" + hopeMeter, 20)

        // mood level
        fill("#b1a4f7ff")
        rect(30, 80, 200, 20)
        fill("#f7a4dff")
        rect(30, 80, 200 * (moodLevel / maxMood), 20)
        fill(0)
        textSize(14)
        text("Mood" + moodLevel, 20)

    if (hopeMeter >= maxHope && !gameWon) {
        gameWon = true
        noLoop()
    }

    if (gameWon) {
        fill("#f7a4dfff")
        textSize(36)
        text("You Win!", width / 2, height / 2 - 20)
        textSize(24)
        text("Final Score:" + score, width / 2, height / 2 + 20)
        text("Hope Meter:" + hopeMeter, width / 2, height / 2 + 50)
        text("Mood Level:" + moodLevel, width / 2, height / 2 + 80)
        textSize(14)
        text("You're doing amazing", width / 2, height - 80)
        return

    }

    if (gameOver) {
       fill("faaddfff");
      (textSize, width / 2, 30)

      if (gameOver) {
        fill("#f7a4dfff")
        textSize(36)
        text("Game Over", width / 2, height / 2 - 20)
        textSize(24)
        text("Final Score:" + score, width / 2, height / 2 + 20)
        text("Hope Meter:" + hopeMeter, width / 2, height / 2 + 50)
        text("Mood Level:" + moodLevel, width / 2, height / 2 + 80)
        textSize(14)
        text("Hope is a muscle, small choices and thoughts", width / 2, height - 60)
        text("can help rewire the brain. You're doing great. 💗", width / 2, height - 40)
        noLoop()
        return
      }
    }
    // controls for catcher //
    if (keyIsDown(LEFT_ARROW)) {
        catcherX -= 7;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        catcherX += 7;
    }
    catcherX = constrain(catcherX, 0, width - catcherWidth)

    //catcher
    fill("#fcbbee")
    rect(catcherX, catcherY, catcherWidth, catcherHeight, 10)

    // falling objects 
    for (let i = fallingObjects.length - 1; i >= 0; i--) {
        let obj = fallingObjects[i]
        obj.y += obj.speed
        fill(obj.color)
        ellipse(obj.x + objectSize / 2, obj.y + objectSize / 2, objectSize)
        fill("e9a7dff")
        textSize(14)
        text(obj.emoji || obj.label, obj.x + objectSize / 2, obj.y + objectSize / 2)

        // collision detection
        if (
            obj.y + objectSize >= catcherY &&
            obj.y <= catcherY + catcherHeight &&
            obj.x + objectSize >= catcherX &&
            obj.x <= catcherX + catcherWidth
        ) {
            if (obj.type === POSITIVE) {
                score += 10
                hopeMeter = min(hopeMeter + 5, 100)
                moodLevel = min(moodLevel + 5, 100)
            } else {
                score -= 5
                hopeMeter = max(hopeMeter - 10, 0)
                moodLevel = max(moodLevel - 10, 0)
            } 
            fallingObjects.splice(i,1)
            fallingObjects.push(createFallingObject())
            } else if (obj.y > height) {
                fallingObjects.splice(i, 1)
                fallingObjects.push(createFallingObject())
            }
        }

        if (hopeMeter <= 0 || moodLevel <= 0) {
            gameOver = true
        }
    }

    function keyPressed() {
        if ((gameOver || gameWon) && key === 'r') {
            // reset game
            score = 0
            hopeMeter = 50
            moodLevel = 80
            gameOver = false
            gameWon = false
            fallingObjects = []
            for(let i = 0; i < 5; i++) {
                fallingObjects.push(createFallingObject())
            }
            loop() 
            text("Press 'R' to Restart", width / 2, height - 80)
        }
    }