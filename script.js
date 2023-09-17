document.addEventListener("DOMContentLoaded", () =>
{
    const canvas = document.querySelector("#canvas")
    const context = canvas.getContext("2d")
    const coinSound = document.querySelector("#coinSound")
    const soudnScore = document.querySelector("#soudnScore")
    const squareWidth = 50
    const squareHeight = 50
    let x = 100 
    let y = 0
    let speed = 1000
    let time = Date.now()
    let timePassed = 0
    let coinX = (Math.random() * (canvas.width - squareWidth))
    let coinY = (Math.random() * (canvas.height - squareHeight))
    let coinWidth = 20
    let coinHeight = 20
    let score = 0
    
    function draw()
    {

        timePassed = (Date.now() - time) / 1000

        time = Date.now()
        let fps = Math.round(1 / timePassed)
   
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.rect(x, y, squareWidth, squareHeight)
        context.fillStyle = "red"
        context.fill()

        context.beginPath()
        context.font = "25px aril"
        context.fillStyle = "black"
        context.fillText("SCORE: " + score, 20, 30)
        
        context.beginPath()
        context.rect(coinX, coinY, coinWidth, coinHeight)
        context.fillStyle = "yellow"
        context.fill()

        if (coinX <= x + squareWidth && x <= coinX + coinWidth && coinY <= y + squareHeight && y <= coinY + coinHeight)
        {
            coinSound.play()
            score++

            if ( score % 5 === 0)
            {
                try
                {
                    coinSound.pause()
                }
                catch(DOMException)
                {
                    console.log("Exception validet" + DOMException)
                }
                
                soudnScore.play()
            }
            coinX = (Math.random() * (canvas.width - squareWidth))
            coinY = (Math.random() * (canvas.height - squareHeight))
        } 
    
        requestAnimationFrame(draw)

    }

    draw()
        

    document.addEventListener("keydown", (event) => 
    {
            let key = event.key
            
            if (key === "ArrowUp"  && y > 0)
            {
                console.log("up")
                y -= speed * timePassed
            }
            else if (key === "ArrowRight" && x + squareWidth <= canvas.width)
            {
                console.log(x)
                x += speed * timePassed
            }
            else if (key === "ArrowDown" && y + squareHeight <= canvas.height)
            {
                console.log(y)
                y += speed * timePassed
            }
            else if (key === "ArrowLeft" && x > 0)
            {
                console.log("Left")
                x -= speed * timePassed
            }

            
        
    })

    document.querySelector("#up").addEventListener("touchstart", () =>
    {
        if (y > 0) { y -= speed * timePassed}
    })

    document.querySelector("#right").addEventListener("touchstart", () =>
    {
       if (x + squareWidth <= canvas.width) { x += speed * timePassed}
    })

    document.querySelector("#down").addEventListener("touchstart", () =>
    {
        if (y + squareHeight <= canvas.height) { y += speed * timePassed}
    })

    document.querySelector("#left").addEventListener("touchstart", () => 
    {
        if ( x > 0) { x -= speed * timePassed}
    })
})