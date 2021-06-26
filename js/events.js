class Event {
  constructor(descr, question, choices) {
    this.question = question;
    this.description = descr;
    this.choices = choices;
  }
}

//////////////////////////////////////////////////////////////////
////////////////// CREATING EVENTS ///////////////////////////////
//////////////////////////////////////////////////////////////////

let description1 = "You wake up to screams of your campsite\nbeing burned...";
let q1 = "Do you decide to try to \ntake anything or just leave?";
let someChoices1 = {
  choice1: "Get out while you still can",
  choice2: "Go back to try to recover items",
  result1: "You barely escape with your life,\nsuffering burns You see many slaughtered\nas you run away...",
  result2: "You luckily get out with a few belongings\n and rations.",
  calculate: function(result) {
    if (result === this.choice1) {
      character.rations -= 5;
      character.living -= 40;
      character.medicine -=20;
    } else {
      character.rations += 20;
      character.medicine += 10;
    }
  }
}
let event1 = new Event(description1, q1, someChoices1);

/////////////////////////////////////////////////////////////////////

let description2 = "You stumble across some tracks in the \nAppalachian Mountains that you know \ncame from a rabbit not a day before."
let q2 = "Do you follow the tracks to look for food \nor keep moving forward with your group?";
let someChoices2 = {
  choice1: "Choose to go looking for the food",
  choice2: "Keep moving forward",
  result1: "You follow the tracks to find a rabbit\nnot too far along, enough to feed you\nfor a few days.",
  result2: "Your group continues to match forawrd.",
  calculate: function(result) {
    if (result === this.choice1) {
      character.rations += 20;
    }
  }
}
let event2 = new Event(description2, q2, someChoices2);

/////////////////////////////////////////////////////////////////////

let description3 = "Your people are hungry and you must eat."
let q3 = "Do you eat a large meal or a small meal?";
let someChoices3 = {
  choice1: "Eat a large meal",
  choice2: "Eat a small meal",
  result1: "The meal fills most people up and\nyou continue to march on.",
  result2: "Some are filled but many go hungry...",
  calculate: function(result) {
    if (result === this.choice1) {
      character.rations -= 20;
    } else {
      character.rations -= 10;
    }
  }
}
let event3 = new Event(description3, q3, someChoices3);

/////////////////////////////////////////////////////////////////////

let description4 = "You find a destroyed wagon on the side\n of the road.";
let q4 = "Will you search the wagon for supplies?";
let someChoices4 = {
  choice1: "No, it looked like they were attacked",
  choice2: "The people need medicine",
  result1: "You quickly leave the area.",
  result2: "Your group is attacked by bandits\nand many are killed",
  calculate: function(result) {
    if (result === this.choice2) {
      character.rations -= 5;
      character.living -= 50;
      character.dead += 50;
    }
  }
}
let event4 = new Event(description4, q4, someChoices4);

/////////////////////////////////////////////////////////////////////

let description5 = "An elderly woman in your tribe needs\nsurgery done to save her life.";
let q5 = "Do you use 20 medicine to heal the woman?";
let someChoices5 = {
  choice1: "We don't have enough as it is.",
  choice2: "We can leave nobody behind!",
  result1: "Your tribe is disheartened.",
  result2: "The woman is saved and you continue on",
  calculate: function(result) {
    if (result === this.choice2) {
      character.medicine -= 20;
    } else {
      character.living--;
      character.dead++;
    }
  }
}
let event5 = new Event(description5, q5, someChoices5);

////////////////////////////////////////////////////////////
////////////////// MAKE SURE TO ////////////////////////////
/////////// ADD ALL EVENTS TO THE EVENTS ARRAY /////////////
////////////////////////////////////////////////////////////

let events = [event1, event2, event3, event4, event5];
