<script>
import ChevronIcon from '@/icons/chevron.vue';
import SearchIcon from '@/icons/search.vue';

export default {
  name: 'Dropdown',
  components: {
    ChevronIcon,
    SearchIcon,
  },
  props: {
    value: {
      type: undefined,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    canSearch: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    Label() {
      if (this.value && this.label && this.value[this.label])
        return this.value[this.label];
      else return this.placeholder;
    },
    bodyMaxHeight() {
      const labelHeight = this.$refs.dropdownLabel.clientHeight;
      return {
        'max-height': labelHeight + 'px',
      };
    },
    bodyStyle() {
      const labelHeight = this.$refs.dropdownLabel.clientHeight;
      return {
        'margin-top': labelHeight * 0.9 + 'px',
        'padding-top': labelHeight * 0.1 + 'px',
      };
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleOpen(e) {
      const dropdownGroup = this.$refs.dropdownGroup;
      const dropdownLabel = this.$refs.dropdownLabel;

      const checkParent = (element) =>
        e.target.parentElement != element &&
        e.target.parentElement.parentElement != element;
      if (checkParent(dropdownGroup) && checkParent(dropdownLabel)) {
        this.isOpen = !this.isOpen;
      }
    },
    onLabelClick() {
      if (this.canSearch) this.$refs.dropdownSearchInput.focus();
      else this.$refs.dropdownLabel.focus();
      this.isOpen = !this.isOpen;
    },
    onSearch(search) {
      this.$emit('search', search);
    },
    onSelect(value) {
      this.$emit('input', value);
    },
  },
  watch: {
    isOpen: function (value) {
      if (value) document.body.addEventListener('click', this.toggleOpen);
      else document.body.removeEventListener('click', this.toggleOpen);
    },
  },
};
</script>

<template>
  <div id="___dropdown-group" ref="dropdownGroup">
    <div id="___dropdown-top" ref="dropdownLabel" @click="onLabelClick">
      <div id="___dropdown-search" ref="dropdownSearch" v-if="canSearch">
        <slot name="search-input" :onSearch="onSearch" :label="Label">
          <input
            id="___dropdown-search-input"
            ref="dropdownSearchInput"
            type="text"
            @input="(e) => onSearch(e.target.value)"
            :placeholder="Label"
            @blur="isOpen = false"
          />
        </slot>
        <SearchIcon />
      </div>
      <div v-else id="___dropdown-label" ref="dropdownDefaultLabel">
        <slot name="label" :label="Label">
          <p>{{ Label }}</p>
        </slot>
        <ChevronIcon
          id="___dropdown-chevron"
          :class="isOpen && '___dropdown-rotate-180'"
        />
      </div>
    </div>
    <transition name="___dropdown">
      <div
        v-if="isOpen"
        id="___dropdown-body"
        ref="dropdownBody"
        :style="bodyStyle"
      >
        <div id="___dropdown-body-inner">
          <slot :select="onSelect" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
#___dropdown-group {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

#___dropdown-top {
  z-index: 30;
}

#___dropdown-search-input {
  outline: 2px solid transparent;
  outline-offset: 2px;
  min-width: 0;
  width: 100%;
}

.___dropdown_icon {
  width: 1.5rem;
  height: 1.5rem;
}

#___dropdown-chevron {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.___dropdown-rotate-180 {
  transform: rotate(180deg);
}

#___dropdown-body {
  position: absolute;
  width: 100%;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: white;
  z-index: 10;
  overflow: hidden;
}

#___dropdown-body-inner {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 15rem;
}

.___dropdown-enter-active,
.___dropdown-leave-active {
  transition-property: all;
  transition-duration: 200ms;
}
.___dropdown-enter,
.___dropdown-leave-active {
  opacity: 0;
  transform: translateY(-2rem);
}

#___dropdown-label,
#___dropdown-search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  outline: none;
  background-color: white;
  cursor: pointer;
}
</style>
