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
                ["challenges", [1]],
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
            style: { "width": "200px" },
        },
        21: {
            name: "Alpha II",
            completionLimit: 5,
            canComplete() { return player.points.gte(this.goal()) },
            fullDisplay() {
                return `
                Completions: ${challengeCompletions(this.layer, this.id)}/${this.completionLimit}<br><br>
                Square root ω gain<br><br>
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
    },
    alphaGain() {
        let base = challengeEffect(this.layer, 11)
        base = base.mul(challengeEffect(this.layer, 21))
        return base
    },
    update(delta) {
        player[this.layer].points = player[this.layer].points.add(tmp[this.layer].alphaGain.mul(delta))
    },
    effect() {
        return player[this.layer].points.max(1).log(3).add(1)
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
        "α": {
            embedLayer: "alpha",
            buttonStyle: { "border": "2px solid #ffffff", "border-radius": "1px" },
        },
    },
    doReset() {},
})

addLayer("a", {
    color: "#000000",
    tabFormat: [
        ["display-text", ":O"],
    ],
    doReset() {},
})
