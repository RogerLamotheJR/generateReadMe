
//Requirement for npm prompt to work
'use strict';
const inquirer = require('inquirer');
const prompt = require('prompt');
const chalkPipe = require('chalk-pipe');
//Requirement for fs to work
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
const util = require('utils');
let info = '';

fs.readFile("data.csv", "utf8", function(error, data) {

  if (error) {
    console.log(error);
    return;
  }

  console.log(data);

// });
/*Starting prompt
  Prompt is going to ask for user info add md format and save it to var info,
  then is going to call function writeFiles and finally
  is going to call function readFile  
*/
// prompt.start();

// prompt.get(['project title', 'description', 'age', 'username', 'email'], function(err, result) {
//   if (err) {
//     return onErr(err);
//   }

//   info = `# User information:
//     Project Name: ${result.name}\n
//     Description: ${result.description}
//     Age: ${result.age}\n
//     Username: ${result.username}\n
//     Email: ${result.email}
//   `;
//   writeFile(info);
//   readFile();
// });

// function onErr(err) {
//   console.log(err);
//   return 1;
// }


const questions = [
  {
    type: 'input',
    name: 'title',
    message: "What's is the title",
  },
  {
    type: 'input',
    name: 'description',
    message: "What's your description",
    default: function() {
      return 'Doe';
    }
    },
    {
      type: 'input',
      name: 'installation',
      message: "What's is the installation",
    },
    {
      type: 'input',
      name: 'usage',
      message: "What's your useage",
      default: function() {
        return 'Doe';
      }
      },
      {
        type: 'input',
        name: 'License',
        message: "What's your license",
        default: function() {
          return 'Doe';
        }
        },
        {
          type: 'input',
          name: 'username',
          message: "What's your username",
          default: function() {
            return 'Doe';
          }
          },
          {
            type: 'inpute',
            name: 'email',
            message: "What's your email",
            default: function() {
              return 'Doe';
            }
            },
  {
    type: 'input',
    name: 'fav_color',
    message: "What's your favorite color for a car",
    transformer: function(color, answers, flags) {
      const text = chalkPipe(color)(color);
      if (flags.isFinal) {
        return text + '!';
      }

      return text;
    }
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number",
    validate: function(value) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid phone number';
    }
  },
  {
    type: 'list',
    name: 'Vehicles',
    message: 'What types of vehicles do you like?',
    choices: ['Sedan', 'Hatchback', 'Pick Up', 'Coupe', 'SUV', 'Sportcar'],
    filter: function(val) {
      return val.toUpperCase();
    }
  },
  
];

//Function to write the info and creater the file readme.md
function writeFile (data){
  fs.writeFile('readme.md', data, function (err) {
    if (err) return console.log(err);
  });
}

// Function to read info from file readme.md and show it on screen
function readFile (){
  fs.readFile('readme.md', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    conxsole.log(data);
  });
}

inquirer.prompt(questions).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
  writeFile(generateMarkdown(answers))
});

