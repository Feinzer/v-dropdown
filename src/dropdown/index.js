import Dropdown from './Dropdown.vue';

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('v-dropdown', Dropdown);
}

export default { install };

export { Dropdown };
