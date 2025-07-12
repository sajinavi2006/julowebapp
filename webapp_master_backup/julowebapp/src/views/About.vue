<template>
  <div class="about">
    <h1>This is an about page</h1>
    <j-btn color="primary" @click="currentImg++" style="margin-top:100px;">hahaha</j-btn>

    <transition tag="div" name="slide" class="img-slider" mode="out-in">
      <div v-for="number in [currentImg]" :key="number">
        <p>{{imgList[number % imgList.length]}}</p>
      </div>
    </transition>

    <div>
      <v-tabs v-model="active">
        <v-tab v-for="n in 3" :key="n" ripple style="display:none;"></v-tab>
        <v-tab-item v-for="n in 3" :key="n">
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <div class="text-xs-center mt-3">
        <v-btn @click="next">next tab</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// var browser = require("webextension-polyfill");
// console.log(browser);
// console.log(browser.bookmarks.search({}));
//const aaa = browser.bookmarks.search({});
//console.log(aaa);
// const BrowserHistory = require('node-browser-history');
// getAllHistory(10).then(function (history) {
//   console.log(history);
// });

// import browserBookmarks from 'browser-bookmarks';
// // retrieve bookmarks from Chrome (returns a Promise)
// browserBookmarks.getChrome().then(bookmarks => {
//   console.log(bookmarks);
// });

//SOAL UJIAN SEPARATING STUDENT
// function geser(data, v1, v2) {
//   let counter = 0;
//   for (let j = 1; j < data.length; j++) {
//     const i = j;
//     if (data[i] == v1 && data[i - 1] == v2) {
//       while (data[i] == v1 && data[i - 1] == v2) {
//         const temp = data[i - 1];
//         data[i - 1] = data[i];
//         data[i] = temp;
//         i--;
//         counter++;
//       }
//       j = i + 1;
//     }
//   }
//   return counter;
// }
// const data = [1, 0, 0, 1, 0, 1];
// let r1Count = geser(data, 1, 0);
// let r0Count = geser(data, 0, 1);
// console.log(r1Count, r0Count);

export default {
  data() {
    return {
      imgList: [
        "http://via.placeholder.com/350x150",
        "http://via.placeholder.com/350x151",
        "http://via.placeholder.com/350x152"
      ],
      currentImg: 0,
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    clickBtn: function() {
      console.log(44444444);
    },
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  }
};
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.5s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.img-slider {
  overflow: hidden;
  position: relative;
  height: 200px;
  width: 400px;
}

.img-slider p {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
