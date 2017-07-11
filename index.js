/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This skill implements a vacation rental chatbot for Elrod Villa Palm Springs.
 * 
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.7a547e03-c802-43ed-b590-921e014d7d81';  // TODO replace with your app ID (OPTIONAL).

// INFORMATION AND DIALOG PROMPTS

// TrashIntent
const trashAnswer = "Trash and recycling bins are located at the northwest corner of the club condominiums \
<w role='amazon:NN'>complex</w>.";

const wifiAnswer = "Our WiFi network is called Elrod Villa. The password is leisure <break time='250ms'/> 1. \
Thats the word leisure, followed by the numeral, one. Spelled, \
<prosody rate='slow'>L, E, I, S, U, R, E, 1</prosody>";

const reedAnswer = "Our property manager is Mr. Reed Gaudette. His mobile number is, 760-799-5509. \
Contact him for any questions, concerns, or issues that may arise during your stay. \
Feel free to call or text him at any time! His number again is <break time='500ms'/> 760-799-5509.";

const checkoutAnswer = "Our check-out process is pretty simple and painless... \
Remove all trash and recycling. Turn off Pool/Spa heater, pump, fountain and spa jets. \
Close all sliding doors and lock them using security bars. Close all blinds. \
Return Media Room remote to its charging cradle in the media cabinet. \
Leave full set of keys in gate lockbox. \
Please contact mister Reed on 760-799-5509 to advise him of your departure.";

const coffeeAnswer = "A 12-cup drip coffee maker can be found on the kitchen counter. \
This coffee maker is equipped with a reusable gold filter. There is no need to use or add a paper filter, \
just add coffee to the gold one. <break time='500s'/>You can also find a French press type coffee maker and electric tea kettle \
in the cabinets to the left of the ovens. <break time='500s'/> There is usually coffee and various sweeteners and \
creamers in the kitchen cabinet to your left, as you face the electric cooktop.";

const contactinfoAnswer = "Our property manager, Mr. Reed Gaudette (mobile: 760-799-5509), is your first \
point of contact for any questions, concerns or issues that may arise during your stay. <break time='750ms'/> \
Your hosts and offsite owner/managers are Keith Crosley (mobile: 415-412-4649) \
and Jill Plemons (mobile: 415-577-0360).";

const electronicsAnswer = "What space-age bachelor pad would be complete without \
a hi-fi stereo system and futuristic control panels? The Elrod Villa has these in spades. \
Whole-house audio is enabled by stereo speakers that are hidden within the built-in cabinets \
in the Living Room, Media Room and Master Bedroom (leave the doors of these cabinets \
open when enjoying the sound system).";

const airplayAnswer = "Here there should be instructions for using AirPlay and Chromecast.";

const phoneAnswer = "There is a house telephone in the Master Bedroom. You will find it in the center cabinet \
above the built-in desk console. \
The number for this phone is: (760) 548-0135. Note that phone service is provided via \
our local cable internet provider and, unlike a standard landline phone, \
will not work if there is a power outage. Please use your mobile phone in the event of a power outage.";

const emergencyAnswer = "The emergency number in the US is 911. \
Use that number to summon police, fire or medical attention as needed. \
Because emergency responders may not know your location, you will need to tell them that you are at: \
130 West Racquet Club Road, unit #421, Palm Springs, California, 92262. \
This is in the Club Condominiums complex near the intersection of Indian Canyon Road \
and Racquet Club Road. Once your immediate emergency has been attended to, please inform \
our property manager, Reed Gaudette (mobile: 760-799-5509), and the owners as soon as possible \
about the nature of your emergency.";

const grillingAnswer = "There's a gas-powered BBQ grill in the pool and spa area. \
This grill is connected to the main gas supply for the villa, so you don't need to worry \
about refilling propane tanks and that sort of nonsense - hooray! Please use caution when grilling. \
The grill surfaces get very hot, very quickly. \
Do take care! <break time='750ms'/>To light the grill: First, open the grill lid. Then, turn the burners dials to \
the light, or high, setting. <break time='500ms'/>\
Then press the starter button.";

const fireplaceAnswer = "There's a gas-powered fireplace in the living room. \
More information about the operation and lighting of the fireplace should be here.\
Do take care! <break time='750ms'/>To light the fireplace: First, open the grill lid. Then, turn the burners dials to \
the light, or high, setting. <break time='500ms'/> \
Tips about the fireplace here such as don't run AC and fireplace at same time. \
Never leave the fireplace unattended.";

const ashtrayAnswer = "If you smoke, you'll be happy to learn that there are ashtrays \
located in the cabinet below the barbeque grill. Remember: No smoking indoors. Thanks!";

const climatecontrolAnswer = "There are two Nest thermostats: One is located in the Dining Room, \
which controls the living room wing of the house, and one is located in the Master Bedroom, \
which controls the bedroom wing of the house. <break time='750ms'/>Please be conscientious about energy consumption: \
As agreed in our Rental Agreement, don't set the cool temperature below 70 degrees when using \
air conditioning. And don't set the heat temperature above 78 degrees when using heat. Please keep the fan setting on Auto. \
<break time='500ms'/>Doors and sliding windows should be kept closed when either heat or air conditioning \
is in use. <break time='500ms'/>Here's a pro tip: Keeping the vertical blinds shut during sunny \
conditions really helps keep the house cool! Please close the blinds before leaving the villa.";

const dishwasherAnswer = "The dishwasher is located behind one of the cabinet doors to \
the right of the kitchen sink. <break time='500ms'/>Dish cubes for it are located below the kitchen sink. \
<break time='500ms'/>Controls for the dishwasher are found on the top inside of the dishwasher door.<break time='500ms'/> \
To run the dishwasher, open the dishwasher door and press the on/off button to turn the washer on. \
Then, select your desired wash cycle.<break time='250ms'/> Press the Start button on the right side of the control panel \
and close the door to begin washing. <break time='250ms'/> Our dishwasher is almost completely silent, \
so it projects the time remaining on the floor. When the cycle is complete, an arrow is displayed, indicating \
that it's OK to open and unload the clean dishes. <break time='250ms'/>\
If the Add Salt light comes on, indicating that the dishwasher needs more water softening agent added, please \
contact Reed Gaudette for service or further instructions.";

const microwaveAnswer = "You can find the microwave in the kitchen cabinets to the left of the ovens.";

const firstAidAnswer = "A First Aid Kit is located in the kitchen cabinets above the ovens. \
Other First Aid kits can be found in the Master Bathroom, in the drawers below the \
Master Bathroom sinks.";

const hospitalAnswer = "The closest hospital and emergency room is Desert Regional Medical Center, \
Just one mile south of the villa at 1150 North Indian Canyon Drive. If you require immediate \
medical attention, please dial 911 to request emergency medical services. <break time='250ms'/> \
To drive to Desert Regional, turn left out of the Club Condominiums <w role='amazon:NN'>complex</w>, \
on to Racquet Club Road. Then turn right at the first light at Indian Canyon. Continue south for one mile. \
You will see Desert Regional Medical Center on your left, past Vista Chino.";

const refrigeratorAnswer = "The refrigerator has a built-in freezer with icemaker. \
While the icemaker functions well enough, it doesn't make/store huge volumes of ice. \
Additional ice trays are provided in the freezer. If you're hosting a thirsty crowd, \
put a bag of ice on your shopping list for your first run to the grocery!";

const laundryAnswer = "A clothes washer and dryer are located behind a closet door at the \
far end of the Guest Bathroom. A few laundry tips: <break time='250ms'/> To use the washer or dryer: \
Note that both the washer and dryer have power buttons on the upper left. Depress these to turn unit on. <break time='250ms'/>\
Then, load clothes and make your settings. <break time='250ms'/> Depress the Start button on upper right and hold it for \
a couple seconds to begin the wash or dry cycle. <break time='500ms'/>A couple of pro tips about the laundry here: \
(1) Please don't use bleach when washing any bedding, towels, robes, or your personal items. It can react with the hard water and \
cause permanent stains. <break time='250ms'/> \
(2) When wash is complete, please leave the washer door open to avoid mildew.";

const poolAnswer = "Pool service is performed on Tuesdays and Fridays, typically in the morning. \
 Pro tip: If you're the sort that likes to lazy \
around naked by the pool in the morning, you'll probably want to be mindful of the regular \
maintenance schedule. (Unless that's your thing. Not gonna judge.)";


const maintenanceAnswer = "If you suspect a malfunction, experience a breakdown of some appliance, \
or have some other maintenance issue, please contact our local property manager, Reed Gaudette. \
Note that there are several regularly-scheduled maintenance tasks that happen on a weekly \
schedule (these folks use the silver gate key that's kept in the back door lockbox): \
Pool service is performed on Tuesdays and Fridays, typically in the morning. \
Gardening is performed on Thursdays, again, typically in the morning. Our gardener, Daniel Vera, \
is fluent in both English and Spanish and is a very pleasant fellow. If you're interested in \
the garden flora, he can tell you all about it. Pro tip: If you're the sort that likes to lazy \
around naked by the pool in the morning, you'll probably want to be mindful of the regular \
maintenance schedule. (Unless that's your thing. Not gonna judge.)";

const historyAnswer = "Completed in the mid-seventies, Elrod Villa was designed by \
the famed mid-century interior design firm, Arthur Elrod and Associates. <break time='2s'/> \
The original owner, Sigmund Edelstone, known to his friends as 'Sig', worked closely with designers \
Hal Broderick and Arthur Elrod to create what Architectural Digest called, 'a sophisticated oasis in the desert.' \
Broderick designed the original interior, custom cabinetry and even the sound system and lighting control panels. \
<break time='2s'/> \
Many of the villa's unique features, such as the travertine floors, were selected by Sig himself. \
I'm told that Sig is responsible for having matched each piece of stone to ensure the grain matched all \
throughout the house.<break time='2s'/> He was... a little bit particular about things.";

const prompts = {
                first: [
                'What can I help you with?',
                'Is there something about Elrod Villa I can help you with?',
                'How may I help you?',
                'Let me know how I can help you. Just ask.',
                'I\'m sure you have many questions... Let me help you out with that.',
                'I\'m no magic eight ball, but I can answer many common questions about the villa.',
                'Questions about Elrod Villa? I may have answers.',
                'Is there something about Elrod Villa that I can help you with?',
                'Like the man said... <prosody pitch="+10%">ask</prosody> <prosody pitch="-25%" rate="slow">meee</prosody>, <prosody pitch="+10%">ask</prosody> <prosody pitch="-25%">me</prosody>, <prosody pitch="+10%">ask</prosody> <prosody rate="slow" pitch="-20%">meeeee...</prosody> I\'ll answer as best I can.'
                ],
                second: [
                'Is there more that I can help you with?',
                'Is there something more about Elrod Villa I can help you with?',
                'How may I help you more?',
                'Let me know if there"s anything else I can help you with.',
                'I\'m sure you have many more questions... Let me help you out with that.',
                'I\'m no magic eight-ball, but I can answer more common questions about the villa, if you need.',
                'Do you have more questions about Elrod Villa? I may have more answers.',
                'Is there something else about Elrod Villa that I can help you with?',
                'Like the man said... ask me, ask me, ask me... I\'ll answer as best I can.',
                'More questions? Ask me about anything... except secrets...',
                'Have more questions? Ask away.',
                'I\'m waiting for your questions. Not that I have anything better to do.',
                'There are few questions that I cannot answer. I\'m not allowed to answer questions about mysteries, however.',
                'More questions? Ask me more.'
                ], 
                playAlong: [
                'OK, I\'ll play along...',
                'Ready for this?...',
                'I\'m shaking my eight balls...',
                'Hold on while I consult the mystic oracle...',
                'Let me see...',
                'OK, I\'ll play along...',
                'Let\'s see...',
                'Oooh! The suspense is freakin\' killing me...',
                'Seriously. I never get tired of this game...',
                'The Magic Eight Ball shall reveal all...',
                'My Eight Ball brings all the boys to the yard...'
                ],
                EBsays: [
                'The Magic Eight Ball says...',
                'The mystic oracle says...',
                'Ancient Confucian Eight Ball say...',
                'The gods of random number generation tell me...',
                'And... the answer is revealed to be...',
                'My Magic Eight Ball says...',
                'Abracadabra... Your answer is...',
                ],
                magicEightBall: [
                'As I see it, yes',
                'Ask again later',
                'Better not tell you now',
                'Cannot predict now',
                'Concentrate and ask again',
                'Don\'t count on it',
                'It is certain',
                'It is decidedly so',
                'Most likely',
                'My reply is no',
                'My sources say no',
                'Outlook good',
                'Outlook not so good',
                'Reply hazy, try again',
                'Signs point to yes',
                'Very doubtful',
                'Without a doubt',
                'Yes',
                'Yes, definitely',
                'You may rely on it.'
                ],
                topics: [
                'WiFi',
                'trash and recycling',
                'various electronics and appliances',
                'restaurant recommendations',
                'bars and nightlife',
                'local attractions',
                'check-out procedures',
                'the history of Elrod Villa',
                'and much more',
                'Don\'t be afraid to ask me specific questions such as, where\'s the dishwasher?',
                'I\'m designed to be extremely conversational',
                'As they say on Reddit, ask me anything!'
                ],
                cuisines: [
                'brunch',
                'fine dining',
                'steakhouse',
                'italian',
                'pizza',
                'chinese',
                'mexican',
                'fast food'],
                cuisineRecs: 
                [
                'the best brunch is...',
                'allow me to suggest fine dining options...',
                'i love meat, too! May I suggest...',
                'Mama Mia! I like a the spaghetti! Here are some Italian options...',
                'Let\'s get pizza! Here\'s a place you might enjoy...',
                'For Chinese, it\'s hard to beat Wang\'s in the Desert!...',
                'The flavors of Mexico call to you...',
                'In a hurry? RUN to Del Taco...'
                ],
                barTypes: [
                'patio',
                'tiki',
                'upscale',
                'gay',
                'dive'
                ],
                barRecs: 
                [
                'Azul (also known as Alibi) has a great patio bar.',
                'Great tiki bars include Tonga Hut and Bootlegger Tiki.',
                'For fancy, old-school cocktails, try Melvyn\'s at the Ingleside Inn',
                'Girl, let me tell you about the best gay bars...',
                'Our favorite dive bar is also the closest bar to Elrod Villa. Toucan\'s is a must visit!'
                ],
                attractionTypes: [
                'museums',
                'village fest',
                'aerial tramway',
                'walk of stars'
                ],
                attractionRecs: 
                [
                'Try the Palm Springs Art Museum or Palm Springs Air Museum.',
                'Every Thursday night, don\'t miss Village Fest on Palm Canyon Drive.',
                'For a little adventure, try the Palm Springs Aerial Tramway, just a short drive from Elrod Villa.',
                'The Walk of Stars on Palm Canyon drive celebrates famous people who contributed to Palm Springs.',
                ]
};

/* HELPER FUNCTIONS */

function randoPrompt(prompt) {
     return prompt[Math.floor(Math.random() * prompt.length)];
}

function slotValue(slot, useId){
    let value = slot.value;
    let resolution = (slot.resolutions && slot.resolutions.resolutionsPerAuthority && slot.resolutions.resolutionsPerAuthority.length > 0) ? slot.resolutions.resolutionsPerAuthority[0] : null;
    if(resolution && resolution.status.code == 'ER_SUCCESS_MATCH'){
        let resolutionValue = resolution.values[0].value;
        value = resolutionValue.id && useId ? resolutionValue.id : resolutionValue.name;
    }
    return value;
}

// Docs for slotValue: In intent handler use this:
//
// var value = slotValue(this.event.request.intent.slots.MySlotName);
//
// If you want the id associated with that entry in your custom type, use this instead:
//
// var value = slotValue(this.event.request.intent.slots.MySlotName, true);


/* Intent Handlers */

const handlers = {
    'LaunchRequest': function () {
//        const speechOutput = 'Welcome to Elrod Villa...' + prompts.first[Math.floor(Math.random() * prompts.first.length)];
        const speechOutput = 'Welcome to Elrod Villa...' + randoPrompt(prompts.first);
        const reprompt = randoPrompt(prompts.first);
        this.emit(':ask', speechOutput, reprompt);
    },
    'ReedIntent': function () {
        const speechOutput = reedAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'TrashIntent': function () {
        const speechOutput = trashAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },   
    'WiFiIntent': function () {
        const speechOutput = wifiAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'CheckoutIntent': function () {
        const speechOutput = checkoutAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'CoffeeIntent': function () {
        const speechOutput = coffeeAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'ContactInfoIntent': function () {
        const speechOutput = contactinfoAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'ElectronicsIntent': function () {
        const speechOutput = electronicsAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'PhoneIntent': function () {
        const speechOutput = phoneAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'EmergencyIntent': function () {
        const speechOutput = emergencyAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'GrillingIntent': function () {
        const speechOutput = grillingAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'AshtrayIntent': function () {
        const speechOutput = ashtrayAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'ClimateControlIntent': function () {
        const speechOutput = climatecontrolAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'DishwasherIntent': function () {
        const speechOutput = dishwasherAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'MicrowaveIntent': function () {
        const speechOutput = microwaveAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'FireplaceIntent': function () {
        const speechOutput = fireplaceAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'FirstAidIntent': function () {
        const speechOutput = firstAidAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'RefrigeratorIntent': function () {
        const speechOutput = refrigeratorAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'LaundryIntent': function () {
        const speechOutput = laundryAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'MaintenanceIntent': function () {
        const speechOutput = maintenanceAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'HistoryIntent': function () {
        const speechOutput = historyAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    }, 
    'HopitalIntent': function () {
        const speechOutput = hospitalAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    }, 
    'EightBallIntent': function () {
        const speechOutput = randoPrompt(prompts.playAlong) + randoPrompt(prompts.EBsays) + randoPrompt(prompts.magicEightBall);
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'TopicsIntent': function () {
        const speechOutput = 'You can ask me about topics including...' + prompts.topics;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'VRBOIntent': function () {
        const speechOutput = 'I can\'t say that I know much about it. But I heard that HomeAway and VRBO are doing away with open communication with guests before booking. I guess that makes it a more costly alternative to Airbnb or something. Good thing we built our own website, and stuff...';
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'RestaurantsIntent': function () {
        // SLOTS ARE NOT FILLED - DELEGATE:        
        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
                this.emit(':delegate');
        } else {
                // SLOTS ARE FILLED - DELIVER THE INFO
                // const desiredFood = this.event.request.intent.slots.FoodType.value.toLowerCase();
                var   desiredFood = slotValue(this.event.request.intent.slots.FoodType).toLowerCase();
                const foodIndex = prompts.cuisines.indexOf(desiredFood);
                const speechOutput = prompts.cuisineRecs[foodIndex];
                const reprompt = randoPrompt(prompts.second);
            
                if (foodIndex == -1){
                // user selected a food we do not know about - error out
                const speechOutput = 'I\'m sorry, I can\'t recommend any places that serve ' + desiredFood + ' food. Ask me about restaurant recommendations again?';

                this.emit(':ask', speechOutput, reprompt);
                
                } else {
                // REPLY WITH INFO
                 this.emit(':ask', speechOutput, reprompt);
            }
        }
    },
   'BarsIntent': function () {
        // SLOTS ARE NOT FILLED - DELEGATE:        
        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
               this.emit(':delegate');
        } else {
                // SLOTS ARE FILLED - DELIVER THE INFO
                // const desiredBar = this.event.request.intent.slots.BarType.value.toLowerCase();
                var   desiredBar = slotValue(this.event.request.intent.slots.BarType).toLowerCase();
                const barIndex = prompts.barTypes.indexOf(desiredBar);
                const speechOutput = prompts.barRecs[barIndex];
                const reprompt = randoPrompt(prompts.second);
            
                if (barIndex == -1){
                // user selected a food we do not know about - error out
                const speechOutput = 'I\'m sorry, I can\'t recommend any ' + desiredBar + 'bars. Ask me about bar recommendations again?';

                this.emit(':ask', speechOutput, reprompt);
                
                } else {
                // REPLY WITH INFO
                 this.emit(':ask', speechOutput, reprompt);
            }
        }
    },
       'AttractionsIntent': function () {
        // SLOTS ARE NOT FILLED - DELEGATE:        
        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
               this.emit(':delegate');
        } else {
                // SLOTS ARE FILLED - DELIVER THE INFO
                // const desiredBar = this.event.request.intent.slots.LocalAttractions.value.toLowerCase();
                var   desiredAttraction = slotValue(this.event.request.intent.slots.LocalAttractions).toLowerCase();
                const attractionIndex = prompts.attractionTypes.indexOf(desiredAttraction);
                const speechOutput = prompts.attractionRecs[attractionIndex];
                const reprompt = randoPrompt(prompts.second);
            
                if (attractionIndex == -1){
                // user selected a food we do not know about - error out
                const speechOutput = 'I\'m sorry, I can\'t recommend any ' + desiredAttraction + ' Ask me about local attractions again?';

                this.emit(':ask', speechOutput, reprompt);
                
                } else {
                // REPLY WITH INFO
                 this.emit(':ask', speechOutput, reprompt);
            }
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'You can ask me about topics including...' + prompts.topics;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        const speechOutput = 'Catch ya later!';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        const speechOutput = 'Catch ya later!';
        this.emit(':tell', speechOutput);
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I\'m not sure I understood you. Ask again or ask a different question?', 'Sorry, I\'m not sure I understood you. Ask again or ask a different question?');
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
