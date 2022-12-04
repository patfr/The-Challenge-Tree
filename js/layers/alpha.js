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
            style: { "width": "200px", "height": "300px", "border-radius": "8px" },
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
            unlocked() { return hasMilestone(this.layer, 2) || player.gamma.unlocked },
            style: { "width": "200px", "height": "300px", "border-radius": "8px" },
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
            unlocked() { return hasMilestone(this.layer, 0) || player.gamma.unlocked },
            style: { "width": "300px", "height": "290px", "border-radius": "8px" },
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
            unlocked() { return hasMilestone(this.layer, 3) || player.gamma.unlocked },
            marked() { return hasChallenge(this.layer, this.id) },
            style: { "width": "300px", "height": "290px", "border-radius": "8px" },
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
            unlocked() { return hasMilestone(this.layer, 4) || player.gamma.unlocked },
            marked() { return hasChallenge(this.layer, this.id) },
            countsAs: [21, 12, 22],
            style: { "width": "300px", "height": "290px", "border-radius": "8px" },
        },
    },
    upgrades: {
        11: {
            title: "α I",
            description: "Alpha II effect will quadruple instead of double",
            cost: new Decimal(1e12),
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        12: {
            title: "α II",
            description: "^2 ω gain",
            cost: new Decimal(1e14),
            unlocked() { return hasUpgrade(this.layer, 11) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[13].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        13: {
            title: "α III",
            description: "Alpha milestone 5 also applies to Alpha III",
            cost: new Decimal(1e25),
            unlocked() { return hasUpgrade(this.layer, 12) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[14].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        14: {
            title: "α IV",
            description: "Alpha II effect is better and you can complete it another 5 times",
            cost: new Decimal(1e72),
            unlocked() { return hasUpgrade(this.layer, 13) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[15].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        15: {
            title: "α V",
            description: "Alpha V effect is better",
            cost: new Decimal(1e79),
            unlocked() { return hasUpgrade(this.layer, 14) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[21].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },

        21: {
            title: "α VI",
            description: "Alpha III effect is better",
            cost: new Decimal(1e110),
            unlocked() { return hasUpgrade(this.layer, 15) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[22].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        22: {
            title: "α VII",
            description: "Alpha II effect also applies to ω gain",
            cost: new Decimal(1e139),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[23].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        23: {
            title: "α VIII",
            description: "Multiply ω gain by x1000 after all powers",
            cost: new Decimal("1e450"),
            unlocked() { return hasUpgrade(this.layer, 22) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[24].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        24: {
            title: "α IX",
            description: "ω boosts it's own gain",
            effect() { return player.points.max(1).log10().max(1) },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: new Decimal(1e218),
            currencyDisplayName: "ω",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade(this.layer, 23) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[25].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        25: {
            title: "α X",
            description: "α boosts it's own gain. Max x1e1000",
            effect() { return player[this.layer].points.pow(0.65).max(1).min("1e1000") },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: new Decimal("5e490"),
            unlocked() { return hasUpgrade(this.layer, 24) || hasUpgrade(this.layer, this.id) || tmp.alpha.upgrades[1001].unlocked || player.beta.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },

        // ignore
        1001: {
            title: "Ignore",
            description: "Ignore",
            cost: new Decimal(Infinity),
            unlocked: false,
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 Total ω gained in Alpha I (1)",
            effectDescription: "Unlock another challenge",
            done() { return player.alphaBase.gte(100) },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        1: {
            requirementDescription: "100 ω while in Alpha I (2)",
            effectDescription: "You can gain ω outside of Alpha I",
            done() { return inChallenge(this.layer, 11) && player.points.gte(100) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 0) || tmp.alpha.milestones[2].unlocked || player.beta.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        2: {
            requirementDescription: "5 Alpha II completions (3)",
            effectDescription: "Unlock another challenge and Alpha effect log3 becomes a log2",
            done() { return challengeCompletions(this.layer, 21) >= 5 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 1) || tmp.alpha.milestones[3].unlocked || player.beta.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        3: {
            requirementDescription: "150 ω/s (4)",
            effectDescription: "Unlock another challenge, unlock upgrades and square Alpha I effect",
            done() { return tmp.pointGen.gte(150) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 2) || tmp.alpha.milestones[4].unlocked || player.beta.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        4: {
            requirementDescription: "1e24 α (5)",
            effectDescription: "Unlock the final challenge and Alpha I total will automatically be increased without entering the challenge",
            done() { return player[this.layer].points.gte(1e24) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 3) || tmp.alpha.milestones[5].unlocked || player.beta.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        5: {
            requirementDescription: "1e279 α (6)",
            effectDescription: "You can complete Alpha II twice as many times and its effect is raised by 1.1",
            done() { return player[this.layer].points.gte(1e279) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 4) || tmp.alpha.milestones[6].unlocked || player.beta.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        6: {
            requirementDescription: "1e1400 α (7)",
            effectDescription: "Unlock a layer",
            done() { return player[this.layer].points.gte("1e1400") },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 5) || tmp.alpha.milestones[1000].unlocked || player.beta.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },

        // ignore
        1000: {
            requirementDescription: "Ignore",
            effectDescription: "Ignore",
            done() { return false },
            unlocked: false,
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
        
        let milestoneKeep = 0
        let upgradeKeep = 0
        let alphaII = challengeCompletions(this.layer, 21)
        let alphaIV = challengeCompletions(this.layer, 22)
        let alphaV = challengeCompletions(this.layer, 31)
        
        if (hasMilestone("beta", 0)) milestoneKeep = 1
        if (hasMilestone("beta", 2)) milestoneKeep = 2
        if (hasMilestone("beta", 3)) milestoneKeep = 3
        if (hasMilestone("beta", 4)) milestoneKeep = 5
        if (hasMilestone("beta", 6)) milestoneKeep = 7
        if (hasMilestone("beta", 1)) upgradeKeep = Math.floor(player.beta.times / 2)
        
        keep.push("milestones")
        keep.push("upgrades")
        layerDataReset(this.layer, keep)
        
        if (!hasMilestone("gamma", 2)) player[this.layer].milestones = player[this.layer].milestones.slice(0, milestoneKeep)
        player[this.layer].upgrades = player[this.layer].upgrades.slice(0, upgradeKeep)
        if (hasMilestone("beta", 3)) player[this.layer].challenges[21] = Math.min(alphaII, player.beta.times)
        if (hasMilestone("beta", 4)) player[this.layer].challenges[22] = Math.min(alphaIV, 1)
        if (hasMilestone("beta", 5)) player[this.layer].challenges[31] = Math.min(alphaV, 1)
    },
})