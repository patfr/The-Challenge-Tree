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
	num: "0.2",
	name: "Goals in life?",
}

let changelog = `
	<h1 style='color:#ee0000;'>Changelog</h1><br><br><br><br>
		<details>
			<summary><h2 style='color:#eeee00'>Endgame - Spoilers - v0.2</h2></summary>
			<ul>
				<li class="Endgame">150 ω/s</li>
			</ul>
		</details>
		<br><br><br>
		<details open>
			<summary><h2 style='color:#add2ed'>v0.2 - Goals in life?</h2></summary>
			<ul>
				<li class="Added">A challenge</li>
				<li class="Added">A milestone</li>
				<li class="Added">7 Achievements</li>
			</ul>
			<ul>
				<li class="Changed">Alpha II to now also reset Alpha points on enter</li>
				<li class="Changed">Alpha II to now also square root Alpha gain</li>
				<li class="Changed">Changelog</li>
			</ul>
		</details>
		<details>
			<summary><h2 style='color:#f7922d'>v0.1 - Challenging?</h2></summary>
			<ul>
				<li class="Added">A layer</li>
				<li class="Added">Two milestones</li>
				<li class="Added">Two challenges</li>
			</ul>
		</details>
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
	gain = gain.mul(challengeEffect("alpha", 12))
	if (inChallenge("alpha", 21)) gain = gain.sqrt()
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
	return tmp.pointGen.gte(150)
}

var backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}