import wordlist from './words.js'

const w = wordlist;
const c = new TextDecoder("utf-8");
const d = Deno.readFileSync("./wordle/word");
w.splice(w.indexOf(c.decode(d).trim()), 1)
Deno.writeTextFileSync('./wordle/wordlist.json', JSON.stringify(wordlist));
Deno.writeTextFileSync('./wordle/word', w[Math.floor(Math.random() * wordlist.length)])
