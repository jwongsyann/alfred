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
        var filledSlots = handleGeneralSlots.call(this);
        var facility = this.event.request.intent.slots.facility.value;
        var timing_type = this.event.request.intent.slots.timing_type.value;
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
               
        if (timing_type === 'open') {
            var speechOutput = "The " + facility + " opens at " + openingTime; 
        } else if (timing_type === 'close') {
            var speechOutput = "The " + facility + " closes at " + closingTime;
        } else if (timing_type === 'operating_hours') {
        	var speechOutput = "The " + facility + "'s operating hours are from " + openingTime + " to " + closingTime;
        };

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
    },
    'reqHousekeepingItem': function () {
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
	    	let intentObj = this.event.request.intent;
	    	let number = intentObj.slots.number.value;
	    	let housekeepingItem = intentObj.slots.housekeepingItem.value;
	        let speechOutput = "I will inform housekeeping immediately to bring you " + number + ' ' + housekeepingItem;
	        this.response.speak(speechOutput);
	        this.emit(':responseReady');
	    };
    },
    'askBreakfastTime': function () {
    	var speechOutput = 'Breakfast is served daily from 6am to 10am';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askBreakfastIncluded': function () {
        var speechOutput = 'Breakfast is included and will be served from 6am to 9am at the lobby cafe';
    	this.response.speak(speechOutput);
        this.emit(":responseReady");	
    },
    'askBreakfastLocation': function () {
    	var speechOutput = 'Breakfast is available at the lobby cafe';
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

//=========================================================================================================================================
// Common User Defined Functions - Don't Touch These Unless you really have to!
//=========================================================================================================================================
function handleGeneralSlots() {
    if (this.event.request.dialogState !== "COMPLETED") {
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