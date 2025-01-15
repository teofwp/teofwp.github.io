let timerInterval;
let elapsedTime = 0;
let matchedPairs = 0;

document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("timer-display");

    // Format time
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, "0");
        const mins = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    }

    // Update the timer display
    function updateDisplay() {
        timerDisplay.textContent = formatTime(elapsedTime);
    }

    // Start the timer
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateDisplay();
        }, 1000);
    }
});

// All the pairs of fractions
document.addEventListener("DOMContentLoaded", () => {
    // Format time
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, "0");
        const mins = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    }

    const pairs = [
        { word: "8/4", match: "2" },
        { word: "1/2", match: "3/6" },
        { word: "16/12", match: "4/3" },
        { word: "90/100", match: "9/10" },
        { word: "12y/20y", match: "3/5" },
        { word: "100/10", match: "10" },
        { word: "7/8", match: "21/24" },
        { word: "10x/4x", match: "5/2" },
        { word: "abc/abc", match: "1" },
        { word: "33/60", match: "11/20" },
        { word: "12/16", match: "3/4" },
        { word: "25/35", match: "5/7" },
        { word: "12/4", match: "3" },
        { word: "3/7", match: "9/21" },
        { word: "15/18", match: "5/6" },
        { word: "24/27", match: "8/9" },
        { word: "4/44", match: "1/11" },
        { word: "5z/25z", match: "1/5" },
        { word: "4/5", match: "40/50" },
        { word: "2/5", match: "22/55" },
        { word: "14/2", match: "7" },
        { word: "w/10w", match: "1/10" },
        { word: "12/42", match: "4/14" },
        { word: "30/1000", match: "3/100" },
        { word: "1/8", match: "2/16" },
        { word: "4k/6k", match: "2/3" },
        { word: "2/9", match: "6/27" },
        { word: "21/22", match: "21000/22000" },
        { word: "48/4", match: "12" },
        { word: "10/6", match: "5/3" }
    ];

    let cards = document.getElementsByClassName("item");
    console.log(cards);

    // Function that checks to see if the game is done
    function checkGameCompletion() {
        console.log(matchedPairs);
        if (matchedPairs >= 10) {
            setTimeout(function () {
                clearInterval(timerInterval);
                alert(`Congratulations! You completed the game in ${formatTime(elapsedTime)}.`);
            }, 150);
        }
    }

    // Fisher-Yates (or Knuth) Shuffle algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // Generate a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at indices i and j
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shuffleAssign() {
        // shuffle list of pairs
        let shuffledPairs = shuffleArray(pairs);
        console.log(shuffledPairs);

        //create new array for selected pairs this round
        let cardPairs = [];

        // add the first cars.length/2 pairs (word and match) to new array
        for (let i = 0; i < cards.length / 2; i++) {
            cardPairs.push(shuffledPairs[i].word);
            cardPairs.push(shuffledPairs[i].match);
        }
        console.log(cardPairs);

        // shuffle that array
        cardPairs = shuffleArray(cardPairs);

        // iterate over that array to assign cards
        for (let i = 0; i < cardPairs.length; i++) {
            cards[i].innerText = cardPairs[i];
            cards[i].onclick = isClicked;
        }
    }

    function pause(duration) {
        return new Promise((resolve) => setTimeout(resolve, duration));
    }

    // Changes colors of clicked pairs
    function isClicked(e) {
        let cardClicked = e.srcElement;
        cardClicked.classList.add("clicked");
        let clicked = document.getElementsByClassName("clicked");
        if (clicked.length == 2) {
            if (isMatch(clicked[0].innerText, clicked[1].innerText)) {
                clicked[0].style.backgroundColor = "green";
                clicked[1].style.backgroundColor = "green";

                clicked[0].disabled = true;
                clicked[1].disabled = true;

                clicked[0].classList.remove("clicked");
                clicked[0].classList.remove("clicked");

                matchedPairs++;
                checkGameCompletion();
            } else {
                clicked[0].style.backgroundColor = "red";
                clicked[1].style.backgroundColor = "red";
                setTimeout(function () {
                    clicked[0].style.backgroundColor = "";
                    clicked[1].style.backgroundColor = "";
                    clicked[0].classList.remove("clicked");
                    clicked[0].classList.remove("clicked");
                }, 1000);
            }
        }
    }

    // Checks to see if the clicked pairs are matches or not
    function isMatch(item1, item2) {
        for (let i = 0; i < Object.keys(pairs).length; i++) {
            if (item1 == pairs[i].word && item2 == pairs[i].match) {
                return true;
            }
            if (item1 == pairs[i].match && item2 == pairs[i].word) {
                return true;
            }
        }

        return false;
    }

    shuffleAssign();

    // Resets game with restart button
    const refreshButton = document.getElementById("start");
    refreshButton.addEventListener("click", () => {
        window.location.reload();
    });

    // In-game directions
    const directionsButton = document.getElementById("directions");
    directionsButton.addEventListener("click", () => {
        alert(
            "Match all the fraction pairs. Once you have matched all the pairs on the screen, you may press the restart button to receive a new set of fraction pairs."
        );
    });
});
