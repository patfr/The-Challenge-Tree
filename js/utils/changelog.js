let changelog = [
	["display-text", "<div><h1>Changelog</h1></div"],
	["display-text", 
        "<div><h2 style='color: #f7492a'>Goto</h2></div>" +
        "<ul>" +
            "<li><a style='color: #fcf93f' href='#endgameChapter'>Endgame</a> <span style='color:#afafaf'>v0.1 - v0.8</span></li>" +
            "<li><a style='color: #a65af2' href='#gammaChapter'>Gamma</a> <span style='color:#afafaf'>v0.7 - v0.8</span></li>" +
            "<li><a style='color: #7da6ff' href='#betaChapter'>Beta</a> <span style='color:#afafaf'>v0.5 - v0.6</span></li>" +
            "<li><a style='color: #f7922d' href='#alphaChapter'>Alpha</a> <span style='color:#afafaf'>v0.1 - v0.4</span></li>" +
        "</ul>"
    ],
    ["versions", [

        // Endgame
        { color: "#fcf93f", name: "Endgame", id: "endgameChapter", items: [
            { open: false, summary: "v0.8", items: [[
                {type: "Endgame", description: "3,000 αψ, 3,000 βψ and 30,000 γ"},
            ]]},
            { open: false, summary: "v0.7", items: [[
                {type: "Endgame", description: "10 Gamma resets"},
            ]]},
            { open: false, summary: "v0.6", items: [[
                {type: "Endgame", description: "β V upgrade"},
            ]]},
            { open: false, summary: "v0.5", items: [[
                {type: "Endgame", description: "20 Beta resets"},
            ]]},
            { open: false, summary: "v0.4", items: [[
                {type: "Endgame", description: "1e1421 α"},
            ]]},
            { open: false, summary: "v0.3", items: [[
                {type: "Endgame", description: "1.00e110 α"},
            ]]},
            { open: false, summary: "v0.2", items: [[
                {type: "Endgame", description: "150 ω/s"},
            ]]},
            { open: false, summary: "v0.1", items: [[
                {type: "Endgame", description: "100,000 α"},
            ]]},
        ]},

        // Beta
        { color: "#a65af2", name: "Gamma", id: "gammaChapter", items: [
            { open: true, summary: "v0.8", items: [[
                {type: "Added", description: "Two milestones"},
                {type: "Added", description: "Two upgrades"},
                {type: "Added", description: "Two challenges"},
                {type: "Added", description: "Three bars"},
                {type: "Added", description: "Three buyables"},
            ]]},
            { open: false, summary: "v0.7", items: [[
                {type: "Added", description: "Files for each layer"},
                {type: "Added", description: "Info menu for all layers"},
                {type: "Added", description: "5 Rows of achievements"},
                {type: "Added", description: "A layer"},
                {type: "Added", description: "Eight milestones"},
            ],[
                {type: "Changed", description: "Changelog menu again..."},
                {type: "Changed", description: "Borders of challenges, upgrades, achievements and milestones"},
                {type: "Changed", description: "Unlock order of challenges, upgrades, achievements and milestones"},
            ],[
                {type: "Fixed", description: "Alpha challenges borders"},
            ],[
                {type: "Removed", description: "Old achievements"},
            ]]},
        ]},

        // Beta
        { color: "#7da6ff", name: "Beta", id: "betaChapter", items: [
            { open: false, summary: "v0.6", items: [[
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
            { open: false, summary: "v0.5", items: [[
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
        ]},

        // Alpha
        { color: "#f7922d", name: "Alpha", id: "alphaChapter", items: [
            { open: false, summary: "v0.4", items: [[
                {type: "Added", description: "Two milestones"},
                {type: "Added", description: "Seven achievements"},
                {type: "Added", description: "Five upgrades"},
            ],[
                {type: "Changed", description: "2nd set of Alpha II completion to now have goal scaling"},
            ]]},
            { open: false, summary: "v0.3.1", items: [[
                {type: "Fixed", description: "Fixed Alpha II having the wrong goal"},
            ]]},
            { open: false, summary: "v0.3", items: [[
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
            { open: false, summary: "v0.2", items: [[
                {type: "Added", description: "A challenge"},
                {type: "Added", description: "A milestone"},
                {type: "Added", description: "Seven achievements"},
            ],[
                {type: "Changed", description: "Alpha II to now also reset Alpha points on enter"},
                {type: "Changed", description: "Alpha II to now also square root Alpha gain"},
                {type: "Changed", description: "Changelog"},
            ]]},
            { open: false, summary: "v0.1", items: [[
                {type: "Added", description: "A layer"},
                {type: "Added", description: "Two milestones"},
                {type: "Added", description: "Two challenges"},
            ]]},
        ]},
    ]],
]