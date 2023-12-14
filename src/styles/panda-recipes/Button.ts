import { defineRecipe } from '@pandacss/dev'

export const brutalButtonRecipe = defineRecipe({
  className: 'brutal-button',
  description: 'The styles for the Brutal Button component',
  base: {
    filter: 'drop-shadow(5px 5px 0 rgb(0 0 0 / 1))',
    backgroundColor: 'white',
    display: 'inline-block',
    paddingY: '8px',
    paddingX: '16px',
    border: '2px solid black',
    transition: 'all',
    transitionDuration: '0.5s',
    animation: 'ease-in-out',
    fontFamily: 'sanchez',
    _hover: {
      filter: 'drop-shadow(3px 3px 0 rgb(0 0 0 / 1))',
      backgroundColor: 'var(--color)'
    }
  },
})
