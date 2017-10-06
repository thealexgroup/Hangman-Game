var myScript = function(runGame) {

			var wins=0; //number of wins, don't want to overwrite this later.
			var losses=0; //crap, add losses

	
	var reStart = function() { //restart the game when it's over

			var wordsArray = [ //the array of all of the possible words
			"aardvark","abyssinian","albatross","alligator","ant","anteater","antelope","armadillo","avocet","axolotl","baboon",
			"badger","bandicoot","barracuda","bat","bear","beaver","bee","beetle","bison","bobcat","bonobo","booby","buffalo",
			"butterfly","buzzard","caiman","camel","capybara","cassowary","cat","caterpillar","catfish","centipede","chameleon",
			"cheetah","chicken","chimpanzee","chinchilla","chipmunk","civet","cockroach","cougar","cow","coyote","crab","crane",
			"crocodile","cuttlefish","deer","dingo","dodo","dog","dolphin","donkey","dormouse","dragonfly","duck","dugong","eagle",
			"earwig","echidna","elephant","emu","falcon","ferret","flamingo","flounder","fossa","fox","frigatebird","frog","gecko",
			"gerbil","gharial","gibbon","gila","giraffe","goat","goose","gopher","gorilla","grasshopper","grouse","guppy","hamster",
			"hare","harrier","hedgehog","hippopotamus","hornet","horse","hound","hyena","ibis","iguana","impala","indri","jackal",
			"jaguar","jellyfish","kakapo","kangaroo","kingfisher","koala","kudu","lemming","lemur","leopard","liger","lion",
			"lionfish","lizard","llama","lobster","loon","lynx","macaque","macaw","magpie","manatee","markhor","mayfly","meerkat",
			"millipede","mole","mongoose","monkey","moose","moth","mouse","newt","numbat","ocelot","octopus","okapi","olm","opossum",
			"orangutan","oriole","ostrich","otter","owl","oyster","pademelon","panther","parrot","peacock","pelican","pheasant","pig",
			"pika","pike","piranha","platypus","porcupine","possum","prawn","puffin","puma","quail","quetzal","quokka","quoll","rabbit",
			"raccoon","rat","rattlesnake","reindeer","rhinoceros","robin","salamander","saola","scorpion","seahorse","seal","serval",
			"shark","sheep","shrimp","skunk","sloth","snail","snake","sparrow","spider","sponge","squid","squirrel","starfish","stingray",
			"stoat","swan","tamarin","tapir","tarsier","termite","tetra","tiger","toad","tortoise","toucan","tuatara","turkey","uakari",
			"uguisu","vulture","wallaby","walrus","warthog","wasp","weasel","whale","wildebeest","wolf","wolverine","wombat","woodlouse",
			"woodpecker","worm","yak","zebra","zebu","zonkey","zorse"];
				    
		    var currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];// get a word from my array 
			var letters = "abcdefghijklmnopqrstuvwxyz";									//used to check if it's a valid letter
			var usedLetters = [];														//the used letters
		    var guesses = 7; 															//how many wrong guesses to start
		    var wordString = currentWord.toString();									//put the current word in string format
		    var matches = 0;															//count for the number of matched letters
		    var dashArray = [];															//put the word in dashed array

		    //for every letter in my selected word, add a dash to dash array
		    for (var i = 0; i < currentWord.length; i++) {
				            dashArray.push("_");
	        };

				    //this is all stuff I will use to write in the HTML doc
				    var htmlStart = document.getElementById("startIt");
				    var htmlGuesses = document.getElementById("tries");
				    var htmlWord = document.getElementById("word");
				    var htmlSelect = document.getElementById("selectEm");
				    var htmlUsed = document.getElementById("used");
				    var htmlOver =  document.getElementById("gameOver");
				    var htmlWins =  document.getElementById("wins");
				    var htmlLosses =  document.getElementById("losses");
				    var htmlError = document.getElementById("errorMessage");


	        //write some stuff to the doc, make sure it's clean
	        htmlWord.innerHTML = "Your animal is: <br>  " + dashArray.join(" "); //leave a space between dashes
       		htmlSelect.innerHTML = "Pick some letters ";
	    	htmlOver.innerHTML = " ";


    //this is the letter picking, checking, etc. function
  	var pickedLetter = document.onkeyup = function(gameKey) {
  		console.log(gameKey);

	        htmlGuesses.innerHTML = "You have " + guesses + " wrong guesses left.";		//show how many guesses you have.  
	        htmlSelect.innerHTML = "";													//general stupid instructions
	        htmlStart.innerHTML = "";													//take the press any ... off
	        var key = gameKey.key; 														//write the key pressed to variable key
	        var checkLetter = usedLetters.toString();									//used letter array to string for search

	        	//if it's NOT a lower case letter, show an error in the HTML doc
          		if ((letters.search(new RegExp(key)) <= -1) || (key == ".")) {
				htmlError.innerHTML = "You entered " + key + " - please enter a LOWER CASE letter from a-z";
        	};
        		//if it IS a lower case letter but it's already used, show an error
	       	 	if (checkLetter.search(new RegExp(key)) > -1) {
				htmlError.innerHTML = "You entered " + key + ". You already used that, try again";
	       		//if it IS a lower case letter and not used and not the ".", work with it.  The period thing seemed
	       		//like a bug, if I pressed it would push, go to my used letter board, etc.  
	       	} else if ((letters.search(new RegExp(key)) > -1) && (key != ".")) {
        		usedLetters.push(key);	
    			htmlUsed.innerHTML =  "Used letter board: " + usedLetters.toString();
    			htmlError.innerHTML = " ";
        	}; 

    //function for checking wrong guesses.
	var checkIfWrong = function() {
				if ((wordString.search(new RegExp(key)) <= -1) &&   					//if the letter isn't in the word
					(letters.search(new RegExp(key)) > -1) && 							//and it is a lower case letter
					(checkLetter.search(new RegExp(key)) <= -1)) { 						//and it's NOT in the used letters
                guesses--; 																//subtract 1 from guesses
                htmlGuesses.innerHTML = "You have " + guesses + " wrong guesses left.";	//redisplay the number of guesses
			};
		}; checkIfWrong();

	//function for working with letters that are in the word
	var checkIfCorrect = function() {
                for (var i = 0; i < currentWord.length; i++) {
                		if ((currentWord.charAt(i) == key) && 								//if any letter matches the key pressed
                			(checkLetter.search(new RegExp(key)) <= -1)) {  				//and it's not already been used
                        dashArray[i] = key;													//change the _ in the dash to that key
                        htmlWord.innerHTML = "Your animal is: <br> " + dashArray.join(" "); //redisplay the array
            			matches++;															//add one to matches for later
            	        };
            	};
        }; checkIfCorrect();

        		//every time you go through the key press, check if matches equals the length of your word for a win or
        		//check if out of guesses.  If either is true, execute function finishIt
        		if ((matches == wordString.length) || (guesses == 0)) {
						document.onkeyup = function(gameKey) { //had to add this otherwise you could keep picking letters, etc.
							return false;
						};
					}; finishIt();

    };// end of pickedLetter function

    //function to end the game, start another one after five seconds
    var finishIt = function() {

        		if (matches == wordString.length) { 								   //if matches = wordlength (winner)
        		htmlGuesses.innerHTML = " ";										   //take the number of guesses left off screen
        		wins ++;															   //update wins, and DON'T overwrite that count!
        		htmlSelect.innerHTML = "You won! Wait a few seconds for another game"; //show a happy message
        		htmlWins.innerHTML = "Wins: " + wins;								   //show the number of wins so far
        		htmlLosses.innerHTML = "Losses: " + losses;							   //show the number of wins so far
        		htmlUsed.innerHTML =  "";											   //take off the used letters
        		if ((matches == wordString.length) || (guesses == 0)) {				   //if either condition is true, 
        			endIt();														   //execute endit
        		}
        	};

        	if (guesses == 0) {															//if guesses = 0 (loser)
        		htmlGuesses.innerHTML = " ";											//take off the number of guesses
        		losses++;																//add to losses
        		htmlOver.innerHTML = "Game Over - The answer was " + currentWord;		//show the answer
        		htmlSelect.innerHTML = "Wait a few seconds for another game";			//loser message on screen        		
        		htmlWins.innerHTML = "Wins: " + wins;									//show wins
        		htmlLosses.innerHTML = "Losses: " + losses;								//show losses
        		htmlUsed.innerHTML =  ""; 												//no need to show the used letter board.
        		if ((matches == wordString.length) || (guesses == 0)) {					//if either condition is true, 
        			endIt();															//execute endIt
        		}
        	};
        		//interesting aside about the finishIt function.  I had to use both evals with an || "or" operand to get out.  
	       		//Seems that if you only check one on each, it will never leave the function.  They are mutually exclusive.
        }; finishIt();
	}; //this is the end of my reStart function.  I don't call it here.
 	
 	//when endIt is called above, sets a timeout so you can see the stuff for five seconds, then starts a NEW game!  
 	var endIt = function(){
		 		setTimeout(function() {
		        	reStart();
		        }, 5000); 
 		}; endIt();

}; myScript();
