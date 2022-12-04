var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}

addNode("blank", { layerShown: "ghost", position: 0, row: 3 })


addLayer("tree-tab", {
    tabFormat: {
        Layers: {
            embedLayer: "l",
            buttonStyle: { "border-color": "#43e06d" },
        },
        Achievements: {
            embedLayer: "a",
            buttonStyle: { "border-color": "#fcf93f" },
        },
    },
    previousTab: "",
    leftTab: true,
})