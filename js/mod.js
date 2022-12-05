let modInfo = {
	name: "The Challenge Tree",
	id: "TheChallengeTreePatfr",
	author: "patfr",
	pointsName: "ω",
	modFiles: ["utils/borderRadius.js", "layers/achievements.js", "layers/alpha.js", "layers/beta.js", "layers/gamma.js", "layers.js", "tree.js"],

	discordName: "Patfr",
	discordLink: "https://discord.gg/7ahtMyv5hX",
	initialStartPoints: new Decimal (0),
	offlineLimit: 0,
	allowSmall: false,
}

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
	return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints(){
	let gain = false
	if (inChallenge("alpha", 11)) gain = true
	if (hasMilestone("alpha", 1)) gain = true
	return gain
}

function getPointGen() {
	if(!canGenPoints())
	return new Decimal(0)
	
	let gain = new Decimal(1)
	gain = gain.mul(tmp.alpha.effect)
	gain = gain.mul(challengeEffect("alpha", 12))
	if (hasUpgrade("alpha", 22)) gain = gain.mul(challengeEffect("alpha", 21))
	if (hasUpgrade("alpha", 24)) gain = gain.mul(upgradeEffect("alpha", 24))
	if (hasUpgrade("alpha", 12)) gain = gain.pow(2)
	if (hasChallenge("alpha", 31)) gain = gain.pow(challengeEffect("alpha", 31))
	if (hasUpgrade("alpha", 23)) gain = gain.mul(1000)
	gain = gain.mul(tmp.beta.effect)
	if (inChallenge("alpha", 21)) gain = gain.sqrt()
	if (inChallenge("alpha", 22)) gain = gain.cbrt()
	return gain
}

function addedPlayerData() { return {
	alphaBase: new Decimal(0),
	alphaIII: new Decimal(0),
	alphaShow: false,
}}

var displayThings = [
	function() {
		if (player.keepGoing)
		return "<h4 style='color:#00aaff'>You are past endgame.<br>The game may not be balanced beyond this point.</h4>"
	}
]

function isEndgame() {
	return player.gamma.alpha.points.gte(3000) && player.gamma.beta.points.gte(3000) && player.gamma.points.gte(20000)
}

var backgroundStyle = {
	
}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
	switch(oldVersion) {
		case "0.6":
		case "0.5":
		case "0.4":
		case "0.3.1":
		case "0.3":
		case "0.2":
		case "0.1":
			player.a.achievements = []
			break
		default:
			break
	}
}

let VERSION = {
	num: "0.8.1",
	name: "Gamma",
}

let winText = `Congratulations! You have completed the challenge that this tree presented before you, but for now...`