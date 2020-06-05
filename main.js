new Vue({
			name: 'game',
			el: "#app",
			data: state,
			computed: {
				// testCard(){
				// 	return cards.archers;
				// }
			},
			created() {
				this.testHand = this.createHand();
				// console.log(this.testHand);
			},
			template: `
		<div id="#app"> 
			<top-bar :turn='this.turn' :current-player-index='this.currentPlayerIndex' :players='this.players'/>
			<transition name="hand">
				<hand :cards='this.testHand' v-if='!this.activeOverlay' @cardplay='testPlayCard'/>
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
