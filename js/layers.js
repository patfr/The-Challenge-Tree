addLayer("l", {
    color: "#000000",
    tabFormat: {
        Alpha: {
            embedLayer: "alpha",
            buttonStyle: { "border-color": "#ffffff", "border-width": "2px", "border-radius": "1px" },
        },
        Beta: {
            embedLayer: "beta",
            buttonStyle: { "border-color": "#ffffff", "border-width": "2px", "border-radius": "1px" },
            unlocked() { return hasMilestone("alpha", 6) || player.beta.unlocked },
        },
        Gamma: {
            embedLayer: "gamma",
            buttonStyle: { "border-color": "#ffffff", "border-width": "2px", "border-radius": "1px" },
            unlocked() { return hasUpgrade("beta", 15) || player.gamma.unlocked },
        },
    },
    doReset() {},
})
