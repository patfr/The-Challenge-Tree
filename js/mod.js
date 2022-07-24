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
	if (hasUpgrade("alpha", 12)) gain = gain.pow(2)
	if (hasChallenge("alpha", 31)) gain = gain.pow(challengeEffect("alpha", 31))
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
	return player.alpha.points.gte(1e110)
}

var backgroundStyle = {
	
}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}

let VERSION = {
	num: "0.3.1",
	name: "Upgrade the challenge?",
}

let winText = `Congratulations! You have completed the challenge that this tree presented before you, but for now...`

let changelog = `
	<h1 style='color:#ee0000;'>Changelog</h1><br><br><br><br>
		<details>
			<summary><h2 style='color:#eeee00'>Endgame - Spoilers - v0.3</h2></summary>
			<ul>
				<li class="Endgame">1.00e110 α</li>
			</ul>
		</details>
		<br><br><br>

		<details open>
			<summary><h2 style='color:#69f5bb'>v0.3.1 - Fix</h2></summary>
			<ul>
				<li class="Fixed">Fixed Alpha II having the wrong goal</li>
			</ul>
		</details>

		<details open>
			<summary><h2 style='color:#69f5bb'>v0.3 - Upgrade the challenge?</h2></summary>
			<ul>
				<li class="Added">Two milestones</li>
				<li class="Added">Two challenges</li>
				<li class="Added">Five upgrades</li>
				<li class="Added">Seven achievements</li>
			</ul>
			<ul>
				<li class="Changed">Milestones to now always show</li>
				<li class="Changed">Milestones style</li>
			</ul>
			<ul>
				<li class="Removed">Unused files like docs</li>
			</ul>
		</details>

		<details>
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
