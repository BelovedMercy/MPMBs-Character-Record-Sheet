/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	(sub)race
	Effect:		This is the syntax for adding a new (sub)race to the sheet.
				Note that you will need to define a race using this syntax once for every sub-race (i.e. there is a separate entry for High Elf, Wood Elf, and Dark Elf)
				You will use this for a race that doesn't have a subrace, like Dragonborn and also for a subrace of a race, like Hill Dwarf and Mountain Dwarf.
				You do not make a separate entry for the parent of a subrace. So there is no Dwarf or Elf entry!
				For races that have variants, like the human, you can define a variant using the RaceSubList. Any variant defined like that will only be selectable through the "Racial Options" button
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "Humblewood Cervan Race"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

RaceList["cervan"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*something)(?=.*catlike).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something catlike/i

	name : "Cervan", //required; the name to use for the race

	sortname : "Cervan", //optional; this is the name used to fill the drop-down boxes. If you don't include this, the 'name' will used instead

	source : ["HBHW", 22], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	plural : "Cervans", //required; the name to use for the race when the plural form is used

	size : 3, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)

	speed : { //required; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"

		// all of the following attributes are optional and you can add more ("burrow" isn't part of this example!)

		walk : { spd : 35, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.

		climb : { spd : "+50", enc : 0 }, // instead of numbers, you can also have modifiers. Modifiers are a string, starting with a mathematical operator, followed by a number (e.g. "-10", "+20"). // a value that is zero is ignored

		fly : { spd : "walk", enc : 0 }, // instead of a number/modifier, you can also set the attribute to "walk". This makes the speed mode assume the walking speed // Using an underscore as the first character means the value is only added if the value would be non-zero

		swim : { spd : "fixed 60", enc : "fixed 60" }, // if you include the word "fixed" together with a number, the movement mode will be that number, without any modifiers from other sources (like the Monk's speed bonus). However, if another entry that isn't 'fixed' does end up with a higher total while including any modifiers, that speed is used instead

		allModes : "+10" // the 'allModes' attribute can only consist of a modifier. This modifier is applied to all speed modes, both normal and encumbered. It is only applied if the speed mode exists, it won't give the character a burrow speed if it would otherwise have none, for example
	},

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : [["Musical instrument", 3], ["Thieves' tools", "Dex"], "Tinker's tools"], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries (but doesn't have to be). The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated

	languageProfs : [1, "Elvish"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	weapons : ["talons"], //optional; an array of weapons that are added to the attacks section; This will be the name of the weapon how it appears in the attack section, not necessarily the object name in the WeaponsList

	addarmor : "Natural Armor", //optional; a string of the name of the armour that is literally put in the Armor Description field when the class feature is applicable, and removed if not

	vision : [["Darkvision", 60], ["Sunlight Sensitivity", 0]], //optional; An array of arrays that each have a length of 2; This adds the first value of each array to the Senses field. The second value is the range in feet. If no range is needed, put a 0 there. You can also add a modifier like "+30" or "*2" to have the appropriate calculation done with the range of sense

	dmgres : ["Necrotic", "Radiant"], //optional; damage resistance(s) the race has. This line can be deleted if you don't have anything to put here // If the resistance has a condition attached to it, like only being against nonmagical attacks, substitute the entry in the array with an array of 2: [the damage type, the damage type with the condition]. // For example: [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]

	savetxt : { // Optional; this attribute defines entries to add to the field for "Saving Throw Advantages / Disadvantages"

		text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg", "Magic can't put me to sleep"], // Optional; this is an array of strings, and each of those strings is added to the field exactly as presented here

		immune : ["poison", "disease"], // Optional; this is an array of strings that the character is immune to. This is put in the field after the text "Immune to ", so in this example it would result in "Immune to poison and disease"

		adv_vs : ["traps", "charmed"] // Optional; this is an array of things that the character has advantage on saves against. This is put in the field after the text "Adv. on saves vs. ", so in this example it would result in "Adv. on saves vs. traps and charmed"
	},

	skillstxt : "Choose any one skills",  //optional; Skill proficiencies the race has. This line can be deleted if you don't have anything to put here. If the race only gives fixed skill proficiencies (no choices), then delete this line and only use "skills" above

	age : " reach adulthood around 12 years and live around 150 years", //optional; the age tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	improvements : "Cervan: +1 Dexterity, +2 Constitution;", //required; the text that is displayed when listing all the ability score improvements

	scores : [0, 1, 2, 0, 0, 0], //required; the ability score improvements as used by the Ability Score dialog. The syntax is: [Str, Dex, Con, Int, Wis, Cha]

	trait : "Cervan (+1 Dexterity, +2 Constitution)\nCelestial Legacy:\n   Surge of Vigor: All cervans possess a great tenacity and will to survive, which allows them to bounce back from even the most devastating blows. If an attack deals over half of your current remaining hit points in damage, (even if your hit points are reduced to 0 by the attack) you immediately regain hit points equal to 1d12 + your Constitution Modifier. You can't use this feature again until you have completed a long rest.", //required; the racial trait as it will be put in the Racial Trait field on the second page (note that "\n" is a line break).

	},

	

};
