/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
// Don't touch this part
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.2f9cd831-6df7-4991-9ef9-93eb7a528b4d';


// Common Messages Used for Convenience
const HELP_MESSAGE = 'What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const HELLO_MESSAGE = 'Hi! I\'m Alfred the Virtual Butler!';

//=========================================================================================================================================
// Put your code here for the intents!
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('helloIntent');
    },
    'helloIntent': function () {
        var reprompt = 'What can I do for you?';
        this.response.speak(HELLO_MESSAGE).listen(reprompt);
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
    'askFacilityTime': function () {
        let filledSlots = handleGeneralSlots.call(this);
        let facility = this.event.request.intent.slots.facility.value;
        let timing_type = this.event.request.intent.slots.timing_type.value;
        let facilityOpeningTimes = {
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
        
        let openingTime = facilityOpeningTimes[facility]["openingTime"];
        let closingTime = facilityOpeningTimes[facility]["closingTime"];

        let speechOutput = "The " + facility + " opens at " + openingTime + " and closes at " + closingTime;

        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },
    'askFacilityLocation': function () {
        var filledSlots = handleGeneralSlots.call(this);
        var facility = this.event.request.intent.slots.facility.value;
        var facilityLocation = {
            gym: {
                location: '15th Floor'
            },
            spa: {
                location: '15th Floor'
            },
            pool: {
                location: 'Ground Floor'
            },
            hair_salon: {
                location: 'Ground Floor'
            }
        };
        
        var location = facilityLocation[facility]["location"];
        var speechOutput = "The " + facility + " is located on the " + location; 
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
    'askSmokingInRoom': function () {
    	var speechOutput = 'Smoking is prohibited in guest rooms. Please smoke at the designated smoking area on the fifth floor next to the lift lobby.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askPet': function () {
    	var speechOutput = 'Pets are not allowed within hotel premises.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askMaxPeopleInRoom': function () {
    	var speechOutput = 'Please refrain from bringing external guests into your hotel room.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askRoomEntertainment': function () {
    	var speechOutput = 'We have over 6000 movies and telvision shows available on Netflix, as well as access to over 30 million songs from Spotify and radio on our bluetooth media device.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askRoomTvChannel': function () {
    	var speechOutput = 'Movies are on Channel 100, Sports are on Channel 200 and News are on Channel 300. For more details on channel listing, please refer to our television guide on your room desk.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askRoomAircon': function () {
    	var speechOutput = 'There are individual thermostat controls in each room. Simply turn the dial clockwise to be warmer or anticlockwise for cooler temperatures. There is also a fan speed control at the bottom of the thermostat.';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askFoodMenu': function () {
    	var speechOutput = 'You can see a list of food available located on the menu on your desk. We highly recommend you to try our signature Chicken Rice dish, as well as Nasi Lemak.';
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
    },
    'reqHousekeepingItem': function () {
    	var filledSlots = handleGeneralSlotsWithIntentConfirmation.call(this);
    	let intentObj = this.event.request.intent;
    	if (intentObj.confirmationStatus === "DENIED") {
    		let speechOutput = "Apologies, I must have misunderstood you";
    		this.response.speak(speechOutput);
    		this.emit(":responseReady");
    	} else {
	    	let number = intentObj.slots.number.value;
	    	let housekeepingItem = intentObj.slots.housekeepingItem.value;
	        let speechOutput = "I will inform housekeeping immediately to bring you " + number + ' ' + housekeepingItem;
	        this.response.speak(speechOutput);
	        this.emit(':responseReady');
    	};	
    },
    'reqHousekeepingService': function () {
    	var filledSlots = handleGeneralSlotsWithIntentConfirmation.call(this);
    	let intentObj = this.event.request.intent;
    	if (intentObj.confirmationStatus === "DENIED") {
    		let speechOutput = "Apologies, I must have misunderstood you";
    		this.response.speak(speechOutput);
    		this.emit(":responseReady");
    	} else {
	    	let housekeepingService = intentObj.slots.housekeepingService.value;
	        let speechOutput = "I will inform housekeeping immediately to " + housekeepingService;
	        this.response.speak(speechOutput);
	        this.emit(':responseReady');	
    	};
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//=========================================================================================================================================
// Common User Defined Functions - Don't Touch These Unless you really have to!
//=========================================================================================================================================
function handleGeneralSlots() {
    if (this.event.request.dialogState === "STARTED") {
    	for (let key in this.event.request.intent.slots) {
    		if (typeof this.event.request.intent.slots[key].resolutions !== 'undefined') {
    			this.event.request.intent.slots[key].value = this.event.request.intent.slots[key].resolutions.resolutionsPerAuthority[0].values[0].value.name;
    		};
    	};
    	let updatedIntent = this.event.request.intent;
        this.emit(':delegate',updatedIntent);
    } else {
        return this.event.request.intent;
    };
};

function handleGeneralSlotsWithIntentConfirmation() {
	if (this.event.request.dialogState === "STARTED") {
		for (let key in this.event.request.intent.slots) {
			if (typeof this.event.request.intent.slots[key].resolutions !== 'undefined') {
				this.event.request.intent.slots[key].value = this.event.request.intent.slots[key].resolutions.resolutionsPerAuthority[0].values[0].value.name;
			};
		};
		let updatedIntent = this.event.request.intent;
    	this.emit(':delegate',updatedIntent);
	} else if (this.event.request.dialogState !== "COMPLETED") {
        let intentObj = this.event.request.intent;
        let nSlotsFilled = 0;
        for (let key in intentObj.slots) {
        	if (typeof intentObj.slots[key].value !== 'undefined') {
        		nSlotsFilled += 1;
        	}
        }
        if (nSlotsFilled == Object.keys(intentObj.slots).length) {
        	let updatedIntent = this.event.request.intent;
        	this.emit(':confirmIntent','','',updatedIntent);
        } else {
			for (let key in this.event.request.intent.slots) {
				if (typeof this.event.request.intent.slots[key].resolutions !== 'undefined') {
    				this.event.request.intent.slots[key].value = this.event.request.intent.slots[key].resolutions.resolutionsPerAuthority[0].values[0].value.name;
    			};
    		};
    		let updatedIntent = this.event.request.intent;
        	this.emit(':delegate',updatedIntent);
        };
    } else {
		return this.event.request.intent;
	};
};