# @feinzer/v-dropdown

Simple and reusable select/dropdown component using VueJS Slots.

## Installation

``` sh
npm install @feinzer/v-dropdown
```
or
``` sh
yarn add @feinzer/v-dropdown
```

## Usage

``` js
import { Dropdown } from '@feinzer/v-dropdown';

export default {
  ...
  components: {
    Dropdown,
  },
  ...
  data() {
    return {
      selected: Object,
      options: [
        ...
      ]
    };
  },
  ...
};
```

``` html
<Dropdown
  v-slot="{ select }"
  v-model="selected"
>
  <div
    v-for="option in options"
    :key="option.key"
    @click="select(option)"
  >
    Option content
  </div>
</Dropdown>
```

## Props

### Dropdown
| Property                    | Type    | Default | Description                                                                                                                                                                                                                                                                           |
|:----------------------------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| placeholder            | String | empty | Text to show when no option is selected
| label            | String | empty | Key name of the selected object to show when an option is selected
| canSearch                | Boolean | false | Enables or disables the ability to search through the options.
| @search                | Event |  | Triggered whenever you input something in the search text input. Used to filter results.
