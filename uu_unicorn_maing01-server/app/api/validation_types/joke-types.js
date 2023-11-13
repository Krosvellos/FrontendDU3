/* eslint-disable */
const jokeCreateDtoInType = shape({
  name: string(1, 255).isRequired(),
  text: string(1, 4000).isRequired(),
});
