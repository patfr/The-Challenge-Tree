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
	return hasUpgrade("beta", 15)
}

var backgroundStyle = {
	
}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
	
}

let VERSION = {
	num: "0.6",
	name: "Beta",
}

let winText = `Congratulations! You have completed the challenge that this tree presented before you, but for now...`

let changelog = [
	["display-text", "<h1 style='color:#ee0000;'>Changelog</h1>"],
	["blank", "50px"],
	["version", { open: false, color: "#ffff00", name: "Endgame - v0.6", items: [
		{ summary: "Spoilers", items: [[
			{type: "Endgame", description: "β V upgrade"},
		]]},
	]}],
	["blank", "50px"],
	["version", { open: true, color: "#7da6ff", name: "Beta", items: [
		{ summary: "v0.6", items: [[
			{type: "Added", description: "Ten challenges"},
			{type: "Added", description: "Five upgrades"},
			{type: "Added", description: "Two milestones"},
			{type: "Added", description: "A theme"},
			{type: "Added", description: "A system to notify players"},
		],[
			{type: "Changed", description: "It so achievements now show in the layer they are for"},
			{type: "Changed", description: "It so challenges are only colored when maxed"},
			{type: "Changed", description: "It so content matches theme and layer color"},
			{type: "Changed", description: "It components to make rounding corners easier"},
			{type: "Changed", description: "The style for option menu"},
		],[
			{type: "Removed", description: "Removed some options in the option menu"},
		]]},
	]}],
	["version", { open: true, color: "#7da6ff", name: "Beta", items: [
		{ summary: "v0.5", items: [[
			{type: "Added", description: "A layer"},
			{type: "Added", description: "Seven milestones"},
			{type: "Added", description: "Seven achievements"},
			{type: "Added", description: "version component for changelog"},
		],[
			{type: "Changed", description: "Changelog to look a bit better"},
			{type: "Changed", description: "It so changelog uses the new version component"},
		],[
			{type: "Fixed", description: "A grammar mistake"},
		]]},
	]}],
	["version", { open: false, color: "#f06741", name: "Pre-Beta?", items: [
		{ summary: "v0.4", items: [[
			{type: "Added", description: "Two milestones"},
			{type: "Added", description: "Seven achievements"},
			{type: "Added", description: "Five upgrades"},
		],[
			{type: "Changed", description: "2nd set of Alpha II completion to now have goal scaling"},
		]]},
	]}],
	["version", { open: false, color: "#69f5bb", name: "Upgrade the challenge", items: [
		{ summary: "v0.3.1", items: [[
			{type: "Fixed", description: "Fixed Alpha II having the wrong goal"},
		]]},
		{ summary: "v0.3", items: [[
			{type: "Added", description: "Two milestones"},
			{type: "Added", description: "Two challenges"},
			{type: "Added", description: "Five upgrades"},
			{type: "Added", description: "Seven achievements"},
		],[
			{type: "Changed", description: "Milestones to now always show"},
			{type: "Changed", description: "Milestones style"},
		],[
			{type: "Removed", description: "Unused files like docs"},
		]]},
	]}],
	["version", { open: false, color: "#add2ed", name: "Goals in life?", items: [
		{ summary: "v0.2", items: [[
			{type: "Added", description: "A challenge"},
			{type: "Added", description: "A milestone"},
			{type: "Added", description: "Seven achievements"},
		],[
			{type: "Changed", description: "Alpha II to now also reset Alpha points on enter"},
			{type: "Changed", description: "Alpha II to now also square root Alpha gain"},
			{type: "Changed", description: "Changelog"},
		]]},
	]}],
	["version", { open: false, color: "#f7922d", name: "Challenging?", items: [
		{ summary: "v0.1", items: [[
			{type: "Added", description: "A layer"},
			{type: "Added", description: "Two milestones"},
			{type: "Added", description: "Two challenges"},
		]]},
	]}],
]
