<template>
  <div id="app">
    <transition name="main" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
html,
body,
#app,
.layout {
  height: 100%;
}
@font-face {
  font-family: NotoSansHans-Medium;
  src: url(./font/NotoSansHans-Medium.otf);
}
* {
  font-family: NotoSansHans-Medium;
}
.main-enter,
.main-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  position: absolute;
  transition: all 0.3s;
}
</style>
