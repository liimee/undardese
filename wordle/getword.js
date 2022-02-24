import wordlist from './words.js'

Deno.writeTextFileSync('./wordle/wordlist.json', JSON.stringify(wordlist));
Deno.writeTextFileSync('./wordle/word', wordlist[Math.floor(Math.random() * wordlist.length)])
