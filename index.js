/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This skill implements a vacation rental chatbot. The content here is mostly customized for
 * my Palm Springs vacation rental known as "Elrod Villa" (http://www.evillapalmsprings.com).
 * You would, of course, customize this to relay information about your own rental by modifying
 * the various constants below.
 * 
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

// INFORMATION AND DIALOG PROMPTS -- here is the text Alexa reads for each of the "single turn" dialog intents
// [something]Answer is the text read for [Something]Intent
// Note that this is not done algorithmically in this example -- there are specific handlers for each specific intent
// Note also that some of these demonstrate the use of SSML to control how Alexa speaks difficult parts

const rentalName = "My Groovy Vacation Rental";

const trashAnswer = "Trash and recycling bins are located at the northwest corner of the club condominiums \
<w role='amazon:NN'>complex</w>.";

const wifiAnswer = "Our WiFi network is called Network Name. The password is sample. Spelled, \
<prosody rate='slow'>S, A, M, P, L, E</prosody>";

const reedAnswer = "Our property manager is Name. His mobile number is, mobile. \
Contact him for any questions, concerns, or issues that may arise during your stay. \
Feel free to call or text him at any time! His number again is <break time='500ms'/> mobile.";

const checkoutAnswer = "Our check-out process is pretty simple and painless... \
Remove all trash and recycling. Turn off Pool/Spa heater, pump, fountain and spa jets. \
Close all sliding doors and lock them using security bars. Close all blinds. \
Return Media Room remote to its charging cradle in the media cabinet. \
Leave full set of keys in gate lockbox. \
Please contact mister Reed on number to advise him of your departure.";

const coffeeAnswer = "A 12-cup drip coffee maker can be found on the kitchen counter. \
This coffee maker is equipped with a reusable gold filter. There is no need to use or add a paper filter, \
just add coffee to the gold one. <break time='500s'/>You can also find a French press type coffee maker and electric tea kettle \
in the cabinets to the left of the ovens. <break time='500s'/> There is usually coffee and various sweeteners and \
creamers in the kitchen cabinet to your left, as you face the electric cooktop.";

const contactinfoAnswer = "Our property manager, Name (mobile: number), is your first \
point of contact for any questions, concerns or issues that may arise during your stay. <break time='750ms'/> \
Your host and offsite owner/manager is Namey (mobile: number).";

const electronicsAnswer = "What space-age bachelor pad would be complete without \
a hi-fi stereo system and futuristic control panels? " + rentalName + " has these in spades. \
Whole-house audio is enabled by stereo speakers that are hidden within the built-in cabinets \
in the Living Room, Media Room and Master Bedroom (leave the doors of these cabinets \
open when enjoying the sound system).";

const airplayAnswer = "Here there should be instructions for using AirPlay and Chromecast.";

const phoneAnswer = "There is a house telephone in the Master Bedroom. You will find it in the center cabinet \
above the built-in desk console. \
The number for this phone is: Number. Note that phone service is provided via \
our local cable internet provider and, unlike a standard landline phone, \
will not work if there is a power outage. Please use your mobile phone in the event of a power outage.";

const emergencyAnswer = "The emergency number in the US is 911. \
Use that number to summon police, fire or medical attention as needed. \
Because emergency responders may not know your location, you will need to tell them that you are at: \
Address, City, State, Zipcode. \
This is in the Club Condominiums complex near the intersection of Indian Canyon Road \
and Racquet Club Road. Once your immediate emergency has been attended to, please inform \
our property manager and the owners as soon as possible \
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

const hospitalAnswer = "The closest hospital and emergency room is Hospital Namer, \
Just one mile south of the villa at address. If you require immediate \
medical attention, please dial 911 to request emergency medical services. <break time='250ms'/> \
To drive to Hospital Name, turn left out of the Club Condominiums <w role='amazon:NN'>complex</w>, \
on to Racquet Club Road. Then turn right at the first light at Indian Canyon. Continue south for one mile. \
You will see Hospital Name on your left, past Vista Chino.";

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
throughout the house.<break time='1s'/> He was... a little bit particular about things.";

// INFORMATION AND DIALOG PROMPTS -- here is the text Alexa reads for each of the "multi-turn" dialog intents
// such as those for restaurants, bars and local attractions, or for things like first-time prompt and
// reprompts. I've provided some alternative text for those that are selected at random. You'll note that some
// hint at "Easter Eggs" such as a "Magic 8 Ball" game.
// 
// So, all of these are provided in an array of prompts.

const prompts = {
                // After starting the skill, we have a variety of prompts to get the chat going:
                first: [
                'What can I help you with?',
                'Is there something about ' + rentalName + ' I can help you with?',
                'How may I help you?',
                'Let me know how I can help you. Just ask.',
                'I\'m sure you have many questions... Let me help you out with that.',
                'I\'m no magic eightball, but I can answer many common questions about the villa.',
                'Questions about ' + rentalName + '? I may have answers.',
                'Is there something about ' + rentalName + ' that I can help you with?',
                'Like the man said... <prosody pitch="+10%">ask</prosody> <prosody pitch="-25%" rate="slow">meee</prosody>, <prosody pitch="+10%">ask</prosody> <prosody pitch="-25%">me</prosody>, <prosody pitch="+10%">ask</prosody> <prosody rate="slow" pitch="-20%">meeeee...</prosody> I\'ll answer as best I can.'
                ],
                // For further variety, future reprompts also have some different options that we can randomize
                second: [
                'Is there more that I can help you with?',
                'Is there something more about ' + rentalName + ' I can help you with?',
                'How may I help you more?',
                'Let me know if there"s anything else I can help you with.',
                'I\'m sure you have many more questions... Let me help you out with that.',
                'I\'m no magic eight-ball, but I can answer more common questions about the villa, if you need.',
                'Do you have more questions about ' + rentalName + '? I may have more answers.',
                'Is there something else about ' + rentalName + ' that I can help you with?',
                'Like the man said... ask me, ask me, ask me... I\'ll answer as best I can.',
                'More questions? Ask me about anything... except secrets...',
                'Have more questions? Ask away.',
                'I\'m waiting for your questions. Not that I have anything better to do.',
                'There are few questions that I cannot answer. I\'m not allowed to answer questions about mysteries, however.',
                'More questions? Ask me more.'
                ], 
                // Used in the Magic Eight Ball easter egg:
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
                // Here is a list of example topics that are used when the user requests help
                topics: [
                'WiFi',
                'trash and recycling',
                'various electronics and appliances',
                'restaurant recommendations',
                'bars and nightlife',
                'local attractions',
                'check-out procedures',
                'the history of ' + rentalName,
                'and much more',
                'Don\'t be afraid to ask me specific questions such as, where\'s the dishwasher?',
                'I\'m designed to be extremely conversational',
                'As they say on Reddit, ask me anything!'
                ],
                // Now we're in multi-turn dialog land. Here is where we set up handling for responding to
                // requests for restaurant recommendations. The cuisines correspond to the Cuisine Slot Type 
                // values defined in the custom Slot Types section of the Skill Builder:
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
                // Here is where you'd put your restaurant recommendations to be read for each type of cuisine
                // The order is important, of course:
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
                // Here's where we set up the types of bars and nightlife we have recommendations for.
                // These correspond to the barTypes Slot Type values defined in the custom Slot Types 
                // section of the Skill Builder:
                barTypes: [
                'patio',
                'tiki',
                'upscale',
                'gay',
                'dive'
                ],
                // And then here are our recommendations based on types of bars:
                barRecs: 
                [
                'Azul (also known as Alibi) has a great patio bar.',
                'Great tiki bars include Tonga Hut and Bootlegger Tiki.',
                'For fancy, old-school cocktails, try Melvyn\'s at the Ingleside Inn',
                'Girl, let me tell you about the best gay bars...',
                'Our favorite dive bar is also the closest bar to ' + rentalName + '. Toucan\'s is a must visit!'
                ],
                // Finally, we have a third multi-turn type section for Local Attractions.
                // Here are the attractionTypes as defined in the custom Slot Types 
                // section of the Skill Builder:
                attractionTypes: [
                'museums',
                'village fest',
                'aerial tramway',
                'walk of stars'
                ],
                // And here is the spoken text of the recommendations for each category:
                attractionRecs: 
                [
                'Try the Palm Springs Art Museum or Palm Springs Air Museum.',
                'Every Thursday night, don\'t miss Village Fest on Palm Canyon Drive.',
                'For a little adventure, try the Palm Springs Aerial Tramway, just a short drive from Elrod Villa.',
                'The Walk of Stars on Palm Canyon drive celebrates famous people who contributed to Palm Springs.',
                ]
};

/* HELPER FUNCTIONS */

// Select a random prompt:
function randoPrompt(prompt) {
     return prompt[Math.floor(Math.random() * prompt.length)];
}

// In the things that involve multi-turn dialogs (like restaurant, bar and local attraction recommendations),
// I used synonyms in the Skill Builder to allow users to be more natural in their responses. The following 
// function resolves returned synonyms to their canonical slot values.

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
// Here are our intent handlers

const handlers = {
    // Do this upon skill launch:
    'LaunchRequest': function () {
        const speechOutput = 'Welcome to ' + rentalName + '! ' + randoPrompt(prompts.first);
        const reprompt = randoPrompt(prompts.first);
        // You'll note that we use "ask" to keep the dialog open after our introduction and subsequent
        // responses. This gives the user time to respond! After a few seconds, Alexa will chime in again with
        // a reprompt (selected at random from our list defined above):
        this.emit(':ask', speechOutput, reprompt);
    },
    // Handler for an intent about our property mananger - his name is Reed so there's an intent named after him. 
    // Yours is probably different, of course.
    'ReedIntent': function () {
        const speechOutput = reedAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For where's the trash type questions
    'TrashIntent': function () {
        const speechOutput = trashAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For wifi / network / connectivity questions
    'WiFiIntent': function () {
        const speechOutput = wifiAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about Checking out
    'CheckoutIntent': function () {
        const speechOutput = checkoutAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about coffee, tea, etc.
    'CoffeeIntent': function () {
        const speechOutput = coffeeAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about contacting the owner, rather than the local property manager -- you'll note
    // that over in the Skill Builder, this intent includes some sample utterances where I've included
    // "OwnerName"... That must be replaced with the owner's name, of course, for this to work as expected
    'ContactInfoIntent': function () {
        const speechOutput = contactinfoAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about electronics / home theater stuff in general. Idea was to have it kind be
    // a help thing to suggest specific topics like turning on the TV. Implmentation of that stuff is
    // left as an exercise for the reader. ;)
    'ElectronicsIntent': function () {
        const speechOutput = electronicsAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about where the phone is located, is there a phone in the house, what's its number, etc.
    'PhoneIntent': function () {
        const speechOutput = phoneAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For 'we have an emergecy' type utturances
    'EmergencyIntent': function () {
        const speechOutput = emergencyAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions related to the BBQ grill
    'GrillingIntent': function () {
        const speechOutput = grillingAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions related to smoking
    'AshtrayIntent': function () {
        const speechOutput = ashtrayAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about climate control, HVAC, etc.
    'ClimateControlIntent': function () {
        const speechOutput = climatecontrolAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // Our dishwasher is actually hard for some to find as it's one of those custom panel numbers. Yours may not be
    'DishwasherIntent': function () {
        const speechOutput = dishwasherAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // Same here -- microwave is kinda hidden:
    'MicrowaveIntent': function () {
        const speechOutput = microwaveAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about the gas fireplace
    'FireplaceIntent': function () {
        const speechOutput = fireplaceAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // Have a boo boo or need a bandage? Here's where to find first aid supplies
    'FirstAidIntent': function () {
        const speechOutput = firstAidAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // This is about ice/icemaker in our case
    'RefrigeratorIntent': function () {
        const speechOutput = refrigeratorAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about the laundry/washing
    'LaundryIntent': function () {
        const speechOutput = laundryAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about something broken, something needs fixing, maintenance schedule
    'MaintenanceIntent': function () {
        const speechOutput = maintenanceAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // For questions about history of the property. The intent is to build this out with further subtopics that
    // could be asked about. Not as multi-turn, but you'll note that in the history answer definition above, 
    // we talk about folks like 'sig edelstone' and 'arthur elrod'. You can easily imagine defining some 
    // new intents over in the skill builder to handle utterances asking for more details about those folks!
    'HistoryIntent': function () {
        const speechOutput = historyAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    }, 
    // I don't know why anybody, in an emergency situation, would ask a damn chatbot about the hospital,
    // but in the interest of being complete -- and being safe -- something like this should defnitiely be here!
    'HopitalIntent': function () {
        const speechOutput = hospitalAnswer;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    }, 
    // Here's an Easter Egg! Some of the prompt/reprompts mention a magic 8 ball. If the user says anything
    // about that (take a look at the sample utterances for EightBallIntent over in the Skill Builder),
    // we shake the 8 ball for them. You could use a similar technique to deliver a random fact about
    // your property or locale. No need to get all fancy with having a whole "emitwithstate" thing, by the way,
    // just define your utterances in such a way that you also have utterances for "do the magic 8 ball thing again",
    // "give me another 8 ball", etc.
    'EightBallIntent': function () {
        const speechOutput = randoPrompt(prompts.playAlong) + randoPrompt(prompts.EBsays) + randoPrompt(prompts.magicEightBall);
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // Here's a little chatbot trick. You'll note that when we drop into the skill, all Alexa says is
    // "Welcome to [the Vacation Rental]... How can I help you?" or similar. While that's really 
    // cool and conversational, it's entirely possible that the user might be a little confused, shy
    // or taken aback. So, we've defined a TopicsIntent over in the Skill Builder to handle questions like, 
    // "Well, what CAN you help me with?", "what sort of questions?", etc. 
    // So here, we have Alexa read out a list of topics we want people to know
    // that they can ask about. Another utterance defined there is "Main Menu" -- you know for smarty-pants users
    // who just wanna be sure they are at the top level of a conversation.
    'TopicsIntent': function () {
        const speechOutput = 'You can ask me about topics including...' + prompts.topics;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // Here's an example of a jokey-joke response. I didn't define this up above as a constant.
    // Just left it here as an example of how you can be totally lazy and define a one-off intent for some
    // random utterance. 
    'VRBOIntent': function () {
        const speechOutput = 'I can\'t say that I know much about it. But I heard that HomeAway and VRBO are doing away with open communication with guests before booking. I guess that makes it a more costly alternative to Airbnb or something. Good thing we built our own website and stuff...';
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // Here we handle the multi-turn dialog for Restaurant Recommendations (this is like the other multi-turn
    // ones for bars and local attractions that you'll find below).
    'RestaurantsIntent': function () {
        // Here's where we determine if the user has requested a restaurant recommendation. It is possible
        // that the user has naturally specified a restaurant type, but it's more likely that they've simply
        // asked for a recommendation and we need Alexa to help them narrow down a recommendation by type.
        // We do this by delegating the dialog to Alexa to fill in any unfilled required slots.

        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
        // If the dialog is in either of these states ^^^^^^^ the SLOTS ARE NOT FILLED - SO DELEGATE
        // Note: At present I have no idea why we can't just issue an "emit.delegate", but this seems broken
        // in some versions of the node.js SDK for Alexa, so I'm doing it this way, where we return a 
        // Dialog.Delegate directive:
            this.emit(':delegate');
        } else {
                // Since we got here, the reqired SLOTS ARE FILLED - SO, DELIVER THE INFO:
                // Note that in my example, I've used synonyms over in the Skills Builder
                // So, to do the matching, we need to get the canonical value, rather than the
                // utterance (which we could get as well). Let's get the word for what type of food
                // the user has requested:
                var   desiredFood = slotValue(this.event.request.intent.slots.FoodType).toLowerCase();
                // Let's look up the index of that in our "cuisines" list:
                const foodIndex = prompts.cuisines.indexOf(desiredFood);
                // Set up the recommendation response and follow it up with a re-prompt utterance to keep
                // the dialog open:
                const speechOutput = prompts.cuisineRecs[foodIndex];
                const reprompt = randoPrompt(prompts.second);

                // But wait... We need to handle one error case:
                // It's entirely possible that the user has defied our attempts to narrow their choices
                // and cleverly account for synonyms. In that case, what Alexa thinks the user uttered
                // will be in the desiredFood variable. For example, the user might have asked for 
                // "Armenian" or "shitty" food for which we don't currently have a recommendation.
                // In this case, the foodIndex will come back as "-1", meaning it doesn't match our list of values.
                // But we can still have some fun and let the user know:
                
                if (foodIndex == -1){
                // user selected a food we do not know about - error out with an apology:
                const speechOutput = 'I\'m sorry, I can\'t recommend any places that serve ' + desiredFood + 'food. Ask me about restaurant recommendations again?';

                this.emit(':ask', speechOutput, reprompt);
                
                } else {
                // user selected a food we know about - REPLY WITH INFO
                 this.emit(':ask', speechOutput, reprompt);
            }
        }
    },
    // As with Restaurants above, here's where we handle the multi-turn for bars and nightlife:
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
                // user selected a bar type we do not know about - error out
                const speechOutput = 'I\'m sorry, I can\'t recommend any ' + desiredBar + 'bars. Ask me about bar recommendations again?';

                this.emit(':ask', speechOutput, reprompt);
                
                } else {
                // REPLY WITH INFO
                 this.emit(':ask', speechOutput, reprompt);
            }
        }
    },
    // Here's where we handle the multi-turn for Local Attractions:
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
                // user selected an attraction type we do not know about - error out
                const speechOutput = 'I\'m sorry, I can\'t recommend any ' + desiredAttraction + ' Ask me about local attractions again?';

                this.emit(':ask', speechOutput, reprompt);
                
                } else {
                // REPLY WITH INFO
                 this.emit(':ask', speechOutput, reprompt);
            }
        }
    },
    // Handle the built-in help intent similar to how we handle a request for topics
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'You can ask me about topics including...' + prompts.topics;
        const reprompt = randoPrompt(prompts.second);
        this.emit(':ask', speechOutput, reprompt);
    },
    // Handle built-in Cancel intent
    'AMAZON.CancelIntent': function () {
        const speechOutput = 'Catch ya later!';
        this.emit(':tell', speechOutput);
    },
    // Handle built-in Stop intent
    'AMAZON.StopIntent': function () {
        const speechOutput = 'Catch ya later!';
        this.emit(':tell', speechOutput);
    },
    // The rules around handling unhandled intents are weird in Alexa-land. 
    // It's entirely possible you may never get this intent triggered.
    // But it's here just in case...
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I\'m not sure I understood you. Ask again or ask a different question?', 'Sorry, I\'m not sure I understood you. Ask again or ask a different question?');
    }
};


// Register the handlers and junk as one would usually do!
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
// That's all folks!
