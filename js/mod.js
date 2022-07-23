let modInfo = {
	name: "The Challenge Tree",
	id: "TheChallengeTreePatfr",
	author: "patfr",
	pointsName: "ω",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Patfr",
	discordLink: "https://discord.gg/7ahtMyv5hX",
	initialStartPoints: new Decimal (0),
	offlineLimit: 0,
}

let VERSION = {
	num: "0.1",
	name: "Challenging?",
}

function versionText(v, cs) {
	let ver = `<h3 style='color:#eeee00'>${v}</h3><br><br>`
	for (let i = 0; i < cs.length; i++) {
		ver += `${cs[i]}.<br>`
	}
	return ver
}

let changelog = `
<h1 style='color:#eeee00'>Endgame:</h1><br><br>
	100,000 α<br><br>
<h1 style='color:#ee0000'>Changelog:</h1><br><br>
	${versionText("v0.1 - Challenging", ["Added a layer", "Added two challenges", "Added two milestones"])}
`

let winText = `Congratulations! You have completed the challenge that this tree presented before you, but for now...`

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
	if (inChallenge("alpha", 21)) gain = gain.sqrt()
	return gain
}

function addedPlayerData() { return {
	alphaBase: new Decimal(0),
	alphaShow: false,
}}

var displayThings = [
	function() {
		if (player.keepGoing)
			return "<h4 style='color:#00aaff'>You are past endgame.<br>The game may not be balanced beyond this point.</h4>"
	}
]

function isEndgame() {
	return player.alpha.points.gte(1e5)
}

var backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}