let cards = [
  {
    id: 'pikemen',
    type: 'attack',
    title: '枪兵',
    description: '花费 1 <b>食物</b><br>造成 1 <b>伤害</b>',
    note: '把你的可有可无的人送去死吧!',
    play (player, opponent) {
      player.food -= 1
      opponent.health -= 1
    },
  },
  {
    id: 'catapult',
    type: 'attack',
    title: '弹弓',
    description: '花费2单位 <b>食物</b><br>造成 2单位 <b>伤害</b>',
    play (player, opponent) {
      player.food -= 2
      opponent.health -= 2
    },
  },
  {
    id: 'trebuchet',
    type: 'attack',
    title: '投石机',
    description: '花费 3 <b>食物</b><br>损失 1 <b>生命值</b><br>造成 4 <b>伤害</b>',
    note: ' &#171;这是人类创造的最好的机器! &#187;',
    play (player, opponent) {
      player.food -= 3
      player.health -= 1
      opponent.health -= 4
    },
  },
  {
    id: 'archers',
    type: 'attack',
    title: '弓兵',
    description: '花费 3 <b>食物</b><br>造成 3 <b>伤害</b>',
    note: '&#171;准备好你的弓!&#187;',
    play (player, opponent) {
      player.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'knighthood',
    type: 'attack',
    title: '骑士',
    description: '花费 7 <b>食物</b><br>造成 5 <b>伤害</b>',
    note: '骑士可能比他们的坐骑更广阔!',
    play (player, opponent) {
      player.food -= 7
      opponent.health -= 5
    },
  },
  {
    id: 'repair',
    type: 'support',
    title: '恢复',
    description: '恢复 5 <b>生命值</b><br>但下次跳过出牌回合',
    play (player, opponent) {
      player.skipTurn = true
      player.health += 5
    }
  },
  {
    id: 'quick-repair',
    type: 'support',
    title: '快速修复',
    description: '花费 3 <b>Food</b><br>恢复 3 <b>生命</b>',
    note: '这并非没有道德和精力上的后果！',
    play (player, opponent) {
      player.food -= 3
      player.health += 3
    }
  },
  {
    id: 'farm',
    type: 'support',
    title: '农场',
    description: '收集 5 <b>食物</b><br>但下次跳过出牌回合',
    note: '&#171;人们应该耐心地种庄稼。&#187;',
    play (player, opponent) {
      player.skipTurn = true
      player.food += 5
    },
  },
  {
    id: 'granary',
    type: 'support',
    title: '粮仓',
    description: '收集 2 <b>食物</b>',
    play (player, opponent) {
      player.food += 2
    }
  },
  {
    id: 'poison',
    type: 'special',
    title: '毒药',
    description: '花费 1 <b>食物</b><br>你的对手损失3 <b>食物</b>',
    note: '派一个你信任的人毒害敌人的粮仓.',
    play (player, opponent) {
      player.food -= 1
      opponent.food -= 3
    },
  },
  {
    id: 'fireball',
    type: 'special',
    title: '火球术',
    description: '自己损伤 3 <b>生命值</b><br>造成 5 <b>伤害</b><br>但下次跳过出牌回合',
    note: '&#171;魔术不适合孩子们。 你这个傻瓜!.&#187;',
    play (player, opponent) {
      player.health -= 3
      player.skipTurn = true
      opponent.health -= 5
    },
  },
  {
    id: 'chapel',
    type: 'special',
    title: 'Chapel',
    description: '挂机',
    note: '在教堂里祈祷，希望有人会听.',
    play (player, opponent) {
      // Nothing happens...
    },
  },
  {
    id: 'curse',
    type: 'special',
    title: '诅咒',
    description: '所有人:<br>损失 3 <b>单位食物</b><br>造成 3 <b>单位伤害</b>',
    play (player, opponent) {
      player.food -= 3
      player.health -= 3
      opponent.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'miracle',
    type: 'special',
    title: '奇迹',
    description: '所有人:<br>获得 3 <b>食物</b><br>恢复 3 <b>生命值</b>',
    play (player, opponent) {
      player.food += 3
      player.health += 3
      opponent.food += 3
      opponent.health += 3
    },
  },
]

cards = cards.reduce((map, card) => {
  card.description = card.description.replace(/\d+\s+<b>.*?<\/b>/gi, '<span class="effect">$&</span>')
  card.description = card.description.replace(/<b>(.*?)<\/b>/gi, (match, p1) => {
    const id = p1.toLowerCase()
    return `<b class="keyword ${id}">${p1} <img src="svg/${id}.svg"/></b>`
  })
  map[card.id] = card
  return map
}, {})

let pile = {
  pikemen: 4,
  catapult: 4,
  trebuchet: 3,
  archers: 3,
  knighthood: 3,
  'quick-repair': 4,
  granary: 4,
  repair: 3,
  farm: 3,
  poison: 2,
  fireball: 2,
  chapel: 2,
  curse: 1,
  miracle: 1,
}
