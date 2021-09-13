export function clamp(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

export const remap = (val,a,b) => {
 //returns a to b -> 0 to 1 
 return (clamp(val,a,b) - a)/(b-a)
}