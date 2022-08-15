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
    colorCan: "#c47423",
    resource: "α",
    type: "none",
    row: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    prestigeNotify() { return tmp[this.layer].tabFormat.Challenges.prestigeNotify },
    shouldNotify() { return tmp[this.layer].tabFormat.Upgrades.shouldNotify },
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
                ["challenges", [3]],
                ["blank", "50px"],
            ],
            shouldNotify() { return false },
            prestigeNotify() {
                return (!maxedChallenge("alpha", 21) && tmp.alpha.challenges[21].unlocked) || 
                    (!maxedChallenge("alpha", 22) && tmp.alpha.challenges[22].unlocked) ||
                    (!maxedChallenge("alpha", 31) && tmp.alpha.challenges[31].unlocked)
            },
        },
        Milestones: {
            content: [
                alphaHave,
                "milestones",
                ["blank", "50px"],
            ],
            unlocked() { return player.alphaShow },
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
        Upgrades: {
            content: [
                alphaHave,
                "upgrades",
            ],
            unlocked() { return hasMilestone("alpha", 3) || player.beta.unlocked },
            shouldNotify() { 
                return (canAffordUpgrade("alpha", 11) && !hasUpgrade("alpha", 11)) ||
                    (canAffordUpgrade("alpha", 12) && !hasUpgrade("alpha", 12)) ||
                    (canAffordUpgrade("alpha", 13) && !hasUpgrade("alpha", 13)) ||
                    (canAffordUpgrade("alpha", 14) && !hasUpgrade("alpha", 14)) ||
                    (canAffordUpgrade("alpha", 15) && !hasUpgrade("alpha", 15)) || 
                    (canAffordUpgrade("alpha", 21) && !hasUpgrade("alpha", 21)) ||
                    (canAffordUpgrade("alpha", 22) && !hasUpgrade("alpha", 22)) ||
                    (canAffordUpgrade("alpha", 23) && !hasUpgrade("alpha", 23)) ||
                    (canAffordUpgrade("alpha", 24) && !hasUpgrade("alpha", 24)) ||
                    (canAffordUpgrade("alpha", 25) && !hasUpgrade("alpha", 25))
            },
        },
        Achievements: {
            content: [
                ["layer-proxy", ["a", [["achievements", [1,2,3]]]]],
            ],
            shouldNotify() { return false },
            prestigeNotify() { return false },
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
                let base = 2
                if (hasUpgrade(this.layer, 21)) base = 1.1
                let eff = player.alphaIII.max(1).log(base).max(1)
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
                if (hasMilestone(this.layer, 5)) base = 20
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
                let eff = base.pow(challengeCompletions(this.layer, this.id)).max(1)
                if (hasMilestone(this.layer, 5)) eff = eff.pow(1.1)
                return eff
            },
            goal() {
                if (challengeCompletions(this.layer, this.id) < 5) return new Decimal(5).mul(challengeCompletions(this.layer, this.id)).add(5)
                if (challengeCompletions(this.layer, this.id) < 10) return new Decimal(1e12).mul(new Decimal(10).pow(challengeCompletions(this.layer, this.id) - 5))
                return new Decimal(1e51).mul(new Decimal(5000).pow(challengeCompletions(this.layer, this.id) - 5))
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
            unlocked() { return hasUpgrade(this.layer, 11) || player.beta.unlocked },
        },
        13: {
            title: "α III",
            description: "Alpha milestone 5 also applies to Alpha III",
            cost: new Decimal(1e25),
            unlocked() { return hasUpgrade(this.layer, 12) || player.beta.unlocked },
        },
        14: {
            title: "α IV",
            description: "Alpha II effect is better and you can complete it another 5 times",
            cost: new Decimal(1e72),
            unlocked() { return hasUpgrade(this.layer, 13) || player.beta.unlocked },
        },
        15: {
            title: "α V",
            description: "Alpha V effect is better",
            cost: new Decimal(1e79),
            unlocked() { return hasUpgrade(this.layer, 14) || player.beta.unlocked },
        },

        21: {
            title: "α VI",
            description: "Alpha III effect is better",
            cost: new Decimal(1e110),
            unlocked() { return hasUpgrade(this.layer, 15) || player.beta.unlocked },
        },
        22: {
            title: "α VII",
            description: "Alpha II effect also applies to ω gain",
            cost: new Decimal(1e139),
            unlocked() { return hasUpgrade(this.layer, 15) || player.beta.unlocked },
        },
        23: {
            title: "α VIII",
            description: "Multiply ω gain by x1000 after all powers",
            cost: new Decimal("1e450"),
            unlocked() { return hasUpgrade(this.layer, 15) || player.beta.unlocked },
        },
        24: {
            title: "α IX",
            description: "ω boosts it's own gain",
            effect() { return player.points.max(1).log10().max(1) },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: new Decimal(1e218),
            currencyDisplayName: "ω",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade(this.layer, 15) || player.beta.unlocked },
        },
        25: {
            title: "α X",
            description: "α boosts it's own gain. Max x1e1000",
            effect() { return player[this.layer].points.pow(0.65).max(1).min("1e1000") },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: new Decimal("5e490"),
            unlocked() { return hasUpgrade(this.layer, 15) || player.beta.unlocked },
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
        5: {
            requirementDescription: "1e279 α (6)",
            effectDescription: "You can complete Alpha II twice as many times and its effect is raised by 1.1",
            done() { return player[this.layer].points.gte(1e279) },
        },
        6: {
            requirementDescription: "1e1400 α (7)",
            effectDescription: "Unlock a layer",
            done() { return player[this.layer].points.gte("1e1400") },
        },
    },
    alphaGain() {
        let base = challengeEffect(this.layer, 11)
        base = base.mul(challengeEffect(this.layer, 21))
        if (hasUpgrade(this.layer, 25)) base = base.mul(upgradeEffect(this.layer, 25))
        base = base.mul(tmp.beta.effect)
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
            return
        }
        player.alphaBase = new Decimal(0)
        player.alphaIII = new Decimal(0)
        if (layer == "beta") {
            let milestoneKeep = 0
            if (hasMilestone("beta", 0)) milestoneKeep = 1
            if (hasMilestone("beta", 2)) milestoneKeep = 2
            if (hasMilestone("beta", 3)) milestoneKeep = 3
            if (hasMilestone("beta", 4)) milestoneKeep = 5
            if (hasMilestone("beta", 6)) milestoneKeep = 7
            let upgradeKeep = 0
            if (hasMilestone("beta", 1)) upgradeKeep = Math.floor(player.beta.times / 2)

            let alphaII = challengeCompletions(this.layer, 21)
            let alphaIV = challengeCompletions(this.layer, 22)
            let alphaV = challengeCompletions(this.layer, 31)

            keep.push("milestones")
            keep.push("upgrades")
            layerDataReset(this.layer, keep)

            player[this.layer].milestones = player[this.layer].milestones.slice(0, milestoneKeep)
            player[this.layer].upgrades = player[this.layer].upgrades.slice(0, upgradeKeep)
            if (hasMilestone("beta", 3)) player[this.layer].challenges[21] = Math.min(alphaII, player.beta.times)
            if (hasMilestone("beta", 4)) player[this.layer].challenges[22] = Math.min(alphaIV, 1)
            if (hasMilestone("beta", 5)) player[this.layer].challenges[31] = Math.min(alphaV, 1)
        }
    },
})

function betaHave() {
    let text = [ "column", 
        [
            ["display-text", `
                You have <h2 style='color:${tmp.beta.color};text-shadow:0 0 10px ${tmp.beta.color}'>${formatWhole(player.beta.points)}</h2> β,
                which is giving a x${format(tmp.beta.effect)} to all prior currencies after powers.
            `],
        ]
    ]

    if (hasMilestone("beta", 7)) text[1].push(["display-text", `You are gaining ${format(tmp.beta.directMult)} β/s`])
    text[1].push("blank")

    return text
}

addLayer("beta", {
    name: "Beta",
    symbol: "β",
    color: "#7da6ff",
    colorCan: "#6485cc",
    resource: "β",
    type: "custom",
    requires: new Decimal("1e1421"),
    baseAmount() { return player.alpha.points },
    getResetGain() { return player.alpha.points.gte(tmp[this.layer].requires) ? tmp[this.layer].directMult : new Decimal(0) },
    getNextAt() { return new Decimal(0) },
    canReset() { return player.alpha.points.gte(tmp[this.layer].requires) },
    prestigeButtonText() { return player.alpha.points.gte(tmp[this.layer].requires) ? "Reset for 1 β" : "Requires: 1e1421 α" },
    directMult() {
        let mult = new Decimal(1)
        if (hasChallenge(this.layer, 21)) mult = mult.add(challengeEffect(this.layer, 21))
        if (hasChallenge(this.layer, 22)) mult = mult.add(challengeEffect(this.layer, 22))
        if (hasChallenge(this.layer, 23)) mult = mult.add(challengeEffect(this.layer, 23))

        mult = mult.mul(challengeEffect(this.layer, 11))
        mult = mult.mul(challengeEffect(this.layer, 12))
        mult = mult.mul(challengeEffect(this.layer, 13))

        if (hasUpgrade(this.layer, 13)) {
            mult = mult.mul(challengeEffect(this.layer, 21).max(1))
            mult = mult.mul(challengeEffect(this.layer, 22).max(1))
            mult = mult.mul(challengeEffect(this.layer, 23).max(1))
        }

        if (hasUpgrade(this.layer, 12)) mult = mult.mul(upgradeEffect(this.layer, 12))

        mult = mult.pow(challengeEffect(this.layer, 31))
        mult = mult.pow(challengeEffect(this.layer, 32))
        mult = mult.pow(challengeEffect(this.layer, 33))

        if (hasChallenge(this.layer, 41)) mult = mult.mul(challengeEffect(this.layer, 41))

        if (inChallenge(this.layer, 41)) mult = mult.tetrate(0.01)
        return mult
    },
    passiveGeneration() { return hasMilestone(this.layer, 7) ? 1 : 0 },
    resetsNothing() { return hasMilestone(this.layer, 7) },
    update(delta) {
        if (hasMilestone(this.layer, 7)) {
            player[this.layer].times += delta
        }
        if (hasUpgrade(this.layer, 11)) {
            for (id in tmp[this.layer].challenges) {
                if (isPlainObject(layers[this.layer].challenges[id])) {
                    if (inChallenge(this.layer, id) && canCompleteChallenge(this.layer, id) && id.toString() !== "41"){
                        let times = challengeCompletions(this.layer, id)
                        times = Math.min(times + 1, tmp[this.layer].challenges[id].completionLimit)
                        player[this.layer].challenges[id] = times
                    }
                }
            }
        }
    },
    row: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        times: 0,
    }},
    shouldNotify() { return false },
    prestigeNotify() { return false },
    tabFormat: {
        Challenges: {
            content: [
                betaHave,
                function() {
                    if (hasMilestone(this.layer, 7)) return "blank"
                    return ["column", [
                        "prestige-button",
                        "blank",
                        ["display-text", `You have ${format(player.alpha.points)} α`],
                    ]]
                },
                ["challenges", [1,2,3]],
                ["blank", "50px"],
                ["challenges", [4]],
                ["blank", "50px"],
            ],
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
        Milestones: {
            content: [
                betaHave,
                () => ["display-text", `You have done ${formatWhole(player.beta.times)} resets`],
                "blank",
                "milestones",
                ["blank", "50px"],
            ],
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
        Upgrades: {
            content: [
                betaHave,
                "upgrades",
            ],
            unlocked() { return hasMilestone("beta", 7) },
            shouldNotify() {
                return (canAffordUpgrade("beta", 11) && !hasUpgrade("beta", 11)) ||
                    (canAffordUpgrade("beta", 12) && !hasUpgrade("beta", 12)) ||
                    (canAffordUpgrade("beta", 13) && !hasUpgrade("beta", 13)) ||
                    (canAffordUpgrade("beta", 14) && !hasUpgrade("beta", 14)) ||
                    (canAffordUpgrade("beta", 15) && !hasUpgrade("beta", 15))
            },
            prestigeNotify() { return false },
        },
        Achievements: {
            content: [
                ["layer-proxy", ["a", [["achievements", [4]]]]]
            ],
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
    },
    challenges: {
        11: {
            name: "Beta I",
            completionLimit: 100,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Multiplies to β gain<br>
                Effect: x${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                let base = new Decimal(3.5)
                if (hasMilestone(this.layer, 8)) base = base.add(1)
                return base.pow(challengeCompletions(this.layer, this.id))
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), challengeCompletions(this.layer, this.id)).mul(20) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return hasMilestone(this.layer, 7) },
            style: { "width": "225px", "height": "225px" },
        },
        12: {
            name: "Beta II",
            completionLimit: 75,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Multiplies to β gain<br>
                Effect: x${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                let base = new Decimal(5)
                if (hasMilestone(this.layer, 8)) base = base.add(1)
                return base.pow(challengeCompletions(this.layer, this.id))
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 2 * challengeCompletions(this.layer, this.id)).mul(10000) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 11) >= 5 },
            style: { "width": "225px", "height": "225px" },
        },
        13: {
            name: "Beta III",
            completionLimit: 50,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Multiplies to β gain<br>
                Effect: x${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                let base = new Decimal(7.5)
                if (hasMilestone(this.layer, 8)) base = base.add(1)
                return base.pow(challengeCompletions(this.layer, this.id))
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 4 * challengeCompletions(this.layer, this.id)).mul(2.25e9) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 12) >= 5 },
            style: { "width": "225px", "height": "225px" },
        },

        21: {
            name: "Beta IV",
            completionLimit: 75,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Add to β base gain<br>
                Effect: +${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                return new Decimal(10).pow(challengeCompletions(this.layer, this.id))
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 8 * challengeCompletions(this.layer, this.id)).mul(2e22) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 13) >= 5 },
            style: { "width": "225px", "height": "225px" },
        },
        22: {
            name: "Beta V",
            completionLimit: 65,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Add to β base gain<br>
                Effect: +${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                return new Decimal(1000).pow(challengeCompletions(this.layer, this.id))
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 16 * challengeCompletions(this.layer, this.id)).mul(1e32) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 13) >= 5 },
            style: { "width": "225px", "height": "225px" },
        },
        23: {
            name: "Beta VI",
            completionLimit: 55,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Add to β base gain<br>
                Effect: +${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                return new Decimal(1e9).pow(challengeCompletions(this.layer, this.id))
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 32 * challengeCompletions(this.layer, this.id)).mul(1e51) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 13) >= 5 },
            style: { "width": "225px", "height": "225px" },
        },

        31: {
            name: "Beta VII",
            completionLimit: 33,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Power β gain<br>
                Effect: ^${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                return new Decimal(0.01).mul(challengeCompletions(this.layer, this.id)).add(1)
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 64 * challengeCompletions(this.layer, this.id)).mul(1e96) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 23) >= 3 },
            style: { "width": "225px", "height": "225px" },
        },
        32: {
            name: "Beta VIII",
            completionLimit: 20,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Power β gain<br>
                Effect: ^${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                return new Decimal(0.015).mul(challengeCompletions(this.layer, this.id)).add(1)
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 128 * challengeCompletions(this.layer, this.id)).mul(1e119) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 23) >= 3 },
            style: { "width": "225px", "height": "225px" },
        },
        33: {
            name: "Beta IX",
            completionLimit: 12,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Goal: ${format(this.goal())} β<br>
                Reward: Power β gain<br>
                Effect: ^${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                return new Decimal(0.025).mul(challengeCompletions(this.layer, this.id)).add(1)
            },
            goal() { return Decimal.pow(challengeCompletions(this.layer, this.id), 256 * challengeCompletions(this.layer, this.id)).mul(1e154) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return challengeCompletions(this.layer, 23) >= 3 },
            style: { "width": "225px", "height": "225px" },
        },

        41: {
            name: "Beta X",
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                Reset all currencies and tetrate β gain by 0.1
                Goal: ${format(this.goal())} β<br>
                Reward: β tetrated by 0.01 multiplies β gain<br>
                Effect: x${format(this.rewardEffect())} β
                `
            },
            rewardEffect() {
                return player.beta.points.max(1).tetrate(0.01).max(1)
            },
            onEnter() {
                player.beta.points = new Decimal(0)
                player.alpha.points = new Decimal(0)
                player.points = new Decimal(0)
            },
            goal() { return new Decimal(1e35) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return hasUpgrade(this.layer, 14) },
            style: { "width": "687px", "height": "225px" },
        },
    },
    upgrades: {
        11: {
            title: "β I",
            description: "You can automatically complete challenges while in them",
            cost: new Decimal(1e22),
        },
        12: {
            title: "β II",
            description: "ω and α boosts β gain",
            effect() { return player.points.max(1).log10().mul(player.alpha.points.max(1).log10()).pow(7).max(1) },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: new Decimal(1e217),
            unlocked() { return hasUpgrade(this.layer, 11) },
        },
        13: {
            title: "β III",
            description: "Beta IV, V and VI multiplies β",
            cost: new Decimal("1e347"),
            unlocked() { return hasUpgrade(this.layer, 12) },
        },
        14: {
            title: "β IV",
            description: "Unlock another challenge",
            cost: new Decimal("5e3344"),
            unlocked() { return hasUpgrade(this.layer, 13) },
        },
        15: {
            title: "β V",
            description: "Unlock a layer<br>(Not implemented)",
            cost: new Decimal("5e3378"),
            unlocked() { return hasUpgrade(this.layer, 14) },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Beta reset (1)",
            effectDescription: "Keep one Alpha milestone on reset",
            done() { return player[this.layer].times >= 1 },
        },
        1: {
            requirementDescription: "2 Beta resets (2)",
            effectDescription: "Keep one Alpha upgrade for every 2 Beta resets on reset",
            done() { return player[this.layer].times >= 2 },
        },
        2: {
            requirementDescription: "3 Beta resets (3)",
            effectDescription: "Keep one Alpha milestone on reset",
            done() { return player[this.layer].times >= 3 },
        },
        3: {
            requirementDescription: "5 Beta resets (4)",
            effectDescription: "Keep one Alpha milestone and keep one Alpha II completion per reset on reset",
            done() { return player[this.layer].times >= 5 },
        },
        4: {
            requirementDescription: "7 Beta resets (5)",
            effectDescription: "Keep two Alpha milestones and keep Alpha IV completion on reset",
            done() { return player[this.layer].times >= 7 },
        },
        5: {
            requirementDescription: "11 Beta resets (6)",
            effectDescription: "Keep one Alpha milestone and keep Alpha V completion on reset",
            done() { return player[this.layer].times >= 11 },
        },
        6: {
            requirementDescription: "15 Beta resets (7)",
            effectDescription: "Keep two Alpha milestones on reset",
            done() { return player[this.layer].times >= 15 },
        },
        7: {
            requirementDescription: "20 Beta resets (8)",
            effectDescription: "Unlock upgrades and gain 100% of your β per second and a reset per second<br>but you can no longer reset, Beta no longer resets anything. Unlock challenges",
            done() { return player[this.layer].times >= 20 },
        },
        8: {
            requirementDescription: "Finish Beta I-IX (9)",
            effectDescription: "Add 1 to Beta I, II and III bases",
            done() {
                return maxedChallenge(this.layer, 11) && maxedChallenge(this.layer, 12) && maxedChallenge(this.layer, 13) &&
                    maxedChallenge(this.layer, 21) && maxedChallenge(this.layer, 22) && maxedChallenge(this.layer, 23) &&
                    maxedChallenge(this.layer, 31) && maxedChallenge(this.layer, 32) && maxedChallenge(this.layer, 33)
            },
        },
    },
    effect() {
        return player[this.layer].best.add(1).pow(2).max(1)
    },
    onPrestige() {
        player[this.layer].times += 1
    }
})

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
    },
    doReset() {},
})

addLayer("help", {
    color: "#000000",
    tabFormat: {
        General: {
            content: [
                ["help", { name: "Timewalls", color: "#eeeeee", items: [
                    { summary: "What are they?", items: [
                        "Timewalls are known as the time you need to wait<br> in between each action in the game.",
                    ]},{ summary: "When is it too long?", items: [
                        "Timewalls in this game are meant to be short.<br>This means if you wait more than 2 minutes.<br>It means you are either missing something or something broke.",
                    ]},
                ]}],
            ],
            buttonStyle: { "border-color": "#ffffff", "border-width": "2px", "border-radius": "1px" },
        },
    },
    doReset() {},
})

addLayer("a", {
    color: "#ffff00",
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
            unlocked() { return hasAchievement(this.layer, 17) },
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

        31: {
            name: "Lame",
            tooltip: "Get α VI",
            done() { return hasUpgrade("alpha", 21) },
            unlocked() { return hasAchievement(this.layer, 27) },
        },
        32: {
            name: "Better than expected",
            tooltip: "Get α VII",
            done() { return hasUpgrade("alpha", 22) },
        },
        33: {
            name: "So i have to do it again?",
            tooltip: "Get the 6th Alpha milestone",
            done() { return hasMilestone("alpha", 5) },
        },
        34: {
            name: "Is it done now for real?",
            tooltip: "Get the 20th Alpha II completion",
            done() { return challengeCompletions("alpha", 21) >= 20 },
        },
        35: {
            name: "How much inflation does this have?",
            tooltip: "Get α IX",
            done() { return hasUpgrade("alpha", 24) },
        },
        36: {
            name: "Am i nearing the end of this?",
            tooltip: "Get α X",
            done() { return hasUpgrade("alpha", 25) },
        },
        37: {
            name: "Do a beta wave (barrelroll)",
            tooltip: "Get the 7th Alpha milestone",
            done() { return hasMilestone("alpha", 6) },
        },

        41: {
            name: "This is gonna be repetitive",
            tooltip: "Get the 1st Beta milestone",
            done() { return hasMilestone("beta", 0) },
        },
        42: {
            name: "Only one for two?",
            tooltip: "Get the 2nd Beta milestone",
            done() { return hasMilestone("beta", 1) },
        },
        43: {
            name: "Only two after three?",
            tooltip: "Get the 3rd Beta milestone",
            done() { return hasMilestone("beta", 2) },
        },
        44: {
            name: "Why did this not come sooner?",
            tooltip: "Get the 4th Beta milestone",
            done() { return hasMilestone("beta", 3) },
        },
        45: {
            name: "Now we don't need to worry about that",
            tooltip: "Get the 5th Beta milestone",
            done() { return hasMilestone("beta", 4) },
        },
        46: {
            name: "YES, thank you",
            tooltip: "Get the 6th Beta milestone",
            done() { return hasMilestone("beta", 5) },
        },
        47: {
            name: "Is this getting fast now?",
            tooltip: "Get the 7th Beta milestone",
            done() { return hasMilestone("beta", 6) },
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
