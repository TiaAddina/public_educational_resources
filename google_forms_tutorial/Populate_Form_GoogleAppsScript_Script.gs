// AUTHOR: Tia Addina
// AUTHOR CONTACT: tangyrazif@gmail.com
// Email me about questions/ if you get stuck getting this set up on your account!! 
// I'm happy to help out =))

// Check out the tutorial video this script is based on (not mine): https://www.youtube.com/watch?v=o3AL7ASI_cA
// Also check out my video going through how to set up a survey form + how to install and use this script: https://www.youtube.com/watch?v=gYe6fJFXkgA

// Happy coding!!

// ID FOR SOURCE SPREADSHEET
var ssID = "INSERT_SPREADSHEET_ID_HERE";

// ID FOR TARGET FORM
var formID = "INSERT_FORM_ID_HERE";

// OPEN THE SHEET NAMED "DATA" FROM THE REFERENCED SPREADSHEET
var wsData = SpreadsheetApp.openById(ssID).getSheetByName("Sheet1");

// OPEN THE FORM REFERENCED
var form = FormApp.openById(formID);

function main() {
  
  // GET QUESTIONS FROM SHEETS
  var labels = wsData
              .getRange(1, 1, wsData.getLastRow(), 1)
              .getValues()
              .map(function(option) {return option[0]});
  Logger.log(labels);

  // CREATE QUESTIONS ON FORM AND ADD ANSWERS TO EACH QUESTION
  labels.forEach(function(label, i){

    // GET ANSWERS FROM SHEETS
    // GRAB ITEMS IN SHEET FROM SECOND CELL IN ROW TO LAST POSSIBLE CELL WITH CONTENT
    var options = wsData
                  .getRange( i + 1, 2, 1, wsData.getLastColumn() - 1)
                  .getValues()
                              

    // REMOVE EMPTY CELLS FROM ANSWER-OPTIONS SET
    options = options[0].filter(function(option) { return option !== ""; });
                            

    //  IF NO ANSWERS, INSERT SECTION
    if (options.length == 0.0) { // IF ROW ONLY HAS FIRST CELL FILLED, THAT CELL IS A SECTION TITLE
      var item = form.addPageBreakItem(); // ADD SECTION TO FORM
      item.setTitle(label);               // SET TITLE OF FORM TO REFLECT CELL CONTENT
    } else {    // IF ROW HAS MORE THAN ONE CELLS FILLED, ITS A QUESTION + ANSWERS
      
      // CREATE NEW QUESTION, SET IT TO "REQUIRED"
      var question = form.addMultipleChoiceItem().setRequired(true);

      // SET TITLE OF QUESTION (I.E. THIS IS THE TEXT OF QUESTION, LIKE "HOW DO YOU FEEL?")
      question.setTitle(label.toString());

      // APPLY ANSWERS TO QUESTION
      question.setChoiceValues(options);


    } ;

    
  });

}

// FUNCTION FOR CLEARING THE FORM
function clearForm(){

  // GET ALL THE ITEMS IN THE FORM (Questions, Sections, Title Cards, EVERYTHING)
  var items = form.getItems();

  // DELETE ALL OF THOSE ITEMS FROM THE FORM BY ITERATING THROUGH THEM
  while(items.length > 0){ // While the number of items is more than zero
    form.deleteItem(items.pop()); // Delete the current item
  }

}
