export const normalize = (
number,
currentScaleMin,
currentScaleMax,
newScaleMin = 0,
newScaleMax = 1
) => {
// First, normalize the value between 0 and 1.
const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

// Next, transpose that value to our desired scale.
return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
);
};

export const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;

export const convertPolarToCartesian = (angle, distance) => {
const angleInRadians = convertDegreesToRadians(angle);
const x = Math.cos(angleInRadians) * distance;
const y = Math.sin(angleInRadians) * distance;

return [x, y];
};

export const clamp = (
value,
min = 0,
max = 1
) => {
if (min > max) {
    [min, max] = [max, min];
}

return Math.max(min, Math.min(max, value));
};

export const clampedNormalize = (
    value,
    currentScaleMin,
    currentScaleMax,
    newScaleMin = 0,
    newScaleMax = 1
  ) => {
    return clamp(
      normalize(
        value,
        currentScaleMin,
        currentScaleMax,
        newScaleMin,
        newScaleMax
      ),
      newScaleMin,
      newScaleMax
    );
  };

  export const exponentialNormalize = (
    value,
    currentScaleMin,
    currentScaleMax,
    newScaleMin = 0,
    newScaleMax = 1,
    exponent = 2
  ) => {
    const normalizedInput =
      (value - currentScaleMin) / (currentScaleMax - currentScaleMin);
  
    const exponentialOutput = Math.pow(normalizedInput, exponent);
  
    return (
      newScaleMin + (newScaleMax - newScaleMin) * exponentialOutput
    );
  };