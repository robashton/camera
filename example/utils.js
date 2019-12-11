const findRequestAnimationFrame = () => {
  const fallback = callback => setTimeout(callback, 1000 / 30);
  return (requestAnimationFrame || fallback).bind(window);
};

export {
  findRequestAnimationFrame
};
