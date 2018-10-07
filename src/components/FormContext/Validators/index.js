export default {
  required: requiredValidator,
  maxLength: maxLengthValidator,
  minLength: minLengthValidator,
};

function requiredValidator(required) {
  return value => required ? value : true;
}

function maxLengthValidator(maxLength) {
  return value => `${value}`.length < maxLength;
}

function minLengthValidator(minLength) {
  return value => `${value}`.length >= minLength;
}
