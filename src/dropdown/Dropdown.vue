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
  <div
    ref="dropdownGroup"
    class="relative flex flex-col w-full rounded-lg bg-white shadow z-0"
  >
    <div ref="dropdownLabel" @click="onLabelClick" class="z-30">
      <div
        id="___dropdown-search"
        ref="dropdownSearch"
        v-if="canSearch"
        class="flex bg-white cursor-pointer"
      >
        <input
          ref="dropdownSearchInput"
          type="text"
          @input="(e) => onSearch(e.target.value)"
          class="outline-none min-w-0 w-full"
          :placeholder="Label"
          @blur="isOpen = false"
        />
        <SearchIcon />
      </div>
      <div
        v-else
        ref="dropdownDefaultLabel"
        id="___dropdown-label"
        class="flex bg-white cursor-pointer"
      >
        <p>{{ Label }}</p>
        <ChevronIcon
          class="transform transition-all duration-150"
          :class="isOpen && 'rotate-180'"
        />
      </div>
    </div>
    <transition name="___dropdown">
      <div
        v-if="isOpen"
        ref="dropdownBody"
        class="absolute w-full rounded-b-lg shadow bg-white z-10 overflow-hidden"
        :style="bodyStyle"
      >
        <div class="flex flex-col overflow-y-auto overflow-x-hidden max-h-60">
          <slot :select="onSelect" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.___dropdown_icon {
  width: 1.5rem;
  height: 1.5rem;
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
}
</style>
