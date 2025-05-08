// random num inclusive
export function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// print a character or string repeated n times nl is newline option
export function sym(s, n, nl = false) {
  let output = '';
  for (let i = 0; i < n; i++){
      output += s;
  }
  if (nl) output += '\n';
  return output;
}
export function txt(text, char = ' ', SIZE) {
  let output = ' ';
  const x = (SIZE * 2 - text.length) / 2;
  let y = null;
  if (x % 1) y = x - 1;
  
  
  output += sym(char, x);
  output += text;
  output += sym(char, y || x);
  
  output += '\n';
  return output;
}
