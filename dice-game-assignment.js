"use strict"
//**************RESULTS SHOWN IN CONSOLE****************
//WARNING: THESE GAMES ARE DEFINITELY FIXED/RIGGED, mostly on purpose

promptUp();
function promptUp(currentMoney){
let gamePrompt = prompt("What'd ya playin? 1=Black Jack, 2=Keno, 3=Slots, 4=More Slots, 5=Three Card Poker, 6=Craps");
startGamblin( gamePrompt, currentMoney );
}

function startGamblin( game, currentMoney = 100, wager = 2){
	if (game == 1){										//EFFING SWITCH CASE WON'T WORK
		console.log("Playing Black Jack; Starting with " + currentMoney);
		currentMoney = blackJack(currentMoney, wager);
	}else if(game == 2){
		console.log("Playing Keno; Starting with " + currentMoney);
		currentMoney = keno(currentMoney, wager);
	} else if(game == 3){
		console.log("Playing Slots; Starting with " + currentMoney);
		currentMoney = slots(currentMoney, wager);
	} else if(game == 4){
		console.log("Playing Dumber Slots; Starting with " + currentMoney);
		currentMoney = moreSlots(currentMoney, wager);
	} else if (game == 5){
		console.log("Playing Three Card Poker; Starting with " + currentMoney);
		currentMoney = threeCardPoker(currentMoney, wager);
	}else if (game == 6){
		console.log("Playing Craps; Starting with " + currentMoney);
		currentMoney = craps(currentMoney, wager);
	} else {
		return;
	}
	promptUp(currentMoney);
}

function moneyTracker(currentMoney, winLoss){
let totalMoney = currentMoney;
	while (totalMoney > 0){
		totalMoney = totalMoney + winLoss;
		console.log("Total Money: " + totalMoney);
		return totalMoney;
	}
}

function blackJack(currentMoney, wager){
let currentDice = 11;
let result = 0;
let playerSum;
let dealerSum;
let playersArray = new Array (2);
let dealersArray = new Array (2);

//For simplicity's sake, 1 and 11 are treated as definitive values

	for (let i = 0; i < 2 ; i++){
		playersArray[i] = roll(currentDice);
	}
	playerSum = playersArray.reduce(getSum);
	console.log("Your Cards: " + playersArray + " = " + playerSum);
		
	while(playerSum < 21){
		let hitStay = prompt("1 = Hit, 2 = Stay");
		if (hitStay == 1){
			playersArray.push(roll(currentDice));
			playerSum = playersArray.reduce(getSum);			
			console.log("Your Cards: " + playersArray + " = " + playerSum);
		} else {
			break;
		}
	}

	for (let i = 0; i < 2 ; i++){
		dealersArray[i] = roll(currentDice);
	}
	dealerSum = dealersArray.reduce(getSum);
	console.log("Dealer Cards: " + dealersArray + " = " + dealerSum);
		
	while(dealerSum < 17){
		dealersArray.push(roll(currentDice));
		dealerSum = dealersArray.reduce(getSum);			
		console.log("Dealer Cards: " + dealersArray + " = " + dealerSum);
	}

	if (playerSum > 21){
		result = (-wager);
	}else if((playerSum == 21) && (playersArray.length == 2)) {
		result = (2 * wager);
	} else if ((dealerSum > 21) &&(playerSum <= 21)){
		result = (wager);
	} else if(dealerSum > playerSum){
		result = (-wager);
	} else if (playerSum > dealerSum){
		result = (wager);
	} else {
		result = (0 * wager);
	} 
	currentMoney = moneyTracker(currentMoney, result);
	return currentMoney;
}

function getSum(x,y){return (x + y)}

function removeDuplicates(x, y, self){return self.indexOf(x) == y;}

function slots(currentMoney, wager){
let currentDice = 22;
let result = 0;
let slotsArray = new Array(3);

	for (let i = 0; i < slotsArray.length; i++) {
		slotsArray[i] = new Array(3);
	for (let j =0; j < slotsArray.length; j++)
		slotsArray[j]= roll(currentDice);
		console.log(slotsArray);
	
	if((Math.max(...slotsArray)) - (Math.min(...slotsArray)) < 1){
		result = (10 * wager);
	}else if((Math.max(...slotsArray)) - (Math.min(...slotsArray)) < 5){
		result = (2 * wager);
	}else if ((Math.max(...slotsArray)) - (Math.min(...slotsArray)) <= 10){
		result = (1 * wager);
	}else {
		result = (-wager);
	}
		currentMoney = moneyTracker(currentMoney, result);
	}
	return currentMoney;
}

function moreSlots(currentMoney, wager){
let currentDice = 6;
let minimum = 4;
let result = 0;
let repeatSevens = -1; //left as -1 intentionally the sake of needing three 7's in order to win
let slotsArray = new Array(5);
let slotsArrayCopy;
let repeatingNumbers;

	for (let i = 0; i < slotsArray.length; i++) {
		slotsArray[i]= roll(currentDice, minimum);
	}
		console.log(slotsArray);
		
	for (let j = 0; j <= slotsArray.length; j++){
		if (slotsArray[j] == 7){
			repeatSevens++;
		}
	}
	if (repeatSevens > 0){
			result = (wager*repeatSevens);
	}
		//If you guys see a straight here while grading, please let me know, I never got one
	if (checkForStraight(slotsArray) >= 3){
		result = (Math.pow(wager,checkForStraight));
	}
	//you are more likely to see the results of this section if the currentDice variable was reduced
	slotsArrayCopy = slotsArray.filter(removeDuplicates);
	if (slotsArrayCopy.length == 2){
		repeatingNumbers = arrayIndicesComparison(slotsArrayCopy,slotsArray);
			if (repeatingNumbers == 3){
				result =((wager*repeatingNumbers) + result);

			}else{
				result =((Math.pow(wager,repeatingNumbers)) + result);
			}
	}
	if (result == 0){result = (-wager)}
		currentMoney = moneyTracker(currentMoney, result);
		return currentMoney;
}

function checkForStraight(arrayToCheck){
let straightMeasurement = 1;
	for (let i = 0; i < arrayToCheck.length - 1; i++){
		if(arrayToCheck[i + 1] - arrayToCheck[i] == 1){
			straightMeasurement++ ;
		} else {
			return;
		}
	}
	if (straightMeasurement >= 2){
		return straightMeasurement;
	}
}

function arrayIndicesComparison(array1, array2){
let counter = 0;
	for (let m = 0; m < array1.length; m++){
		for (let n = 0; n < array2.length; n++){
			if (array1[m] == array2[n]){
				counter++;
			}
		}
	}
	return counter;
}

function keno(currentMoney, wager){
let currentDice = 20;
let result = 0;
let playerArray = new Array (5);
let kenoArray = new Array ();
let newNumber;
let matchingNumbers;

	playerArray = prompt("Enter Five (5) numbers (1 through 20 and seperated by Spaces)").split(" ").map(Number);
		while(playerArray.length > 5){
			playerArray.pop();
		}

	console.log(playerArray);
	
	while (kenoArray.length < 5){
		newNumber = roll(currentDice);
		if ((kenoArray.indexOf(newNumber) >= 0)){
		} else {
			kenoArray.push(newNumber);
		}
	}
	kenoArray.sort(function(a, b){return a-b});
	console.log(kenoArray);
	
	matchingNumbers = arrayIndicesComparison(playerArray, kenoArray);
	
	if (matchingNumbers == 0){
		result = (-wager);
	} else {
		result = (Math.pow(wager , matchingNumbers));
	}
	currentMoney = moneyTracker(currentMoney, result);
	return currentMoney;
}

function threeCardPoker(currentMoney, wager){
let currentDice;
let minimum;
let result = 0;
let playerCardArray;
let dealerCardArray;
let raiseOrFold;

	console.log("Your Cards:")
	playerCardArray = threeCardArrays();
	console.log(playerCardArray);		
	raiseOrFold = prompt("1 = Raise, 2 = Fold");
	if (raiseOrFold == 1){
		dealerCardArray = threeCardArrays();
		console.log("Dealer's Cards:");	
		
		//if dealerCardArray[i] == playerCardArray[j] (for first 3 index spots) then splice 'n' slice index and get a new one
	for (let m = 0; m < 3; m++){
		for (let n = 0; n < 3; n++){
			if (playerCardArray[m] == dealerCardArray[n]){
				dealerCardArray.splice(n, 1);
				dealerCardArray = dealerCardArray.slice(0, 2);
				dealerCardArray = threeCardArrays(dealerCardArray);
			}
		}
	}
		console.log(dealerCardArray);	
		
		if ((dealerCardArray[4] == 1) && (dealerCardArray[3] < 12 )){		//if dealer has 12 or better then continue comparison, else result = (wager)
			result = (wager);
		} else if (dealerCardArray[dealerCardArray.length - 1] > playerCardArray[playerCardArray.length - 1]){
			result = (-(2 * wager));
		} else if(dealerCardArray[dealerCardArray.length - 1] < playerCardArray[playerCardArray.length - 1]){
			result = (2 * wager);
		} else if (dealerCardArray[dealerCardArray.length - 1] == playerCardArray[playerCardArray.length - 1]){
			if (dealerCardArray[dealerCardArray.length - 2] >= playerCardArray[playerCardArray.length - 2]){
				result = (-(2 * wager));
			} else {
				result = (2 * wager);
			}
		}
	} else {
		result = (-wager);
	}
	currentMoney = moneyTracker(currentMoney, result);
	return currentMoney;
}

function threeCardArrays (finalCardArray = []){
let currentDice;
let minimum;
let numberCard;
let suit;
let numbersCheck = [];
let suitsCheck = [];
let finalCardArrayCopy;
let straight = 0;
	//used a while loop for the sake of removing duplicate cards
	//for example, so player/dealer does not end up with 4H, 4H, 2H
	while (finalCardArray.length < 3){ 			
		currentDice = 13; //13
		minimum = 2;
		numberCard = roll(currentDice, minimum);
		currentDice = 4; //4
			suit = roll(currentDice);
				if (suit == 1){		//need to find an easier way than if statements
					suit = "H";
				} else if(suit == 2){
					suit = "C";
				} else if(suit == 3){
					suit = "S";
				} else {
					suit = "D";
			}
			finalCardArray.push(numberCard + suit);
			finalCardArrayCopy = finalCardArray;
			
			finalCardArray = finalCardArray.filter(removeDuplicates);
			if (finalCardArray.length == finalCardArrayCopy.length){
				numbersCheck.push(numberCard);
				suitsCheck.push(suit);
			}
	}
		//Straight Flush = 6
		//three of a kind = 5
		//Straight = 4
		//Flush = 3
		//Pair = 2
		//High Card = 1
		numbersCheck = numbersCheck.sort(function(a, b){return a-b});
			if ((numbersCheck.length == 3) && (checkForStraight(numbersCheck) == 3)){
				straight = 1;
			}
		suitsCheck = suitsCheck.filter(removeDuplicates);
		numbersCheck = numbersCheck.filter(removeDuplicates);
		
		if ((straight == 1) && (suitsCheck.length == 1)){	//straight flush
			finalCardArray.push(Math.max(...numbersCheck))
			finalCardArray.push(6); 
		} else if (straight == 1){							//straight
			finalCardArray.push(Math.max(...numbersCheck))
			finalCardArray.push(4);
		} else if (suitsCheck.length == 1){					//flush	
			finalCardArray.push(Math.max(...numbersCheck))
			finalCardArray.push(3);
		} else if(numbersCheck.length == 1){				//3 of a king
			finalCardArray.push(Math.max(...numbersCheck))
			finalCardArray.push(5);
		} else if(numbersCheck.length == 2){				//pair
			finalCardArray.push(Math.max(...numbersCheck))
			finalCardArray.push(2);
		} else {											//high card
			finalCardArray.push(Math.max(...numbersCheck))
			finalCardArray.push(1);
		}
		return finalCardArray;
}

function roll(numOfSides, min = 1){
	let randomNumber = Math.floor(Math.random() * numOfSides) + min;
		return randomNumber;
}

//known bugs/broken logic
//possibility of player and dealer getting same card in three card poker -- resolved
//highest card is used for comparison instead of pair value in three card poker -- whatever
//keno allows more than 5 inputs and compares the extras -- resolved
//the whole craps function is a bug -- whatever -- fixed it...dumb

function craps (currentMoney, wager){				//took this out due to the possibilty of very long/inifinte loops
let currentDice = 6;
let result = 0;
let initialRoll = new Array (2);
let initialRollSum;
let nextRoll = new Array (2);
let nextRollSum;

	for (let i = 0; i < initialRoll.length; i++) {
		initialRoll[i]= roll(currentDice);
	}
	initialRollSum = initialRoll.reduce(getSum);
	console.log("First Roll: " + initialRoll + " = " + initialRollSum);

	if ((initialRollSum == 7) || (initialRollSum == 11)){
		result = (wager);
	} else if((initialRollSum == 2) || (initialRollSum == 3) || (initialRollSum == 12)){
		result = (-wager);
	} else {
			while ((nextRollSum != initialRollSum) && (nextRollSum != 7)){
				for (let i = 0; i < nextRoll.length; i++) {
					nextRoll[i]= roll(currentDice);
				}
			nextRollSum = nextRoll.reduce(getSum);
			console.log("Next Roll: " + nextRoll + " = " + nextRollSum );
		}
		
		if (nextRollSum == initialRollSum){
			result = (wager);
		} else {
			result = (-wager);
		}
	}
	currentMoney = moneyTracker(currentMoney, result);
	return currentMoney;
}
