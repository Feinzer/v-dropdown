<template>
  <div class="flex p-8 bg-blue-300">
    <Dropdown
      label="title"
      v-model="selectedValue"
      v-slot="{ select }"
      @search="(data) => (searchText = data)"
    >
      <p
        v-for="(value, index) in SearchResults"
        :key="index"
        class="flex px-6 py-3 cursor-pointer hover:bg-gray-100"
        @click="select(value)"
      >
        {{ value.title }}
      </p>
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from '@/dropdown/Dropdown.vue';

export default {
  name: 'App',
  components: {
    Dropdown,
  },
  data() {
    return {
      searchText: '',
      selectedValue: {},
      testValues: [
        {
          title: 'Option 1',
          value: 'test',
        },
        {
          title: 'Option 2',
          value: 'test',
        },
        {
          title: 'Option 3',
          value: 'test',
        },
        {
          title: 'Option 4',
          value: 'test',
        },
        {
          title: 'Option 5',
          value: 'test',
        },
        {
          title: 'Option 6',
          value: 'test',
        },
        {
          title: 'Option 7',
          value: 'test',
        },
        {
          title: 'Option 8',
          value: 'test',
        },
        {
          title: 'Option 9',
          value: 'test',
        },
        {
          title: 'Option 10',
          value: 'test',
        },
      ],
    };
  },
  computed: {
    SearchResults() {
      return this.testValues.filter((value) =>
        value.title.toLowerCase().includes(this.searchText.toLowerCase()),
      );
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
