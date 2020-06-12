// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  // World
  worldRatio: getWorldRatio(),
  // TODO Other things
	turn:1,
	players:[
		{name:'江流儿'},
		{name:'柯洁'},
	],
	// 随机出现01决定谁先行动
	currentPlayerIndex:	Math.round(Math.random()),
	testHand:[],
	activeOverlay:null,
	// 游戏开始状态
	food:10,
	health:10,
	// 是否跳过下个会和
	skipTurn:false,
	skippedTurn:false,
	hand:[],
	lasePlayerCardId:null,
	dead:false,
	get currentPlayer () {
		return state.players[state.currentPlayerIndex]
	},
	get currentOpponentId () {
		return state.currentPlayerIndex === 0 ? 1 : 0
	},
	get currentOpponent () {
		return state.players[state.currentOpponentId]
	},
}
