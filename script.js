const gameContainer = document.querySelector(".container")
const userResult = document.querySelector(".user-result img")
const cpuResult = document.querySelector(".cpu-result img")
const result = document.querySelector(".result")
const optionImages = document.querySelectorAll(".option-image")
const userScoreBoard = document.getElementById("user-score")
const cpuScoreBoard = document.getElementById("cpu-score")

optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active")

        userResult.src = cpuResult.src = "images/rock.png"

        //select an image
        optionImages.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove("active")
        })
        
        gameContainer.classList.add("start");

        let time = setTimeout(() => {
         gameContainer.classList.remove("start");
         //get selected image
         let imagesrc = e.target.querySelector("img").src
         userResult.src = imagesrc
 
         //generate nums between 0 and 2 
         let randomNumber = Math.floor(Math.random() * 3)
        //  console.log(randomNumber)
 
         //array for CPU options 
         let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"]
         cpuResult.src = cpuImages[randomNumber]
 
         //assign value to cpuImage
         let cpuValue = ["R", "P","S"][randomNumber]
 
         //assign value to userImage
         let userValue = ["R", "P","S"][index]
 
         //possible outcomes 
         let outcomes = {
             RR: "Draw",
             RP: "CPU",
             RS: "User",
             SS: "Draw",
             SR: "CPU",
             SP: "User",
             PP: "Draw",
             PS: "CPU",
             PR: "User",
         }
 
         //outcome based on cpu and user picks 
         let outcomeValue = outcomes[userValue + cpuValue]

         
 
         //display result
         result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won!`

         //score variables
         var userScore = parseInt(localStorage.getItem('userScore')) || 0;
         var cpuScore = parseInt(localStorage.getItem('cpuScore')) || 0; 

        
         //compute score
         if(String(outcomeValue) === "User"){
            userScore += 1
         }

         else if(String(outcomeValue) === "CPU"){
            cpuScore += 1
         }
       

         //display score 
         userScoreBoard.innerHTML = userScore + " - "
         cpuScoreBoard.innerHTML = cpuScore


         //insert scores to localStorage
         localStorage.setItem('userScore', userScore)
         localStorage.setItem('cpuScore', cpuScore)

          //display winner
          if(userScore === 5){
            alert("User Wins")
            localStorage.clear()

        }
        else if(cpuScore === 5){
            alert("CPU Wins")
            localStorage.clear()
        }

        //  console.log(outcomeValue)   
         console.log(userScore)
         console.log(cpuScore)   
        }, 2500)

      
    })   
})

 //clear localStorage if refreshed
 window.addEventListener('beforeunload', function () {
    localStorage.clear()
});

