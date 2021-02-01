<template>
  <component :is="type" v-bind="links(to)">
    <slot />
  </component>
</template>
<script>
import { isExternal } from "@/utils/validate";
export default {
  name: "Link",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return "a";
      }
      return "router-link";
    }
  },
  methods: {
    links(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener"
        };
      }
      return {
        to: to
      };
    }
  }
};
</script>
