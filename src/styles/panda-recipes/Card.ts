import { defineRecipe } from '@pandacss/dev'
 
export const brutalCardRecipe = defineRecipe({
  className: 'brutal-card',
  description: 'The styles for the Brutal Card component',
  base: {
    backgroundColor: 'var(--color)',
    borderRadius: '0.5rem',
    border: '3px solid black',
    filter: 'drop-shadow(7px 7px 0 rgb(0 0 0 / 1))',
    transition: 'all',
    padding: '1rem',
    transitionDuration: '0.5s',
    animation: 'ease-in-out',
    _hover: {
      filter: 'drop-shadow(5px 5px 0 rgb(0 0 0 / 1))',
    },
  },
})