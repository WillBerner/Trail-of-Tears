class Event {
  constructor(descr, question, choices, results) {
    this.question = question;
    this.description = descr;
    this.choices = choices;
    this.results = results;
  }
}

let chanceValue;


//////////////////////////////////////////////////////////////////
////////////////// CREATING EVENTS ///////////////////////////////
//////////////////////////////////////////////////////////////////

let description1 = "It's the Spring of 1830. You and the other members of your tribe are being forced off of " +
"your ancestral homeland by the United States Government. Today you wake up to screams of your village being burned...";
let q1 = "Do you decide to try to take anything or just leave?";
let someChoices1 = {
  choice1: "Get out while you still can",
  choice2: "Go back to try to recover items"
}
chance();
let result1 = (chanceValue < 60 ? "You luckily get out with a few belongings and rations for the journey ahead" : "You barely escape with your life, suffering burns. You see many slaughtered as you run away...");
let startEvent = new Event(description1, q1, someChoices1, result1);

/////////////////////////////////////////////////////////////////////

let description2 = "You stumble across some tracks in the Appalachian Mountains that you know came from a rabbit not a day before."
let q2 = "Do you follow the tracks to look for food or keep moving forward with your group?";
let someChoices2 = {
  choice1: "Choose to go looking for the food",
  choice2: "Keep moving forward"
}
chance();
let result2 = (chanceValue < 80 ? "You follow the tracks to find a rabbit not too far along, enough to feed you for a day or two." : "You try to find the rabbit but are unsuccessful");
let secondEvent = new Event(description2, q2, someChoices2, result2);

/////////////////////////////////////////////////////////////////////

function chance() {
  chanceValue = Phaser.Math.Between(0, 100);
}
