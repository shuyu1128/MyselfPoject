<template>
  <!-- 建筑缩率图 -->
  <div class="build_thumbnails">
    <div :class="choiceClass(buildThumbnailsItem.length)">
      <div
        v-for="item in buildThumbnailsItem"
        :key="item"
        class="build_thumbnails_item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buildThumbnailsItem: [1, 2, 3],
    };
  },
  methods: {
    choiceClass(num) {
      if (num === 1) {
        return "build_thumbnails_one";
      } else if (num === 2) {
        return "build_thumbnails_Two";
      } else if (num === 3) {
        return "build_thumbnails_Three";
      } else if (num === 4) {
        return "build_thumbnails_Four";
      } else if (num === 5) {
        return "build_thumbnails_Five";
      } else if (num === 0) {
        return "";
      } else {
        return "build_thumbnails_six";
      }
    },
  },
};
</script>

<style scoped>
.build_thumbnails {
  height: 100%;
}
.build_thumbnails_one {
}
.build_thumbnails_Two {
}
.build_thumbnails_Three {
}
.build_thumbnails_Four {
}
.build_thumbnails_Five {
}
.build_thumbnails_six {
}
</style>