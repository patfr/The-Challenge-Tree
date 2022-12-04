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
    prestigeButtonText() { return player.alpha.points.gte(tmp[this.layer].requires) ? `Reset for ${formatWhole(tmp[this.layer].directMult)} β` : "Requires: 1e1421 α" },
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

        mult = mult.mul(tmp.gamma.effect)

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
                    let auto = false
                    if (hasMilestone("gamma", 3) && (id == "11" || id == "12" || id == "13") && canCompleteChallengeOutside(this.layer, id)) auto = true
                    if (hasMilestone("gamma", 4) && (id == "21" || id == "22" || id == "23") && canCompleteChallengeOutside(this.layer, id)) auto = true
                    if (hasMilestone("gamma", 5) && (id == "31" || id == "32" || id == "33") && canCompleteChallengeOutside(this.layer, id)) auto = true
                    if (canCompleteChallenge(this.layer, id) && id.toString() !== "41") auto = true
                    if (auto) {
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
                "blank",
                ["challenges", [1,2,3]],
                ["blank", "25px"],
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
            unlocked() { return hasMilestone("beta", 7) || player.gamma.unlocked },
            shouldNotify() {
                return (canAffordUpgrade("beta", 11) && !hasUpgrade("beta", 11)) ||
                    (canAffordUpgrade("beta", 12) && !hasUpgrade("beta", 12)) ||
                    (canAffordUpgrade("beta", 13) && !hasUpgrade("beta", 13)) ||
                    (canAffordUpgrade("beta", 14) && !hasUpgrade("beta", 14)) ||
                    (canAffordUpgrade("beta", 15) && !hasUpgrade("beta", 15))
            },
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
            unlocked() { return hasMilestone(this.layer, 7) || tmp.beta.challenges[12].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 11) >= 5 || tmp.beta.challenges[13].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 11) >= 9 || tmp.beta.challenges[21].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 11) >= 18 || tmp.beta.challenges[22].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 21) >= 3 || tmp.beta.challenges[23].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 21) >= 6 || tmp.beta.challenges[31].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 11) >= 55 || tmp.beta.challenges[32].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                if (tmp.beta.challenges[41].unlocked) style["border-radius"] = "0 0 0 8px"
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 31) >= 2 || tmp.beta.challenges[33].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return challengeCompletions(this.layer, 31) >= 3 || tmp.beta.challenges[41].unlocked },
            style() {
                const style = componentBorderRadius(this.layer, "challenges", this.id, 8, 3)
                style.width = "225px"
                style.height = "225px"
                return style
            }
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
            unlocked() { return hasUpgrade(this.layer, 14) || maxedChallenge(this.layer, this.id) },
            style: { "width": "687px", "height": "225px", "border-radius": "8px" },
        },
    },
    upgrades: {
        11: {
            title: "β I",
            description: "You can automatically complete challenges while in them",
            cost: new Decimal(1e22),
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        12: {
            title: "β II",
            description: "ω and α boosts β gain",
            effect() { return player.points.max(1).log10().mul(player.alpha.points.max(1).log10()).pow(7).max(1) },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: new Decimal(1e217),
            unlocked() { return hasUpgrade(this.layer, 11) || tmp.beta.upgrades[13].unlocked || player.gamma.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        13: {
            title: "β III",
            description: "Beta IV, V and VI multiplies β",
            cost: new Decimal("1e347"),
            unlocked() { return hasUpgrade(this.layer, 12) || tmp.beta.upgrades[14].unlocked || player.gamma.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        14: {
            title: "β IV",
            description: "Unlock another challenge",
            cost: new Decimal("5e3344"),
            unlocked() { return hasUpgrade(this.layer, 13) || tmp.beta.upgrades[15].unlocked || player.gamma.unlocked },
            style() { return componentBorderRadius(this.layer, "upgrades", this.id, 8) }
        },
        15: {
            title: "β V",
            description: "Unlock a layer",
            cost: new Decimal("5e3378"),
            unlocked() { return hasUpgrade(this.layer, 14) || tmp.beta.upgrades[1001].unlocked || player.gamma.unlocked },
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
            requirementDescription: "1 Beta reset (1)",
            effectDescription: "Keep one Alpha milestone on reset",
            done() { return player[this.layer].times >= 1 },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        1: {
            requirementDescription: "2 Beta resets (2)",
            effectDescription: "Keep one Alpha upgrade for every 2 Beta resets on reset",
            done() { return player[this.layer].times >= 2 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 0) || tmp.beta.milestones[2].unlocked || player.gamma.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        2: {
            requirementDescription: "3 Beta resets (3)",
            effectDescription: "Keep one Alpha milestone on reset",
            done() { return player[this.layer].times >= 3 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 1) || tmp.beta.milestones[3].unlocked || player.gamma.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        3: {
            requirementDescription: "5 Beta resets (4)",
            effectDescription: "Keep one Alpha milestone and keep one Alpha II completion per reset on reset",
            done() { return player[this.layer].times >= 5 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 2) || tmp.beta.milestones[4].unlocked || player.gamma.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        4: {
            requirementDescription: "7 Beta resets (5)",
            effectDescription: "Keep two Alpha milestones and keep Alpha IV completion on reset",
            done() { return player[this.layer].times >= 7 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 3) || tmp.beta.milestones[5].unlocked || player.gamma.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        5: {
            requirementDescription: "11 Beta resets (6)",
            effectDescription: "Keep one Alpha milestone and keep Alpha V completion on reset",
            done() { return player[this.layer].times >= 11 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 4) || tmp.beta.milestones[6].unlocked || player.gamma.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        6: {
            requirementDescription: "15 Beta resets (7)",
            effectDescription: "Keep two Alpha milestones on reset",
            done() { return player[this.layer].times >= 15 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 5) || tmp.beta.milestones[7].unlocked || player.gamma.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        7: {
            requirementDescription: "20 Beta resets (8)",
            effectDescription: "Unlock upgrades and gain 100% of your β per second and a reset per second<br>but you can no longer reset, Beta no longer resets anything. Unlock challenges",
            done() { return player[this.layer].times >= 20 },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 6) || tmp.beta.milestones[8].unlocked || player.gamma.unlocked },
            style() { return milestoneBorderRadius(this.layer, this.id, 8) },
        },
        8: {
            requirementDescription: "Finish Beta I-IX (9)",
            effectDescription: "Add 1 to Beta I, II and III bases",
            done() {
                return maxedChallenge(this.layer, 11) && maxedChallenge(this.layer, 12) && maxedChallenge(this.layer, 13) &&
                    maxedChallenge(this.layer, 21) && maxedChallenge(this.layer, 22) && maxedChallenge(this.layer, 23) &&
                    maxedChallenge(this.layer, 31) && maxedChallenge(this.layer, 32) && maxedChallenge(this.layer, 33)
            },
            unlocked() { return hasMilestone(this.layer, this.id) || hasMilestone(this.layer, 7) || tmp.beta.milestones[1000].unlocked || player.gamma.unlocked },
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
    effect() {
        return player[this.layer].best.add(1).pow(2).max(1)
    },
    onPrestige() {
        let resets = 1
        if (hasMilestone("gamma", 1)) resets = 2
        player[this.layer].times += resets
    },
    doReset(layer) {
        let keep = []
        if (layer == this.layer) return
        if (layer == "gamma") {
            let resetKeep = 0
            let bestKeep = 0
            let upgradeKeep = 0
            if (hasMilestone("gamma", 0)) { 
                resetKeep = player.gamma.times
                bestKeep = player.gamma.times
            }
            if (hasMilestone("gamma", 2)) resetKeep *= 2
            if (hasMilestone("gamma", 0)) upgradeKeep = 1
            if (hasMilestone("gamma", 4)) upgradeKeep = 2
            if (hasMilestone("gamma", 5)) upgradeKeep = 3
            if (hasMilestone("gamma", 6)) upgradeKeep = 5

            keep.push("times")
            keep.push("best")
            keep.push("upgrades")
            if (hasMilestone("gamma", 7)) keep.push("milestones")
            layerDataReset(this.layer, keep)

            if (hasMilestone("gamma", 3)) player[this.layer].challenges[41] = 1
            player[this.layer].upgrades = player[this.layer].upgrades.slice(0, upgradeKeep)
            player[this.layer].times = Math.min(player[this.layer].times, resetKeep)
            player[this.layer].best = player[this.layer].best.min(bestKeep)
        }
        updateMilestones(this.layer)
    },
})