
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

// Actual app launcher
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

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


        if (facility === 'gym') {
        	let speechOutput = ""
        } else {
        	
        }
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

		if (restaurant == 'sea breeze cafe') {
            var speechOutput = restaurant + ' is located next to the Main Wing pool. It is open from 630am to 11pm';

        } else if (restaurant == 'charm thai') {
            var speechOutput = restaurant + ' is located at the Busakorn Wing. It is open from 630am to 11pm.';

        } else if (restaurant == 'poolside bar') {
            var speechOutput = restaurant + ' overlooks the ocean by the pool and it is open from 9am to 8pm';

        } else if (restaurant == 'terrazzo') {
            var speechOutput = restaurant + ' is located at the main wing and is open from 11am to 1130pm.';

        } else if (restaurant == "sam's steak and grill") {
            var speechOutput = restaurant + ' is located at the main wing. It is open from 6pm to 12am.';
        };

        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },
    'reqHousekeepingItem': function () {
    	var filledSlots = handleGeneralSlots.call(this);
    	let intentObj = this.event.request.intent;
    	let number = intentObj.slots.number.value;
    	let housekeepingItem = intentObj.slots.housekeepingItem.value;
    	let speechOutput = 'I will inform housekeeping immediately to bring you ' + number + ' ' + housekeepingItem;
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
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

    },
    'reqTidyRoom': function () {
    	let speechOutput = 'Ok, I will inform housekeeping immediately to make your room';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'reqLaundryService': function () {
    	let speechOutput = 'Ok, I will inform housekeeping immediately to attend to your laundry service request';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'reqDoNotDisturb': function () {
    	let speechOutput = 'Ok, I will set your room status to do not disturb for today.';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askCurrencyExchange': function () {
    	let speechOutput = 'Sure, we have foreign currency exchange services at the front desk. Please approach the front desk for more information.';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askLuggageStorage': function () {
    	let speechOutput = 'Sure, you can leave the luggage with the front desk. I can get the bell boy to collect your luggage for storage whenever you are ready!';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askCheckoutTime': function () {
    	let speechOutput = 'Checkout time is 12pm';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askLocalExcursions': function () {
    	let speechOutput = 'You can take a trip to the Trick Eye Museum or the Bird Park or the Cashew Nut Factory. You can approach our front desk if you would like to go. Is there anything else I can help you with?';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askPaymentMethods': function () {
    	let speechOutput = 'You can use cash, credit or use traveller\'s check for payment';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askFacilityAttributes': function () {
    	var filledSlots = handleGeneralSlots.call(this);
    	let intentObj = this.event.request.intent;

    	let facility = intentObj.slots.facility.value;
    	let facilityAttribute = intentObj.slots.facilityAttribute.value;
    	let speechOutput = '';

    	switch (facility) {
    		case 'pool':
    			switch (facilityAttribute) {
    				case 'length':
    					speechOutput = 'The pool is 100 meters long';
    					break;
    				case 'width':
    					speechOutput = 'The pool is 50 meters wide';
    					break;
    				case 'depth':
    					speechOutput = 'The pool is 2 meters deep';
    					break;
    				case 'lifeguard':
    					speechOutput = 'There is no lifeguard on duty at the pool. Please exercise caution when swimming';
    					break;
    				case 'attire':
    					speechOutput = 'Please be dressed appropriately for the pool';
    					break;
    				case 'type':
    					speechOutput = 'There is a lap pool and a children\'s pool';
    					break;
    				case 'waterType':
    					speechOutput = 'The pool is chlorinated with a pH level of 7';
    					break;
    				case 'chlorineLevel':
    					speechOutput = 'The chlorine level of our pool is maintained at 3ppm (parts per million) which is the standard safety level';
    					break;
    				case 'protectiveEquipment':
    					speechOutput = 'Pool floats are available at the pool counter'
    					break;
    				case 'unitRates':
    					speechOutput = 'The pool is free of charge for all hotel guests'
    					break;
    				case 'amenities':
    					speechOutput = 'Towels are available at the pool counter'
    					break;
    				default:
    					speechOutput = 'Sorry, I don\'t know that one';
    			};
    			break;
    		case 'gym':
    			switch (facilityAttribute) {
    				case 'equipment':
    					speechOutput = 'The gym is fully equipped with fitness machines and free weights';
    					break;
    				case 'trainer':
    					speechOutput = 'The gym is monitored 24/7 with trainers on hand';
    					break;
    				case 'attire':
    					speechOutput = 'Please be dressed appropriately for the gym';
    					break;
    				case 'protectiveEquipment':
    					speechOutput = 'Protective wear and equipment are available at the gym counter';
    					break;
    				case 'unitRates':
    					speechOutput = 'The gym is free of charge for all hotel guests';
    					break;
    				case 'amenities':
    					speechOutput = 'Towels are available at the gym counter'
    					break;
    				default:
    					speechOutput = 'Sorry, I don\'t know that one';
    			};
    			break;
    		case 'spa':
    			switch (facilityAttribute) {
    				case 'attire':
    					speechOutput = 'Please be dressed appropriately for the spa';
    					break;
    				case 'unitRates':
    					speechOutput = 'The spa rates range from $38 for a foot massage to $480 for a full spa session';
    					break;
    				case 'amenities':
    					speechOutput = 'Towels are available at the spa and sauna'
    					break;
    				default:
    					speechOutput = 'Sorry, I don\'t know that one';
    			};
    			break;
    		default:
    			speechOutput = 'Sorry, I don\'t know that one';
    	}
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askHotelAddress': function () {
    	var filledSlots = handleGeneralSlots.call(this);
    	let speechOutput = 'The address of Holiday Inn Resort Phuket is 52 Thawewong Rd, Tambon Patong, Amphoe Kathu, Chang Wat Phuket 83150, Thailand';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askHotelRestaurants': function () {
    	var filledSlots = handleGeneralSlots.call(this);
    	let speechOutput = 'There is Terrazzo, an Italian Restaurant, Sam\'s Steak and Grill serving western,  Charm Thai for some local Thai cuisine,  buffets at Sea Breeze Cafe, and last but not least, The Bar for drinks and cocktails. Is there anything else I can help you with';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askHotelFacilities': function () {
    	var filledSlots = handleGeneralSlots.call(this);
    	let speechOutput = 'This hotel is fully fitted to your needs! You will find a pool, spa and a full gym on the fifth floor, a hairdresser on the ground floor and a tennis court at the top floor.';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'reqRestaurantReservation': function () {
    	var filledSlots = handleGeneralSlots.call(this);
    	let intentObj = this.event.request.intent;
    	let number	= intentObj.slots.number.value;
    	let restaurant = intentObj.slots.restaurant.value;
    	let time = intentObj.slots.time.value;
    	let speechOutput = 'Ok, i will make a reservation for ' + number + ' at ' + restaurant + ' at ' + time;
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askLaundryService': function () {
    	let speechOutput = 'Laundry services are available 24/7';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'askLaundryServiceRates': function () {
        var filledSlots = handleGeneralSlots.call(this);
        var laundryService = this.event.request.intent.slots.laundryService.value;
        var serviceRates = {
            'wash': {
                rate: '$2 per piece'
            },
            'dry clean': {
                rate: '$50 per piece'
            },
            'iron': {
                rate: '$5 per piece'
            }
        };
        
        var rate = serviceRates[laundryService]["rate"];
        var speechOutput = rate;
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },
    'reqBellboyService': function () {
    	let speechOutput = 'Sure, I will inform the bell boy immediately';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'reqCheckoutExtension': function () {
    	let speechOutput = 'Sure, your checkout time has been extended to 2pm';
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'reqRoomService': function () {
    	var filledSlots = handleGeneralSlots.call(this);
    	let intentObj = this.event.request.intent;
    	let dish = intentObj.slots.dish.value;
    	let speechOutput = 'I will inform room service immediately to bring you ' + dish;
    	this.response.speak(speechOutput);
    	this.emit(':responseReady');
    },
    'SessionEndedRequest': function() {
    	console.log('session ended!');
    	this.emit(':saveState', true);
  	}
};

//=========================================================================================================================================
// Common User Defined Functions - Don't Touch These Unless you really have to!
//=========================================================================================================================================
function handleGeneralSlots() {
	let intentObj = this.event.request.intent;
    if (this.event.request.dialogState === "STARTED") {
    	// Replace intent slot values with resolution values for standardization
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].resolutions !== 'undefined') {
    			intentObj.slots[key].value = intentObj.slots[key].resolutions.resolutionsPerAuthority[0].values[0].value.name;
    		};
    	};

    	// Count number of slots filled
    	let nSlotsFilled = 0;
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].value !== 'undefined') {
    			nSlotsFilled += 1;
    		};
    	};

    	// Handle if slots not filled
    	if (nSlotsFilled === Object.keys(intentObj.slots).length) {
    		return intentObj;
    	} else {
    		let updatedIntent = intentObj;
    		this.emit(':delegate',updatedIntent);
    	};
    } else if (this.event.request.dialogState !== "COMPLETED") {
    	// Replace intent slot values with resolution values for standardization
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].resolutions !== 'undefined') {
    			intentObj.slots[key].value = intentObj.slots[key].resolutions.resolutionsPerAuthority[0].values[0].value.name;
    		};
    	};

    	// Count number of slots filled
    	let nSlotsFilled = 0;
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].value !== 'undefined') {nSlotsFilled += 1;}
    	};

    	// Handle if slots not filled
    	if (nSlotsFilled == Object.keys(intentObj.slots).length) {
    		return this.event.request.intent;
    	} else {
    		let updatedIntent = intentObj;
    		this.emit(':delegate',updatedIntent);
    	};
    } else {
    	return intentObj;
    };
};

function handleGeneralSlotsWithIntentConfirmation() {
	let intentObj = this.event.request.intent;
	if (this.event.request.dialogState === "STARTED") {
		// Replace intent slot values with resolution values for standardization
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].resolutions !== 'undefined') {
    			intentObj.slots[key].value = intentObj.slots[key].resolutions.resolutionsPerAuthority[0].values[0].value.name;
    		};
    	};

    	// Count number of slots filled
    	let nSlotsFilled = 0;
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].value !== 'undefined') {
    			nSlotsFilled += 1;
    		};
    	};

    	// Handle if slots not filled
    	if (nSlotsFilled === Object.keys(intentObj.slots).length) {
    		let updatedIntent = intentObj;
    		this.emit(':confirmIntent','','',updatedIntent);
    	} else {
    		let updatedIntent = intentObj;
    		this.emit(':delegate',updatedIntent);
    	};
	} else if (this.event.request.dialogState !== "COMPLETED") {
		// Replace intent slot values with resolution values for standardization
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].resolutions !== 'undefined') {
    			intentObj.slots[key].value = intentObj.slots[key].resolutions.resolutionsPerAuthority[0].values[0].value.name;
    		};
    	};

    	// Count number of slots filled
    	let nSlotsFilled = 0;
    	for (let key in intentObj.slots) {
    		if (typeof intentObj.slots[key].value !== 'undefined') {
    			nSlotsFilled += 1;
    		};
    	};

    	// Handle if slots not filled
    	if (nSlotsFilled === Object.keys(intentObj.slots).length) {
    		let updatedIntent = intentObj;
    		this.emit(':confirmIntent','','',updatedIntent);
    	} else {
    		let updatedIntent = intentObj;
    		this.emit(':delegate',updatedIntent);
    	};
	} else {
		return intentObj;
	};
};
