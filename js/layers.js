function alphaHave() {
    if (player.alphaShow)
        return [ "column", 
            [
                ["display-text", `
                    You have <h2 style='color:${tmp.alpha.color};text-shadow:0 0 10px ${tmp.alpha.color}'>${format(player.alpha.points)}</h2> α, 
                    which is multiplying ω gain by x${format(tmp.alpha.effect)}
                `],
                ["display-text", `You are gaining ${format(tmp.alpha.alphaGain)} α/s`],
                "blank",
            ]
        ]
}

addLayer("alpha", {
    name: "Alpha",
    symbol: "α",
    color: "#f7922d",
    resource: "α",
    type: "none",
    row: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: {
        Challenges: {
            content: [
                alphaHave,
                function() {
                    if (tmp[this.layer].challenges[12].unlocked) return ["row", [["challenge", 11], "blank", ["challenge", 12]]]
                    return ["challenges", [1]]
                },
                "blank",
                ["challenges", [2]],
            ],
        },
        Milestones: {
            content: [
                alphaHave,
                "milestones",
            ],
            unlocked() { return player.alphaShow },
        },
    },
    challenges: {
        11: {
            name: "Alpha I",
            canComplete() { return false },
            fullDisplay() {
                return `
                While in this challenge you gain ω<br><br><br>
                Reward: Adds to α base gain<br><br>
                Total ω gained: ${format(player.alphaBase)} ω
                Effect: +${format(this.rewardEffect())} α
                `
            },
            rewardEffect() {
                return player.alphaBase.div(2)
            },
            onEnter() {
                tmp[this.layer].doReset(this.layer)
            },
            onExit() {
                player.alphaBase = player.alphaBase.add(player.points)
                tmp[this.layer].doReset(this.layer)
                player.alphaShow = true
            },
            style: { "width": "200px", "height": "300px" },
        },
        12: {
            name: "Alpha III",
            canComplete() { return false },
            fullDisplay() {
                return `
                Alpha effect is x1<br><br><br>
                Reward: Multiplies ω gain<br><br>
                Total ω gained: ${format(player.alphaIII)} ω
                Effect: x${format(this.rewardEffect())} ω
                `
            },
            rewardEffect() {
                return player.alphaIII.max(1).log2().max(1)
            },
            onEnter() {
                tmp[this.layer].doReset(this.layer)
            },
            onExit() {
                player.alphaIII = player.alphaIII.add(player.points)
                tmp[this.layer].doReset(this.layer)
            },
            style: { "width": "200px", "height": "300px" },
            unlocked() { return hasMilestone(this.layer, 2) },
        },

        21: {
            name: "Alpha II",
            completionLimit: 5,
            canComplete() { return player.points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Square root α and ω gain<br><br>
                Goal: ${format(this.goal())} ω<br><br>
                Reward: Each completion doubles α gain<br><br>
                Effect: x${format(this.rewardEffect())} α
                `
            },
            rewardEffect() {
                return new Decimal(2).pow(challengeCompletions(this.layer, this.id)).max(1)
            },
            goal() {
                return new Decimal(5).mul(challengeCompletions(this.layer, this.id)).add(5)
            },
            onEnter() {
                player[this.layer].points = new Decimal(0)
                tmp[this.layer].doReset(this.layer)
            },
            unlocked() { return hasMilestone(this.layer, 0) },
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 Total ω gained in Alpha I (1)",
            effectDescription: "Unlock another challenge",
            done() { return player.alphaBase.gte(100) },
        },
        1: {
            requirementDescription: "100 ω while in Alpha I (2)",
            effectDescription: "You can gain ω outside of Alpha I",
            done() { return inChallenge(this.layer, 11) && player.points.gte(100) },
            unlocked() { return hasMilestone(this.layer, 0) }
        },
        2: {
            requirementDescription: "5 Alpha II completions (3)",
            effectDescription: "Unlock another challenge and Alpha effect log3 becomes a log2",
            done() { return challengeCompletions(this.layer, 21) >= 5 },
            unlocked() { return hasMilestone(this.layer, 1) }
        },
    },
    alphaGain() {
        let base = challengeEffect(this.layer, 11)
        base = base.mul(challengeEffect(this.layer, 21))
        if (inChallenge(this.layer, 21)) base = base.sqrt()
        return base
    },
    update(delta) {
        player[this.layer].points = player[this.layer].points.add(tmp[this.layer].alphaGain.mul(delta))
    },
    effect() {
        let log = 3
        if (hasMilestone(this.layer, 2)) log = 2
        let eff = player[this.layer].points.max(1).log(log).add(1)
        if (inChallenge(this.layer, 12)) eff = new Decimal(1)
        return eff
    },
    doReset(layer) {
        let keep = []
        if (layer == this.layer) {
            player.points = new Decimal(0)
            keep.push("points")
            keep.push("milestones")
            keep.push("challenges")
            layerDataReset(this.layer, keep)
        }
    },
})

addLayer("l", {
    color: "#000000",
    tabFormat: {
        Alpha: {
            embedLayer: "alpha",
            buttonStyle: { "border-color": "#ffffff", "border-width": "2px", "border-radius": "1px" },
        },
    },
    doReset() {},
})

addLayer("a", {
    color: "#ffff00",
    tabFormat: {
        Alpha: {
            content: [
                function() {
                    let rows = [1]
                    //if (hasAchievement(this.layer, 17)) rows.push(2)
                    return ["achievements", rows]
                },
            ],
            buttonStyle: { "border-color": "#ffffff", "border-width": "2px", "border-radius": "1px" },
        },
    },
    achievements: {
        11: {
            name: "Wait what?",
            tooltip: "Exit Alpha I",
            done() { return player.alphaShow },
        },
        12: {
            name: "I thought this was challenges only?",
            tooltip: "Get the 1st Alpha milestone",
            done() { return hasMilestone("alpha", 0) },
        },
        13: {
            name: "Ez",
            tooltip: "Get the 1st Alpha II completion",
            done() { return challengeCompletions("alpha", 21) >= 1 },
        },
        14: {
            name: "Slower?",
            tooltip: "Get the 3rd Alpha II completion",
            done() { return challengeCompletions("alpha", 21) >= 3 },
        },
        15: {
            name: "Was that all?",
            tooltip: "Get the 5th Alpha II completion",
            done() { return challengeCompletions("alpha", 21) >= 5 },
        },
        16: {
            name: "No effect!",
            tooltip: "Enter Alpha III",
            done() { return inChallenge("alpha", 12) },
        },
        17: {
            name: "Points",
            tooltip: "Get 150 ω/s",
            done() { return tmp.pointGen.gte(150) },
        },
    },
    doReset() {},
})
