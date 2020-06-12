// 游戏场景
Vue.component('castle',{
	template:`
	<div class='castle' :class="'player-'+index">
		<img class='building' :src="'svg/castle'+index+'.svg'" />
		<img class='ground' :src="'svg/ground'+index+'.svg'" />
		<castle-banners :player='player' />
	</div>
	
	`,
	props:['player','index'],
})

Vue.component('castle-banners', {
  template: `<div class="banners">
    <!-- Food -->
    <img class="food-icon" src="svg/food-icon.svg" />
    <bubble type="food" :value="player.food" :ratio="foodRatio" />
    <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

    <!-- Health -->
    <img class="health-icon" src="svg/health-icon.svg" />
    <bubble type="health" :value="player.health" :ratio="healthRatio" />
    <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
  </div>`,
  props: ['player'],
	// 计算生命值和食物点比例
  computed: {
    foodRatio () {
      return this.player.food / maxFood
    },
    healthRatio () {
      return this.player.health / maxHealth
    },
  }
})

// 食物和生命值气泡
// 该组件包括一幅图像和一个文本,显示食物点数或生命值
// 数值减少气泡向上移动,数值增,气泡下移

Vue.component('bubble',{
	
})
