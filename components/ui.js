Vue.component('top-bar',{
	// mounted(){
	// 	console.log(turn);
	// },
	template:`<div class='top-bar' :class="'player-'+currentPlayerIndex">
							
							<div class='player p0'>{{players[0].name}}</div>
							<div class='turn-counter'>
								<img class='arrow' src='svg/turn.svg' />
								<div class='turn'>回合{{turn}}</div>
							</div>
							<div class='player p1'>{{players[1].name}}</div>
						</div>
	`,
	props:['players','currentPlayerIndex','turn'],
})
Vue.component('rule',{
	template:`<div class='rule'>
		<span>双方有10点生命,10份食物和5张手牌</span>
		<span>双方每回合仅能出一张牌</span>
		<span>当玩家的食物或生命为0时,判为失败</span>
	</div>
	`
})
Vue.component('card',{
	props:['def'],
	template:`<div class='card' :class="'type-'+def.type" @click="play">
		<div class="title">{{def.title}}</div>
		<img class='separator' src='svg/card-separator.svg' />
		<div class='description'>
			<div v-html='def.description'></div>
		</div>
		<div class='note' v-if='def.note'>
			<div v-html='def.note'></div>
		</div>
	</div>`,
	methods:{
		play(){
			this.$emit('play');
		}
	}
})


Vue.component('hand',{
	props:['cards'],
	template:`<div class='hand'>
			
				<transition-group name='card' tag='div' class='cards' @after-leave='handleLeaveTransitionEnd'>
					<card v-for='card of cards' :key='card.uid' :def='card.def' @play="handlePlay(card)"/>
				</transition-group>
			
	</div>`	,
	methods:{
		handlePlay(card){
			this.$emit('cardplay',card);
		},
		handleLeaveTransitionEnd(){
			this.$emit('card-leave-end');
		}
	}
})

// 浮层
Vue.component('overlay',{
	template:`<div class="overlay" @click="handleClicks">
							<div class='content'>
								<slot />
							</div>
						</div>
						`,
	methods:{
		handleClicks(){
			this.$emit('close');
		}
	}
})
//根据是否跳过回合,向当前玩家显示两条不同的信息
Vue.component('overlay-content-player-turn',{
	template:`<div>
							<div class='big' v-if='player.skipTurn'>
								{{player.name}},<br>你的回合跳过!
							</div>
							<div class='big' v-else>
								{{player.name}},<br>轮到你的回合了!
							</div>
							<div>Tap to continue </div>
						</div>
						`,
	props:['player'],
})

Vue.component('overlay-content-last-play',{
	template:`<div>
							<div v-if='opponent.skippedTurn'>
								{{opponent.name}}回合跳过
							</div>
							<template v-else>
								<div>{{opponent.name}}出牌</div>
								<card :def='lastPlayedCard'/>
							</template>
						</div>
						`,
	props:['opponent'],
	computed:{	
		lastPlayedCard(){
			return getLastPlayedCard(this.opponent)
		}
	},
})


Vue.component('player-result',{
	template:`<div class='player-result' :class='result'>
							<span class='name'>{{player.name }}</span>是
							<span class='result'>{{result}}</span>
						</div>
						`,
	props:['player'],
	computed:{	
		result(){
			return this.player.dead ? '败者':'胜者'
		}
	},
})

Vue.component('overlay-content-game-over',{
	template:`<div>
							<div class='big'>游戏结束</div>
							<player-result v-for='player in players' :player='player' :key='player.name' />
						</div>
						`,
	props:['players'],
})