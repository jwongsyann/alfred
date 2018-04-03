/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.2f9cd831-6df7-4991-9ef9-93eb7a528b4d';

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'A year on Mercury is just 88 days long.',
    'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
    'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
    'On Mars, the Sun appears about half the size as it does on Earth.',
    'Earth is the only planet not named after a god.',
    'Jupiter has the shortest day of all the planets.',
    'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
    'The Sun contains 99.86% of the mass in the Solar System.',
    'The Sun is an almost perfect sphere.',
    'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
    'Saturn radiates two and a half times more energy into space than it receives from the sun.',
    'The temperature inside the Sun can reach 15 million degrees Celsius.',
    'The Moon is moving approximately 3.8 cm away from our planet every year.',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('helloIntent');
    },
    'helloIntent': function () {
        var speechOutput = 'Hi! I\'m Alfred the Virtual Butler!';
        var reprompt = 'What can I do for you?';
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'reqHousekeepingItem': function () {
        const intentObj = this.event.request.intent;
            if (intentObj.confirmationStatus === 'CONFIRMED') {
                var speechOutput = "Ok, I will inform housekeeping immediately!"
                this.response.speak(speechOutput);
                this.emit(':responseReady');
            } else if (intentObj.confirmationStatus !== 'CONFIRMED') {
                var updatedIntent = handleOrderHousekeepingItemSlots.call(this);
                this.emit(":confirmIntent",updatedIntent);
            }
    },
    'askFacilityTime': function () {
        var filledSlots = handleOrderHousekeepingItemSlots.call(this);
        var facility = this.event.request.intent.slots.facility.value;
        
        var facilityOpeningTimes = {
            gym: {
                openingTime: '6am',
                closingTime: '10pm'
            },
            spa: {
                openingTime: '9am',
                closingTime: '9pm'
            },
            pool: {
                openingTime: '7am',
                closingTime: '7pm'
            },
            hair_salon: {
                openingTime: '10am',
                closingTime: '7pm'
            }
        };
        
        var openingTime = facilityOpeningTimes[facility]["openingTime"];
        var closingTime = facilityOpeningTimes[facility]["closingTime"];
        
        var timing_type = this.event.request.intent.slots.timing_type.value;
        
        if (timing_type === 'open') {
            var speechOutput = "The " + facility + " opens at " + openingTime; 
        } else {
            var speechOutput = "The " + facility + " closes at " + closingTime;
        }
        
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },
    'askWifiPassword': function () {
    	var speechOutput = 'The wifi password is 1';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askSmokingLocation': function () {
    	var speechOutput = 'The smoking area is located on the fifth floor next to the lift lobby.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askPet': function () {
    	var speechOutput = 'Pets are not allowed within hotel premises.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askRestaurantGeneral': function () {
        var filledSlots = handleGeneralSlots.call(this);

        var restaurant = this.event.request.intent.slots.restaurant.value;
    	
        if (restaurant == 'sea_breeze_cafe') {
            var speechOutput = restaurant + ' is located next to the Main Wing pool. It is open from 630am to 11pm';

        } else if (restaurant == 'charm_thai') {
            var speechOutput = restaurant + ' is located at the Busakorn Wing. It is open from 630am to 11pm.';
        
        } else if (restaurant == 'poolside_bar') {
            var speechOutput = restaurant + ' overlooks the ocean by the pool and it is open from 9am to 8pm';
        
        } else if (restaurant == 'terrazzo') {
            var speechOutput = restaurant + ' is located at the main wing and is open from 11am to 1130pm.';
        
        } else if (restaurant == 'sam_steak') {
            var speechOutput = restaurant + ' is located at the main wing. It is open from 6pm to 12am.';    
    	};

    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// User Defined Handlers
function handleOrderHousekeepingItemSlots() {
    if (this.event.request.dialogState === "STARTED") {
        let updatedIntent = this.event.request.intent;
        this.emit(':delegate',updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
        this.emit(":delegate");
    } else {
        return this.event.request.intent;
    };
}
