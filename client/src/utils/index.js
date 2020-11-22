export const removeInjection = (text) =>{
  return text.replace(/script|\/script/g, '');
}
