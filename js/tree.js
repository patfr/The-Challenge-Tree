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
        Achivements: {
            embedLayer: "a",
            buttonStyle: { "border-color": "#ffff00" },
        },
    },
    previousTab: "",
    leftTab: true,
})