<template lang="pug">
section.a-ogp-card
  .a-ogp-card__left
    .a-ogp-card__image(:style='styleImage')
  .a-ogp-card__right
    h2.a-ogp-card__title {{ ogp.title }}
    p.a-ogp-card__description {{ ogp.description }}
</template>

<script>
export default {
  name: 'AtomsOgpCard',
  props: {
    ogp: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    styleImage() {
      return { backgroundImage: `url("${this.ogp.image}")` }
    },
  },
}
</script>

<style lang="scss" scoped>
.a-ogp-card {
  display: flex;

  &__left {
    margin-right: 10px;
    flex-shrink: 0;
  }

  &__image {
    background-color: rgba(#bbb, 0.8);
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
  }

  &__title {
    color: #fff;
    display: -webkit-box;
    font-weight: bold;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__description {
    color: #fff;
    display: -webkit-box;
    font-size: 11px;
    margin-top: 5px;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>