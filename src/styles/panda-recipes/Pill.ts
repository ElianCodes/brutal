import { defineRecipe } from '@pandacss/dev'
 
export const brutalPillRecipe = defineRecipe({
  className: 'brutal-pill',
  description: 'The styles for the Brutal Pill component',
  base: {
    filter: 'drop-shadow(7px 7px 0 rgb(0 0 0 / 1))',
    useSelect: 'none',
    backgroundColor: 'white',
    borderRadius: '9999px',
    border: '2px solid black',
    padding: '0.25rem 0.75rem',
    transition: 'all',
    transitionDuration: '0.5s',
    animation: 'ease-in-out',
    fontSize: 'small',
    _hover: {
      filter: 'drop-shadow(5px 5px 0 rgb(0 0 0 / 1))',
      backgroundColor: 'var(--color)'
    },
  },
})