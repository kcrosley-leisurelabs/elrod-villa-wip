# elrod-villa-wip
Sample Vacation Rental Info/Concierge Chatbot for Alexa

This is a sample Alexa skill that implments a chatbot suitable for deployment in a vacation rental. It is customized to my own vacation rental, Elrod Villa (http://www.evillapalmsprings.com), but could be used as a model for similar custom skills. Other types of skills that this example may be helpful for include things like "Alexa FAQ skills", "I just want to make Alexa say a bunch of weird stuff skills", "Alexa chatbot skills", etc.  

All Alexa spoken content is currently contained in the index file (defined in constants at the very beginning), but should probably be implemented in a different fashion (fetched from a remote location, perhaps?) to facilitate easier updating. (This skill does not fetch any content from external web locations at present.)

This example shows a way of handling both simple and multi-turn dialogs. In this sample, recommendations for restaurants, bars, and local attractions are handled as multi-turn dialogs set up in Skills Builder.

This skill also demonstrates the use of synonyms in the Skills Builder and resolving those values to their canonical values back in the Lambda function. Custom slot type values used in the skill have synonyms defined so that users can be a bit more natural in some instances. For example, you might request a recommendation for a drive-through restaurant and the intent will resolve to the recommendation for "fast food" restaurants.

There's also some cute stuff like a "magic eight ball" Easter Egg, some examples of using SSML tags to control Alexa's diction, etc.

This skill is installed in the usual way:

To install this skill, create a new Lambda function in AWS, using a node.js Alexa blueprint such as "fact skill". Replace the default code with the code from index.js. Connect it to Alexa Skills Kit as a trigger. Give the function Simple Microservice permissions or similar. (As usual, this function needs to be created in the US East/N. Virginia data center which supports Alexa.)

Over in the Skill Builder, create a new skill. Give it an invocation name like "vacation rental" or similar. Open the Skill Builder Beta and use the Code Editor section to drop in the contents of code-editor-skill-content.json. Save the model and build the model. In the Configuration section, connect your new skill to the Lambda function you just created as the endpoint.

Now you should be able to launch and test the skill. Tell Alexa, "open vacation rental" (or whatever you called it). It's designed to be very conversational so it starts simply by saying "Welcome to (vacation rental name)... What can I help you with?" (or a similar question, selected at random). If you can't think of a question about your vacation rental (really?), try asking something like, "What kinds of questions can you answer?", "What topics can you discuss?" or "help" to invoke a longer help response.

While it's designed to be used as a chat, it can also be invoked with a question. For example, "Alexa, ask Vacation Rental to recommend a mexican restaurant."

I'm providing all of this here because having an example like this would have helped me greatly when I was just starting out with developing a simple "answer a bunch of FAQ type questions" skill!

This work was inspired by Dana Young's excellent "Vacation Rental Virtual Concierge" skill (see http://www.vacationrentalvirtualconcierge.com), which is an excellent tool for those who don't want to go whole hog and create their own custom skill. His service is fantastic, but I wanted to create something a little more custom.
