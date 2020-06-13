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
				this.testHand = this.createHand();
				// console.log(this.testHand);
			},
			mounted(){
				console.log(this.currentHand)
				beginGame();
			},
			template: `
		<div id="#app" :class='cssClass'> 
			<top-bar :turn='this.turn' :current-player-index='this.currentPlayerIndex' :players='this.players'/>
			<div class='world'>
				<div class="clouds">
					<cloud v-for='index in 10' :type='(index - 1) % 5 + 1' />
				</div>
				<castle v-for="(player,index) in this.players" :player='player' :index='index' />
				<div class='land' />
			</div>
			<transition name="hand">
				<hand :cards='this.currentHand' v-if='!this.activeOverlay' @cardplay='testPlayCard'/>
			</transition>
			
			<transition name="fade">
				<div class="overlay-background" v-if="activeOverlay" />
			</transition>			
			
			<transition name='zoom'>
				<overlay v-if='this.activeOverlay' :key='activeOverlay'>
					<!--<overlay-content-player-turn v-if="this.activeOverlay==='player-turn'" :player='currentPlayer'/>
					<overlay-content-last-play v-if="this.activeOverlay==='last-play'" :opponent='this.currentOpponent'/>
					<overlay-content-game-over v-if="this.activeOverlay==='game-over'" :players='players'/>-->
					<component :is="'overlay-content-'+activeOverlay" :player='currentPlayer' :opponent='currentOpponent'
						:players='players' />
				</overlay>
			</transition>

			
		</div>
	`,

			methods: {
				testPlayCard(card) {
					console.log('qifeifeifiefei');
					const index = this.testHand.indexOf(card);
					this.testHand.splice(index, 1)
				},
				handlePlay() {
					console.log('play card');
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

function beginGame(){
	state.players.forEach(drawInitialHand)
}