<template>
  <div class="station_content">
    <div>
      <p></p>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.station_content {
  position: absolute;
}
.station_content div {
  background: #009fd9;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
}
.station_content p {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: myfirst 5s infinite;
  box-shadow: 0px 0px 1px #009fd9;
}
.station_content span {
  position: absolute;
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: myfirst 5s infinite;
  box-shadow: 0px 0px 1px #009fd9;
  animation-delay: 0.5s;
}
@keyframes myfirst {
  20% {
    transform: scale(2);
  }
  40% {
    transform: scale(3);
  }
  60% {
    transform: scale(4);
  }
}
</style>