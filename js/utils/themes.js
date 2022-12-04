// ************ Themes ************
var themes = ["default", "aqua", "patfr"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		endScreenButtons: "#afafaf",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		changelog_background: "#272727",
		changelog_color: "#303030",
		changelog_light: "#373737",
		changelog_log: "#404040",
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		endScreenButtons: "#00aafa",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		changelog_background: "#272727",
		changelog_color: "#303030",
		changelog_light: "#373737",
		changelog_log: "#404040",
	},
	patfr: {
		1: "#ffffff",
		2: "#bfbfbf",
		3: "#7f7f7f",
		color: "#afafaf",
		points: "#ffffff",
		locked: "#474747",
		endScreenButtons: "#474747",
		background: "#171717",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		changelog_background: "#272727",
		changelog_color: "#303030",
		changelog_light: "#373737",
		changelog_log: "#404040",
	},
}
function changeTheme() {
	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
	document.body.style.setProperty("--endScreenButtons", colors_theme["endScreenButtons"]);
	document.body.style.setProperty("--changelogBackground", colors_theme["changelog_background"]);
	document.body.style.setProperty("--changelogColor", colors_theme["changelog_color"]);
	document.body.style.setProperty("--changelogLight", colors_theme["changelog_light"]);
	document.body.style.setProperty("--changelogLog", colors_theme["changelog_log"]);
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}
