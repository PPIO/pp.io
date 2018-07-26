import tpl from './header.hbs'

/* eslint-disable no-undef */
export default () =>
  tpl({
    title: 'Title',
    des: 'this is a description',
    nav: {
      intro: 'Intro',
      main: 'Main',
      team: 'Team',
      support: 'Support',
      partner: 'Partner',
    },
  })
/* eslint-enable */
