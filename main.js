new Vue({
			name: 'game',
			el: "#app",
			data: state,
			computed: {
				// testCard(){
				// 	return cards.archers;
				// }
				cssClass(){
					return {
						'can-play':this.canPlay
					}
				}
			},
			created() {
				console.log(this.players);
				this.testHand = this.createHand();
				// console.log(this.testHand);
			},
			mounted(){
				//console.log(this.currentHand)
				beginGame();
			},
			template: `
		<div id="#app" :class='cssClass'> 
			<top-bar :turn='this.turn' :current-player-index='this.currentPlayerIndex' :players='this.players'/>
			<div class='show-rule'>
				<button @click='showRule'>规则</button>
				<rule v-show='this.rule'/>
			</div>
			<div class='world'>
				<div class="clouds">
					<cloud v-for='index in 10' :type='(index - 1) % 5 + 1' />
				</div>
				<castle v-for="(player,index) in this.players" :player='player' :index='index' />
				<div class='land' />
			</div>
			<transition name="hand">
				<hand :cards='this.currentHand' v-if='!this.activeOverlay' @cardplay='handlePlayCard' @card-leave-end='handCardLeaveEnd'/>
			</transition>
			
			<transition name="fade">
				<div class="overlay-background" v-if="activeOverlay" />
			</transition>			
			
			<transition name='zoom'>
				<overlay v-if='this.activeOverlay' :key='activeOverlay' @close='handleOverlayClose'>
					<!--<overlay-content-player-turn v-if="this.activeOverlay==='player-turn'" :player='currentPlayer'/>
					<overlay-content-last-play v-if="this.activeOverlay==='last-play'" :opponent='this.currentOpponent'/>
					<overlay-content-game-over v-if="this.activeOverlay==='game-over'" :players='players'/>-->
					<component :is="'overlay-content-'+activeOverlay" :player='currentPlayer' :opponent='currentOpponent':players='this.players' />
				</overlay>
			</transition>

			
		</div>
	`,

			methods: {
				// testPlayCard(card) {
				// 	console.log('qifeifeifiefei');
				// 	const index = this.testHand.indexOf(card);
				// 	this.testHand.splice(index, 1)
				// },
				showRule(){
					this.rule = !this.rule;
				},
				handleOverlayClose(){
					console.log(1);
					overlayCloseHandlers[this.activeOverlay]();
				},
				handCardLeaveEnd(){
					 applyCard();
				},
				handlePlayCard(card) {
					console.log('play card');
					playCard(card);
				},
				randCardsSelect() {
					const ids = Object.keys(cards);
					const randomId = ids[Math.floor(Math.random() * ids.length)];

					return {
						uid: cardUid++,
						id: randomId,
						def: cards[randomId],
					}
				},
				createHand() {
					const cards = [];
					//const ids = Object.keys(cards);
					for (let i = 0; i < 5; i++) {
						cards.push(this.randCardsSelect())

					}
					return cards;
				},
			}
		})
		
		
// Tween.js
requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

// 游戏逻辑
state.activeOverlay = 'player-turn'
function beginGame(){
	//console.log(state.players[0]);
	state.players.forEach(drawInitialHand)
}

function playCard(card){
	if(state.canPlay){
		console.log('777');
		state.canPlay = false;
		currentPlayingCard = card;
		
		// 移除手牌
		const index = state.currentPlayer.hand.indexOf(card);
		state.currentPlayer.hand.splice(index,1);
		addCardToPile(state.discardPile,card.id);
	}
}

function applyCard(){
	const card = currentPlayingCard;
	applyCardEffect(card);
	setTimeout(() => {
	    // Check if the players are dead
	    state.players.forEach(checkPlayerLost)
	
	    if (isOnePlayerDead()) {
	      endGame()
	    } else {
	      nextTurn()
	    }
	  }, 700)
}
function nextTurn () {
  state.turn ++
  state.currentPlayerIndex = state.currentOpponentId
  state.activeOverlay = 'player-turn'
}
function newTurn(){
  state.activeOverlay = null
  if (state.currentPlayer.skipTurn) {
    skipTurn()
  } else {
    startTurn()
  }
}

function skipTurn(){
	state.currentPlayer.skippedTurn = true;
	state.currentPlayer.skipTurn = false;
	nextTurn();
}

function startTurn () {
  state.currentPlayer.skippedTurn = false
  if (state.turn > 2) {
    // Draw new card
    setTimeout(() => {
      state.currentPlayer.hand.push(drawCard())
      state.canPlay = true
    }, 800)
  } else {
    state.canPlay = true
  }
}

var overlayCloseHandlers = {
  'player-turn' () {
    if (state.turn > 1) {
      state.activeOverlay = 'last-play'
    } else {
      newTurn()
    }
  },

  'last-play' () {
    newTurn()
  },

  'game-over' () {
    document.location.reload()
  },
}
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

function endGame () {
  state.activeOverlay = 'game-over'
}