import {addons} from '@storybook/addons'
import {create} from '@storybook/theming'

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: false,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  theme: create({
    base: 'light',
    brandTitle: 'clubwoof 🐶',
    brandUrl: 'https://clubwoof.co.uk',
    brandImage: 'logo-small.png',
    fontBase: '"Open Sans", Futura, Avenir, Arial, SansSerif, sans-serif',
  }),
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: {hidden: false},
    zoom: {hidden: false},
    eject: {hidden: false},
    copy: {hidden: false},
    fullscreen: {hidden: false},
  },
})
