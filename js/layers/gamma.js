function gammaHave() {
    return [ "column", 
        [
            ["display-text", `
                You have <h2 style='color:${tmp.gamma.color};text-shadow:0 0 10px ${tmp.gamma.color}'>${format(player.gamma.points)}</h2> γ, 
                which is multiplying β gain by x${format(tmp.gamma.effect)} (Max: x1,024) before powers.
            `],
            "blank",
        ]
    ]
}

addLayer("gamma", {
    name: "Gamma",
    symbol: "γ",
    color: "#9124ff",
    colorCan: "#741dcc",
    resource: "γ",
    type: "custom",
    requires: new Decimal("5e3378"),
    baseAmount() { return player.beta.points },
    getResetGain() { return player.beta.points.gte(tmp[this.layer].requires) ? tmp[this.layer].directMult : new Decimal(0) },
    getNextAt() { return new Decimal(0) },
    canReset() { return player.beta.points.gte(tmp[this.layer].requires) },
    prestigeButtonText() { return player.beta.points.gte(tmp[this.layer].requires) ? `Reset for ${formatWhole(tmp[this.layer].directMult)} γ` : "Requires: 5e3378 β" },
    directMult() {
        let mult = new Decimal(1)
        if (hasUpgrade(this.layer, 11)) mult = mult.mul(tmp.gamma.waves.effects.effect1)
        return mult
    },
    passiveGeneration() { return hasUpgrade(this.layer, 12) ? 1 : 0 },
    resetsNothing() { return hasMilestone(this.layer, 7) },
    update(delta) {
        if (hasUpgrade(this.layer, 12)) {
            player[this.layer].times += delta
        }
        if (inChallenge("gamma", 11) || hasMilestone("gamma", 9)) player.gamma.alpha.points = player.gamma.alpha.points.add(tmp.gamma.waves.gains.alpha.mul(delta)).min(tmp.gamma.waves.caps.alpha)
        if (inChallenge("gamma", 12) || hasMilestone("gamma", 9)) player.gamma.beta.points = player.gamma.beta.points.add(tmp.gamma.waves.gains.beta.mul(delta)).min(tmp.gamma.waves.caps.beta)
        player.gamma.gamma.points = player.gamma.gamma.points.add(tmp.gamma.waves.gains.gamma.mul(delta)).min(tmp.gamma.waves.caps.gamma)
    },
    row: 2,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        alpha: { points: new Decimal(0), best: new Decimal(0), total: new Decimal(0) },
        beta: { points: new Decimal(0), best: new Decimal(0), total: new Decimal(0) },
        gamma: { points: new Decimal(0), best: new Decimal(0), total: new Decimal(0) },
        times: 0,
    }},
    shouldNotify() { return false },
    prestigeNotify() { return false },
    waves: {
        gains: {
            alpha() {
                let gain = inChallenge("gamma", 11) || hasMilestone("gamma", 9) ? new Decimal(1) : new Decimal(0)
                gain = gain.mul(challengeEffect("gamma", 11))
                return gain
            },
            beta() {
                let gain = inChallenge("gamma", 12) || hasMilestone("gamma", 9) ? new Decimal(1) : new Decimal(0)
                gain = gain.mul(challengeEffect("gamma", 12))
                return gain
            },
            gamma() {
                let base = player.gamma.alpha.points.max(1).log10().add(player.gamma.beta.points.max(1).log10()).div(2)
                if (hasUpgrade("gamma", 11)) base = base.mul(2)
                base = base.mul(buyableEffect("gamma", 21))
                return player.gamma.alpha.points.min(1).add(player.gamma.beta.points.min(1)).gte(2) ? base : new Decimal(0)
            },
        },
        caps: {
            alpha() {
                let cap = new Decimal(100)
                cap = cap.mul(buyableEffect("gamma", 11))
                return cap
            },
            beta() {
                let cap = new Decimal(100)
                cap = cap.mul(buyableEffect("gamma", 12))
                return cap
            },
            gamma() {
                return tmp.gamma.waves.caps.alpha.add(tmp.gamma.waves.caps.beta)
            },
        },
        effects: {
            effect1() {
                let effect = player.gamma.gamma.points.add(10).log10().pow(2).max(1)
                if (hasUpgrade("gamma", 12)) effect = effect.pow(2)
                return effect
            },
        },
    },
    tabFormat: {
        Challenges: {
            content: [
                gammaHave,
                function() {
                    return ["column", [
                        hasUpgrade("gamma", 12) ? "" : "prestige-button",
                        "blank",
                        hasUpgrade("gamma", 12) ? "" : ["display-text", `You have ${format(player.beta.points)} β`],
                    ]]
                },
                "blank",
                function() {
                    let effect1 = ""
                    if (hasUpgrade("gamma", 11))
                        effect1 = ["display-text", `Effect 1: x${format(tmp.gamma.waves.effects.effect1)} to γ gain`]
                    if (hasMilestone("gamma", 7)) return ["column", [
                        ["row", [
                            ["display-text", "<div style='width:78px;white-space:nowrap;display:flex;justify-content:center'>Alpha Waves (αψ)</div>"],
                            ["blank", ["472px", "17px"]],
                            ["display-text", "<div style='width:78px;white-space:nowrap;display:flex;justify-content:center'>Beta Waves (βψ)</div>"],
                        ]],
                        "blank",
                        ["row", [
                            ["bar", "alpha"],
                            ["challenge", 11],
                            ["blank", ["16px", "17px"]],
                            ["challenge", 12],
                            ["bar", "beta"],
                        ]],
                        "blank",
                        ["row", [
                            ["display-text", `<div style='width:78px;white-space:nowrap;display:flex;justify-content:center'>${format(player.gamma.alpha.points)}/${format(tmp.gamma.waves.caps.alpha)} αψ</div>`],
                            ["blank", ["228px", "17px"]],
                            ["display-text", "<div style='width:16px;white-space:nowrap;display:flex;justify-content: center'>Gamma Waves (γψ)</div>"],
                            ["blank", ["228px", "17px"]],
                            ["display-text", `<div style='width:78px;white-space:nowrap;display:flex;justify-content:center'>${format(player.gamma.beta.points)}/${format(tmp.gamma.waves.caps.beta)} βψ</div>`],
                        ]],
                        "blank",
                        ["bar", "gamma"],
                        "blank",
                        ["row", [
                            ["display-text", `<div style='width:78px;white-space:nowrap;display:flex;justify-content:center'>${format(player.gamma.gamma.points)}/${format(tmp.gamma.waves.caps.gamma)} γψ</div>`],
                            ["blank", ["472px", "17px"]],
                            ["display-text", `<div style='width:78px;white-space:nowrap;display:flex;justify-content:center'>${format(tmp.gamma.waves.gains.gamma)} γψ/s</div>`],
                        ]],
                        "blank",
                        ["display-text", "Gamma Wave cap is based on Alpha and Beta Wave caps."],
                        ["display-text", "Gamma Wave gain is based on Alpha and Beta Wave amount."],
                        ["display-text", "2<sup>completions</sup> multiplies their repective wave gain."],
                        "blank",
                        effect1,
                        ["blank", "50px"],
                    ]]
                },                
            ],
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
        Milestones: {
            content: [
                gammaHave,
                () => ["display-text", `You have done ${formatWhole(player.gamma.times)} resets`],
                "blank",
                "milestones",
                ["blank", "50px"],
            ],
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
        Upgrades: {
            content: [
                gammaHave,
                "upgrades",
            ],
            unlocked() { return hasMilestone("gamma", 8) },
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
        Buyables: {
            content: [
                gammaHave,
                "buyables",
            ],
            unlocked() { return hasMilestone("gamma", 8) },
            shouldNotify() { return false },
            prestigeNotify() { return false },
        },
    },
    bars: {
        alpha: {
            direction: UP,
            width: 75,
            height: 300,
            progress() { return player.gamma.alpha.points.div(tmp.gamma.waves.caps.alpha) },
            display() { return `${format(this.progress() * 100)}%` },
            textStyle() { return {"transform": "rotate(-45deg)","color":"rgba(0,0,0,0.5)"} },
            fillStyle() { return {"background":tmp.alpha.color,"border-radius":"10px 0 0 10px"} },
            baseStyle() { return {"background":maxedChallenge(this.layer, 11) ? tmp.alpha.color : "var(--locked)"} },
            borderStyle() { return {"border":"3px solid rgba(0,0,0,0.125)","border-right-width":"0","border-radius":"10px 0 0 10px"} },
            instant: true,
        },
        beta: {
            direction: UP,
            width: 75,
            height: 300,
            progress() { return player.gamma.beta.points.div(tmp.gamma.waves.caps.beta) },
            display() { return `${format(this.progress() * 100)}%` },
            textStyle() { return {"transform": "rotate(-45deg)","color":"rgba(0,0,0,0.5)"} },
            fillStyle() { return {"background":tmp.beta.color,"border-radius":"0 10px 10px 0"} },
            baseStyle() { return {"background":maxedChallenge(this.layer, 12) ? tmp.beta.color : "var(--locked)"} },
            borderStyle() { return {"border":"3px solid rgba(0,0,0,0.125)","border-left-width":"0","border-radius":"0 10px 10px 0"} },
            instant: true,
        },
        gamma: {
            direction: RIGHT,
            width: 622,
            height: 75,
            progress() { return player.gamma.gamma.points.div(tmp.gamma.waves.caps.gamma) },
            display() { return `${format(this.progress() * 100)}%` },
            textStyle() { return {"color":"rgba(0,0,0,0.5)"} },
            fillStyle() { return {"background":tmp.gamma.color} },
            baseStyle() { return {"background":this.progress().gte(1) ? tmp.gamma.color : "var(--locked)"} },
            borderStyle() { return {"border":"3px solid rgba(0,0,0,0.125)"} },
            instant: true,
        },
    },
    challenges: {
        11: {
            name: "Alpha Waves<br>~~~~~~~~~~~",
            completionLimit: 100,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                While in this challenge you gain Alpha Waves<br><br>
                Completions: ${challengeCompletions(this.layer, this.id)}/${tmp.gamma.challenges[this.id].completionLimit}<br><br>
                Goal: ${format(tmp.gamma.challenges[this.id].goal)} γ<br><br>
                Your gaining<br>${format(tmp.gamma.waves.gains.alpha)} αψ/s
                `
            },
            rewardEffect() { return new Decimal(2).pow(challengeCompletions(this.layer, this.id)) },
            goal() { return new Decimal(20).mul(new Decimal(2).pow(new Decimal(challengeCompletions(this.layer, this.id)).pow(1.5))) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return hasMilestone(this.layer, 7) },
            style() { return { "width": "222px", "height": "290px", "border-radius": "0 8px 8px 0", "background": maxedChallenge(this.layer, this.id) ? tmp.alpha.color : "" } },
        },
        12: {
            name: "Beta Waves<br>~~~~~~~~~~",
            completionLimit: 100,
            canComplete() { return player[this.layer].points.gte(this.goal()) },
            fullDisplay() {
                return `
                While in this challenge you gain Beta Waves<br><br>
                Completions: ${challengeCompletions(this.layer, this.id)}/${tmp.gamma.challenges[this.id].completionLimit}<br><br>
                Goal: ${format(tmp.gamma.challenges[this.id].goal)} γ<br><br>
                Your gaining<br>${format(tmp.gamma.waves.gains.beta)} βψ/s
                `
            },
            rewardEffect() { return new Decimal(2).pow(challengeCompletions(this.layer, this.id)) },
            goal() { return new Decimal(20).mul(new Decimal(2).pow(new Decimal(challengeCompletions(this.layer, this.id)).pow(1.5))) },
            marked() { return maxedChallenge(this.layer, this.id) },
            unlocked() { return hasMilestone(this.layer, 7) },
            style() { return { "width": "222px", "height": "290px", "border-radius": "8px 0 0 8px", "background": maxedChallenge(this.layer, this.id) ? tmp.beta.color : "" } },
        },
    },
    buyables: {
        11: {
            display() {
                return `
                <h1>αψ Cap<br>~~~~~~</h1><br>
                <h3>Amount: ${getBuyableAmount(this.layer, this.id)}</h3><br><br>
                <h3>Effect:<br>x${formatWhole(this.effect())} to αψ cap</h3><br><br><br>
                <h3>Cost: ${formatWhole(this.cost())} αψ</h3>
                `
            },
            cost(x) { return new Decimal(2.5).pow(x).mul(25) },
            effect(x) { return new Decimal(2).pow(x) },
            canAfford() { return player.gamma.alpha.points.gte(this.cost()) },
            buy() {
                player.gamma.alpha.points = player.gamma.alpha.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let style = componentBorderRadius(this.layer, "buyables", this.id, 8, 2)
                style.background = this.canAfford() ? tmp.alpha.color : "var(--locked)"
                return style
            }
        },
        12: {
            display() {
                return `
                <h1>βψ Cap<br>~~~~~~</h1><br>
                <h3>Amount: ${getBuyableAmount(this.layer, this.id)}</h3><br><br>
                <h3>Effect:<br>x${formatWhole(this.effect())} to βψ cap</h3><br><br><br>
                <h3>Cost: ${formatWhole(this.cost())} βψ</h3>
                `
            },
            cost(x) { return new Decimal(2.5).pow(x).mul(25) },
            effect(x) { return new Decimal(2).pow(x) },
            canAfford() { return player.gamma.beta.points.gte(this.cost()) },
            buy() {
                player.gamma.beta.points = player.gamma.beta.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let style = componentBorderRadius(this.layer, "buyables", this.id, 8, 2)
                style.background = this.canAfford() ? tmp.beta.color : "var(--locked)"
                return style
            }
        },
        21: {
            display() {
                return `
                <h1>γψ Gain<br>~~~~~~</h1><br>
                <h3>Amount: ${getBuyableAmount(this.layer, this.id)}</h3><br><br>
                <h3>Effect:<br>x${formatWhole(this.effect())} to γψ gain</h3><br><br><br>
                <h3>Cost: ${formatWhole(this.cost())} γψ</h3>
                `
            },
            cost(x) { return new Decimal(2.5).pow(x).mul(50) },
            effect(x) { return new Decimal(2).pow(x) },
            canAfford() { return player.gamma.gamma.points.gte(this.cost()) },
            buy() {
                player.gamma.gamma.points = player.gamma.gamma.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let style = componentBorderRadius(this.layer, "buyables", this.id, 8, 2)
                style.background = this.canAfford() ? tmp.gamma.color : "var(--locked)"
                return style
            }
        },
    },
    upgrades: {
        11: {
            title: "γ I",
            description: "Double γψ gain and unlock γψ effect",
            cost: new Decimal(100),
            currencyDisplayName: "γψ",
            currencyInternalName: "points",
            currencyLocation() { return player.gamma.gamma },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        12: {
            title: "γ II",
            description: "Remove the prestige button but passively gain γ and gain a reset per second and square effect 1",
            cost: new Decimal(6000),
            currencyDisplayName: "γψ",
            currencyInternalName: "points",
            currencyLocation() { return player.gamma.gamma },
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
            requirementDescription: "1 Gamma reset (1)",
            effectDescription: "Keep one Beta reset and one best Beta per reset,<br>up to the number of resetsand keep one Beta upgrade on reset",
            done() { return player[this.layer].times >= 1 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        1: {
            requirementDescription: "2 Gamma resets (2)",
            effectDescription: "Gain double Beta resets",
            done() { return player[this.layer].times >= 2 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 0) || tmp.gamma.milestones[2].unlocked },
        },
        2: {
            requirementDescription: "3 Gamma resets (3)",
            effectDescription: "Gamma milestone 1 keeps twice as many resets and keep Alpha milestones on reset",
            done() { return player[this.layer].times >= 3 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 1) || tmp.gamma.milestones[3].unlocked },
        },
        3: {
            requirementDescription: "4 Gamma resets (4)",
            effectDescription: "Beta I, II, III are automatically gained outside of them and keep Beta X on reset",
            done() { return player[this.layer].times >= 4 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 2) || tmp.gamma.milestones[4].unlocked },
        },
        4: {
            requirementDescription: "6 Gamma resets (5)",
            effectDescription: "Beta IV, V, VI are automatically gained outside of them and keep a Beta upgrade on reset",
            done() { return player[this.layer].times >= 6 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 3) || tmp.gamma.milestones[5].unlocked },
        },
        5: {
            requirementDescription: "8 Gamma resets (6)",
            effectDescription: "Beta VII, VIII, IX are automatically gained outside of them and keep a Beta upgrade on reset",
            done() { return player[this.layer].times >= 8 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 4) || tmp.gamma.milestones[6].unlocked },
        },
        6: {
            requirementDescription: "9 Gamma resets (7)",
            effectDescription: "Keep two Beta upgrades on reset",
            done() { return player[this.layer].times >= 9 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 5) || tmp.gamma.milestones[7].unlocked },
        },
        7: {
            requirementDescription: "10 Gamma resets (8)",
            effectDescription: "Keep Beta milestones on reset and unlock Gamma challenges",
            done() { return player[this.layer].times >= 10 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 6) || tmp.gamma.milestones[8].unlocked },
        },
        8: {
            requirementDescription: "100 γψ (9)",
            effectDescription: "Unlock Gamma upgrades and buyables",
            done() { return player.gamma.gamma.points.gte(100) },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 7) || tmp.gamma.milestones[1000].unlocked },
        },
        9: {
            requirementDescription: "20,000 γ (10)",
            effectDescription: "You can gain αψ and βψ outside of the challenge",
            done() { return player.gamma.points.gte(20000) },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 7) || tmp.gamma.milestones[1000].unlocked },
        },

        // ignore
        1000: {
            requirementDescription: "Ignore",
            effectDescription: "Ignore",
            done() { return false },
            unlocked: false,
        },
    },
    effect() {
        return new Decimal(2).pow(player[this.layer].best).min(1024)
    },
    onPrestige() {
        player[this.layer].times += 1
    },
    doReset(layer) {
        let keep = []
        if (layer == this.layer) return
    },
})