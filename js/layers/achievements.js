const achievementIndexies = {
    "The Beginning": { color: "#f7922d", rows: [1,2,3,4,5] }
}

function achievementIndex(index) {
    if (index == "All") {
        const content = []
        for (const key in achievementIndexies) {
            content.push(["display-text", `<h2 style='color:${achievementIndexies[key].color}'>${key}</h2>`])
            content.push("blank")
            content.push(["achievements", achievementIndexies[key].rows])
        }
        return content
    } else
        return ["achievements", achievementIndexies[index].rows]
}

addLayer("a", {
    color: "#57b37a",
    tabFormat: {
        All: {
            content: achievementIndex("All"),
            buttonStyle: { "border-color": "#fcf93f" },
        },
        "The Beginning": {
            content: achievementIndex("The Beginning"),
            buttonStyle: { "border-color": "#f7922d" },
        }
    },
    achievements: {
        11: { name: "It begins"      , tooltip: "Enter Alpha I"                  , done() { return inChallenge("alpha", 11)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return true                                                                } },
        12: { name: "Challenge?"     , tooltip: "Complete Alpha II five times"   , done() { return challengeCompletions("alpha", 21) >= 5                                                 }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 11) || tmp.a.achievements[13].unlocked   } },
        13: { name: "Upgrading"      , tooltip: "Get α I"                        , done() { return hasUpgrade("alpha", 11)                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 12) || tmp.a.achievements[14].unlocked   } },
        14: { name: "Auto FILL"      , tooltip: "Get Alpha milestone 5"          , done() { return hasMilestone("alpha", 4)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 13) || tmp.a.achievements[15].unlocked   } },
        15: { name: "Rows"           , tooltip: "Get α VI"                       , done() { return hasUpgrade("alpha", 21)                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 14) || tmp.a.achievements[16].unlocked   } },
        16: { name: "More"           , tooltip: "Get Alpha milestone 6"          , done() { return hasMilestone("alpha", 5)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 15) || tmp.a.achievements[17].unlocked   } },
        17: { name: "Infinity"       , tooltip: "Have 1.79e308 α"                , done() { return player.alpha.points.gte(1.79e308)                                                      }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 16) || tmp.a.achievements[21].unlocked   } },

        21: { name: "Careful"        , tooltip: "Get 1 Beta Reset"               , done() { return player.beta.times >= 1                                                                 }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 17) || tmp.a.achievements[22].unlocked   } },
        22: { name: "Bored?"         , tooltip: "Get 2 Beta Reset"               , done() { return player.beta.times >= 2                                                                 }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 21) || tmp.a.achievements[23].unlocked   } },
        23: { name: "Repeat"         , tooltip: "Get 4 Beta Reset"               , done() { return player.beta.times >= 4                                                                 }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 22) || tmp.a.achievements[24].unlocked   } },
        24: { name: "Faster"         , tooltip: "Get 6 Beta Reset"               , done() { return player.beta.times >= 6                                                                 }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 23) || tmp.a.achievements[25].unlocked   } },
        25: { name: "M8"             , tooltip: "Get 8 Beta Reset"               , done() { return player.beta.times >= 8                                                                 }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 24) || tmp.a.achievements[26].unlocked   } },
        26: { name: "Half way"       , tooltip: "Get 10 Beta Reset"              , done() { return player.beta.times >= 10                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 25) || tmp.a.achievements[27].unlocked   } },
        27: { name: "Twelve"         , tooltip: "Get 12 Beta Reset"              , done() { return player.beta.times >= 12                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 26) || tmp.a.achievements[31].unlocked   } },

        31: { name: "For Teen"       , tooltip: "Get 14 Beta Reset"              , done() { return player.beta.times >= 14                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 27) || tmp.a.achievements[32].unlocked   } },
        32: { name: "Hexadecimal"    , tooltip: "Get 16 Beta Reset"              , done() { return player.beta.times >= 16                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 31) || tmp.a.achievements[33].unlocked   } },
        33: { name: "Eight Teen"     , tooltip: "Get 18 Beta Reset"              , done() { return player.beta.times >= 18                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 32) || tmp.a.achievements[34].unlocked   } },
        34: { name: "Passive"        , tooltip: "Get 20 Beta Reset"              , done() { return player.beta.times >= 20                                                                }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 33) || tmp.a.achievements[35].unlocked   } },
        35: { name: "1st row"        , tooltip: "Complete Beta I, II and III"    , done() { return maxedChallenge("beta", 11) && maxedChallenge("beta", 12) && maxedChallenge("beta", 13) }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 34) || tmp.a.achievements[36].unlocked   } },
        36: { name: "2nd row"        , tooltip: "Complete Beta IV, V and VI"     , done() { return maxedChallenge("beta", 21) && maxedChallenge("beta", 22) && maxedChallenge("beta", 23) }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 35) || tmp.a.achievements[37].unlocked   } },
        37: { name: "I-X"            , tooltip: "Complete Beta X"                , done() { return maxedChallenge("beta", 41)                                                             }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 36) || tmp.a.achievements[41].unlocked   } },

        41: { name: "All over again" , tooltip: "Get Gamma milestone 1"          , done() { return hasMilestone("gamma", 0)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 37) || tmp.a.achievements[42].unlocked   } },
        42: { name: "Why only now"   , tooltip: "Get Gamma milestone 2"          , done() { return hasMilestone("gamma", 1)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 41) || tmp.a.achievements[43].unlocked   } },
        43: { name: "Alpha done when", tooltip: "Get Gamma milestone 3"          , done() { return hasMilestone("gamma", 2)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 42) || tmp.a.achievements[44].unlocked   } },
        44: { name: "Auto challenge" , tooltip: "Get Gamma milestone 4"          , done() { return hasMilestone("gamma", 3)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 43) || tmp.a.achievements[45].unlocked   } },
        45: { name: "More auto"      , tooltip: "Get Gamma milestone 5"          , done() { return hasMilestone("gamma", 4)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 44) || tmp.a.achievements[46].unlocked   } },
        46: { name: "Fully(not)auto" , tooltip: "Get Gamma milestone 6"          , done() { return hasMilestone("gamma", 5)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 45) || tmp.a.achievements[47].unlocked   } },
        47: { name: "Almost there"   , tooltip: "Get Gamma milestone 7"          , done() { return hasMilestone("gamma", 6)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 46) || tmp.a.achievements[51].unlocked   } },
        
        51: { name: "Wavy"           , tooltip: "Get Gamma milestone 8"          , done() { return hasMilestone("gamma", 7)                                                               }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 47) || tmp.a.achievements[1001].unlocked } },

        //47: { name: "Not implemented", tooltip: "Not implemented"                , done() { return false                                                                                  }, style() { return componentBorderRadius(this.layer, "achievements", this.id, 8, 7) }, unlocked() { return hasAchievement(this.layer, 36) || tmp.a.achievements[1001].unlocked } },

        // ignore
        1001: {
            name: "Ignore",
            tooltip: "Ignore",
            done() { return false },
            unlocked: false
        },
    },
    doReset() {},
})
