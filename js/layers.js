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
                    if (tmp[this.layer].challenges[12].unlocked) return ["row", [["challenge", 11], ["blank", ["111px", "1px"]], ["challenge", 12]]]
                    return ["challenges", [1]]
                },
                "blank",
                function() {
                    if (tmp[this.layer].challenges[22].unlocked) return ["row", [["challenge", 21], "blank", ["challenge", 22]]]
                    return ["challenges", [2]]
                },
                "blank",
                ["challenges", [3]]
            ],
        },
        Milestones: {
            content: [
                alphaHave,
                "milestones",
            ],
            unlocked() { return player.alphaShow },
        },
        Upgrades: {
            content: [
                alphaHave,
                "upgrades",
            ],
            unlocked() { return hasMilestone("alpha", 3) },
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
                let eff = player.alphaBase.div(2)
                if (hasMilestone(this.layer, 3)) eff = eff.pow(2)
                return eff
            },
            onEnter() {
                tmp[this.layer].doReset(this.layer)
            },
            onExit() {
                if (!hasMilestone(this.layer, 4)) player.alphaBase = player.alphaBase.add(player.points)
                tmp[this.layer].doReset(this.layer)
                player.alphaShow = true
            },
            marked() { return hasChallenge(this.layer, this.id) },
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
                let eff = player.alphaIII.max(1).log2().max(1)
                if (hasChallenge(this.layer, 22)) eff = eff.pow(2)
                return eff
            },
            onEnter() {
                tmp[this.layer].doReset(this.layer)
            },
            onExit() {
                if (!hasUpgrade(this.layer, 13)) player.alphaIII = player.alphaIII.add(player.points)
                tmp[this.layer].doReset(this.layer)
            },
            marked() { return hasChallenge(this.layer, this.id) },
            unlocked() { return hasMilestone(this.layer, 2) },
            style: { "width": "200px", "height": "300px" },
        },

        21: {
            name: "Alpha II",
            completionLimit() {
                let base = 5
                if (hasUpgrade(this.layer, 14)) base = 10
                return base
            },
            canComplete() { return player.points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit()}<br><br>
                Square root α and ω gain<br><br>
                Goal: ${format(this.goal())} ω<br><br>
                Reward: Each completion doubles α gain<br><br>
                Effect: x${format(this.rewardEffect())} α
                `
            },
            rewardEffect() {
                let base = new Decimal(2)
                if (hasUpgrade(this.layer, 11)) base = new Decimal(4)
                if (hasUpgrade(this.layer, 14)) base = new Decimal(8)
                return base.pow(challengeCompletions(this.layer, this.id)).max(1)
            },
            goal() {
                if (challengeCompletions(this.layer, this.id) < 5) return new Decimal(5).mul(challengeCompletions(this.layer, this.id)).add(5)
                return new Decimal(5e16)
            },
            onEnter() {
                player[this.layer].points = new Decimal(0)
                tmp[this.layer].doReset(this.layer)
            },
            unlocked() { return hasMilestone(this.layer, 0) },
            style: { "width": "300px", "height": "290px" },
        },
        22: {
            name: "Alpha IV",
            canComplete() { return player.points.gte(this.goal()) },
            fullDisplay() {
                return `
                Cube root α and ω gain<br><br>
                Goal: ${format(this.goal())} ω<br><br>
                Reward: Square Alpha III effect<br><br>
                `
            },
            goal() {
                return new Decimal(150)
            },
            onEnter() {
                player[this.layer].points = new Decimal(0)
                tmp[this.layer].doReset(this.layer)
            },
            unlocked() { return hasMilestone(this.layer, 3) },
            marked() { return hasChallenge(this.layer, this.id) },
            style: { "width": "300px", "height": "290px" },
        },

        31: {
            name: "Alpha V",
            canComplete() { return player.points.gte(this.goal()) },
            fullDisplay() {
                return `
                You are in Alpha II, III and IV at the same time<br><br>
                Goal: ${format(this.goal())} ω<br><br>
                Reward: ^${format(this.rewardEffect())} ω gain<br><br>
                `
            },
            rewardEffect() {
                let base = new Decimal(2.5)
                if (hasUpgrade(this.layer, 15)) base = new Decimal(3.5)
                return base
            },
            goal() {
                return new Decimal(300)
            },
            onEnter() {
                player[this.layer].points = new Decimal(0)
                tmp[this.layer].doReset(this.layer)
            },
            unlocked() { return hasMilestone(this.layer, 4) },
            marked() { return hasChallenge(this.layer, this.id) },
            countsAs: [21, 12, 22],
            style: { "width": "300px", "height": "290px" },
        },
    },
    upgrades: {
        11: {
            title: "α I",
            description: "Alpha II effect will quadruple instead of double",
            cost: new Decimal(1e12),
        },
        12: {
            title: "α II",
            description: "^2 ω gain",
            cost: new Decimal(1e14),
        },
        13: {
            title: "α III",
            description: "Alpha milestone 5 also applies to Alpha III",
            cost: new Decimal(1e25),
        },
        14: {
            title: "α IV",
            description: "Alpha II effect is better and you can complete it another 5 times",
            cost: new Decimal(1e72),
        },
        15: {
            title: "α V",
            description: "Alpha V effect is better",
            cost: new Decimal(3e79),
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
        },
        2: {
            requirementDescription: "5 Alpha II completions (3)",
            effectDescription: "Unlock another challenge and Alpha effect log3 becomes a log2",
            done() { return challengeCompletions(this.layer, 21) >= 5 },
        },
        3: {
            requirementDescription: "150 ω/s (4)",
            effectDescription: "Unlock another challenge, unlock upgrades and square Alpha I effect",
            done() { return tmp.pointGen.gte(150) },
        },
        4: {
            requirementDescription: "1e24 α (5)",
            effectDescription: "Unlock the final challenge and Alpha I total will automatically be increased without entering the challenge",
            done() { return player[this.layer].points.gte(1e24) },
        },
    },
    alphaGain() {
        let base = challengeEffect(this.layer, 11)
        base = base.mul(challengeEffect(this.layer, 21))
        if (inChallenge(this.layer, 21)) base = base.sqrt()
        if (inChallenge(this.layer, 22)) base = base.cbrt()
        return base
    },
    update(delta) {
        player[this.layer].points = player[this.layer].points.add(tmp[this.layer].alphaGain.mul(delta))
        if (hasMilestone(this.layer, 4)) {
            player.alphaBase = player.alphaBase.max(player.points)
            player[this.layer].challenges[11] = 1
        }
        if (hasUpgrade(this.layer, 13)) {
            player.alphaIII = player.alphaIII.max(player.points)
            player[this.layer].challenges[12] = 1
        }
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
            keep.push("upgrades")
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
                    if (hasAchievement(this.layer, 17)) rows.push(2)
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

        21: {
            name: "Use the forth",
            tooltip: "Complete Alpha IV",
            done() { return hasChallenge("alpha", 22) },
        },
        22: {
            name: "Inflation begins?",
            tooltip: "Get α I",
            done() { return hasUpgrade("alpha", 11) },
        },
        23: {
            name: "Is that all challenges?",
            tooltip: "Get the 5th Alpha milestone",
            done() { return hasMilestone("alpha", 4) },
        },
        24: {
            name: "Is it boring now?",
            tooltip: "Get α III",
            done() { return hasUpgrade("alpha", 13) },
        },
        25: {
            name: "So what now?",
            tooltip: "Complete Alpha V",
            done() { return hasChallenge("alpha", 31) },
        },
        26: {
            name: "Noice",
            tooltip: "Get 6.9e69 α",
            done() { return player.alpha.points.gte(6.9e69) },
        },
        27: {
            name: "Inflation row",
            tooltip: "Get α V",
            done() { return hasUpgrade("alpha", 15) },
        },

        /*
        21: {
            name: "Not implemented",
            tooltip: "Not implemented",
            done() { return false },
        },
        */
    },
    doReset() {},
})
