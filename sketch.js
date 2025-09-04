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
let fact = ""
let paused = false
let brainImg
let shownFacts = new Set()
let gameTimer = 0

// NOTE : what if everytime player catches fallingObjects/emojis the emoji gives out a definition of what the neurotransmitter does //

let levelName = "positive thoughts" 
let POSITIVE = "positive"
let NEGATIVE = "negative"  // the way im not using semi colons //

// positive + negative orbs colors and stuff //

//positive orb //
let positiveOrbs = [
    {label: "dopamine", emoji: "🎗️", color: "#f0f5bc", fact: "dopamine gives you pleasure, reward, and motivation" }, //make sure to label them so this can be a learning game abt neurotransmitters //
    {label: "serotonin", emoji: "🌿", color: "#ccebddff", fact: "serotonin regulates sleep and mood" },
    {label: "endorphins", emoji: "☺️", color: "#a3e0ff", fact: "endorphins induces euphoria and well-being" },
    {label: "oxytocin", emoji: "💗", color: "#f7a0d3ff", fact: "oxytocin promotes bonding and trust, also known as the 'love hormone'" },
]

//negative orb //
let negativeOrbs = [
    {label: "cortisol", emoji: "🔥", color:"#9e160dff", fact:"cortisol is the primary stress hormone" },
    {label: "anxiety", emoji: "😩", color: "#af4102ff", fact: "anxiety is the feeling of worry or unease" },
    {label: "despair", emoji: "💔", color:"#91145dff", fact: "despair is the state of hopelessness" },
    {label: "stress", emoji: "😓", color : "#353b9eff", fact: "stress ellicits the feeling of mental pressure" },
]

function preload() {
    // variable //
    // brainImg = loadImage('brain.png.webp')
 
}

function createFallingObject() {
    let type = random ([POSITIVE, NEGATIVE])
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
    catcherX = width / 2
    catcherY = height - 50
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

function keyPressed() {
        if ((gameOver || gameWon)&&(key === 'r' || key === 'R')) {
            resetGame()
        }
            
        
        if (paused && key === ' ') { 
    for (let i = fallingObjects.length - 1;i >= 0; i--) {
        if (fallingObjects[i].fact === fact) {
            fallingObjects.splice(i, 1)
            fallingObjects.push(createFallingObject())
            break 
        }
    }
 paused = false
 fact = ""
 loop()
    }
}


function resetGame() {
         score = 0
         hopeMeter = 50
         moodLevel = 80
         gameOver = false
         gameWon = false
         fact = ""
         paused = false
         fallingObjects = []
         for(let i = 0; i < 5; i++) 
         fallingObjects.push(createFallingObject())
         loop()
    }


    
function draw() {
    background("#bad3f0ff")
    
    gameTimer += 1 / 60 // seconds

    // increasing the falling speed
    for (let obj of fallingObjects) {
        obj.speed = min(obj.speed + 0.01, 6)
    }

   // if (brainImg) 
       // image (brainImg, 10, 10, 40, 40)
    

    fill("#caadebff")
    textSize(24)
    text(levelName, width / 2, 30)

    if (paused) {
        fill("rgba(0,0,0,0.7)")
        rect(0, 0, width, height)
        fill(255)
        textSize(16)
        textAlign(CENTER, CENTER)
        text(fact || "no fact available", width/2, height/2 - 20)
        fill("rgba(255, 255, 255, 0.2)")
        textFont('Comic Sans MS')
        stroke(200)
        strokeWeight(2)
        text("press space to continue", width/2, height/2 + 20)
        return
    }

    drawMeter()
    drawCatcher()
    drawFallingObjects()
    handleInput()
    
    if(hopeMeter >= 100 && !gameWon){
       gameWon = true
       noLoop()
    }
    // game won
    if (gameWon) {
        fill("#f7a4dfff")
        textSize(36)
        textFont('Comic Sans MS')
        fill(255)
        stroke("#e65abeff")
        strokeWeight(2)
        text("you win!", width / 2, height / 2 - 20)
        textSize(24)
        text("Final Score:" + score, width / 2, height / 2 + 20)
        text("Hope Meter:" + hopeMeter, width / 2, height / 2 + 50)
        text("Mood Level:" + moodLevel, width / 2, height / 2 + 80)
        textSize(14)
        text("you're doing amazing! 💗", width / 2, height - 80)
        return
    }

    // game over

      if (gameOver) {
        fill("#f7a4dfff")
        textSize(36)
        textFont('Comic Sans MS')
        fill(255)
        stroke("#e65abeff")
        strokeWeight(2)
        text("game over", width / 2, height / 2 - 20)
        textSize(24)
        text("final score:" + score, width / 2, height / 2 + 20)
        text("hope meter:" + hopeMeter, width / 2, height / 2 + 50)
        text("mood level:" + moodLevel, width / 2, height / 2 + 80)
        textSize(14)
        text("hope is a muscle, small choices and thoughts", width / 2, height - 60)
        text("can help rewire the brain. you're doing great. 💗", width / 2, height - 40)
        noLoop()
        return
      }
    }

    function drawMeter(){
        const maxHope = 100
         const maxMood = 100
       
       // hope meter 
        fill("#f7a4dff")
        rect(30, 50, 200, 20)
        fill("#bdffa3ff")
        rect(30, 50, 200 * (hopeMeter / maxHope), 20)
        fill(0)
        textSize(14)
        textFont('Comic Sans MS')
        fill(255)
        stroke("#72e743ff")
        strokeWeight(2)
        text("hope" + hopeMeter, 130, 60)

        // mood level
        fill("#b1a4f7ff")
        rect(30, 80, 200, 20)
        fill("#f7a4dff")
        rect(30, 80, 200 * (moodLevel / maxMood), 20)
        fill(0)
        textSize(14)
        textFont('Comic Sans MS')
        fill(255)
        stroke("#8c7af1ff")
        strokeWeight(2)
        text("mood" + moodLevel, 130, 90)

        textAlign(CENTER, CENTER)
    }

    function drawCatcher(){

         //catcher
    fill("#fcbbee")
    textSize(36)
    textFont('Comic Sans MS')
    fill(255)
    stroke("#e65abeff")
    strokeWeight(2)
    rect(catcherX, catcherY, catcherWidth, catcherHeight, 10) }


    // falling objects 
  function drawFallingObjects(){
    for (let i = fallingObjects.length - 1; i >= 0; i--) {
        let obj = fallingObjects[i]

        if(!paused) {
            // falling motion
         obj.y += obj.speed
         // remove and respawn out of frame
         if (obj. y > height) {
            fallingObjects.splice(i, 1)
            fallingObjects.push(createFallingObject())
         }
        
        // collision detection
        if (
            obj.y + objectSize > catcherY &&
            obj.y <= catcherY + catcherHeight &&
            obj.x + objectSize >= catcherX &&
            obj.x <= catcherX + catcherWidth
        ) {
            
            if (!shownFacts.has(obj.label)) {
                fact = obj.fact
                paused = true
                shownFacts.add(obj.label)
            }
           // scoring
            if (obj.type === POSITIVE) {
                score += 10;
                hopeMeter = min(hopeMeter + 2, 100)
                moodLevel = min(moodLevel + 2, 100)
            } else {
                score -= 5
                hopeMeter = max(hopeMeter - 5 , 0)
                moodLevel = max(moodLevel - 5, 0)
            }
            // prevents orb from spazzing out
            fallingObjects.splice(i, 1)
            fallingObjects.push(createFallingObject())
            continue
        }

        // horizontal drift inside the canvas
        obj.x += random(-1, 1)
        obj.x = constrain(obj.x, 0, width - objectSize)

        }

         //orb 
        fill(obj.color)
        ellipse(obj.x + objectSize / 2, obj.y + objectSize / 2, objectSize)
        fill("#e9a7dff")
        textSize(14)
        text(obj.emoji || obj.label, obj.x + objectSize / 2, obj.y + objectSize / 2)
    }
         
    // respawn objects 
           while (fallingObjects.length < 5) {
            fallingObjects.push(createFallingObject())
        }
            if (hopeMeter <= 0 || moodLevel <= 0) {
                gameOver = true;
            }
        }

         
  
    
function handleInput() {
    if (keyIsDown(LEFT_ARROW)) catcherX -= 7
    if (keyIsDown(RIGHT_ARROW)) catcherX += 7
    catcherX = constrain(catcherX, 0, width - catcherWidth)
}
  
