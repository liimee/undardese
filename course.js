const data = {
    basics1: [
    [
      'far fa-hand-point-down noun',
      'dhœ',
      'this (noun)'
    ],
    [
      'far fa-hand-point-right noun',
      'adhœ',
      'that (noun)'
    ],
    [
      'far fa-hand-point-down adj',
      'ndhe',
      'this (adj.)'
    ],
    [
      'far fa-hand-point-right adj',
      'andhe',
      'that (adj.)'
    ],
    [
      'far fa-thumbs-up',
      'seri',
      'okay'
    ]
  ],
    basics2: [
    [
      'fas fa-binoculars',
      'pār',
      'see'
    ],
    [
      'fas fa-utensils',
      'sāpd',
      'eat'
    ],
    [
      'fas fa-comment-alt',
      'sol',
      'say'
    ],
    [
      'fas fa-comment',
      'pēs',
      'speak'
    ],
    [
      'fas fa-wine-glass',
      'kudi',
      'drink'
    ]
  ],
    basics3: [
    [
      'fas fa-user singular',
      'nī',
      'you (sing.)'
    ],
    [
      'fas fa-user-circle',
      'nã',
      'me'
    ],
    [
      'fas fa-check',
      'ã',
      'yes'
    ],
    [
      'fas fa-times',
      'lle',
      'no'
    ],
    [
      'fas fa-expand-arrows-alt',
      'perye',
      'big'
    ],
    [
      'fas fa-compress-arrows-alt',
      'chinne',
      'small'
    ]
  ],
    sentences1: [
    [ //todo: split obnoxiously large tip into smaller sections?
      'word', 'fas fa-plus', '-õ', 'and, too, also', 'Use it after a word, like nī (you) -> nīõ (you too). This suffix makes nasal sounds (ã) become non-nasals followed by an ‘n’ (nã + õ = nānõ).'
    ],
    [
    	'sent', 'this and that', ['dhõ adhõ', 'dhõ adhœ', 'dhõ adh'], ['dh', 'adh', 'œ', 'õ'], 'The \'õ\' suffix removes any œ sound at the end of a word (dhœ + õ = dhõ). This applies to all suffixes starting with vowels'
    ],
    [
        'y/n', 'fas fa-plus', ['-ã', 'and, too, also'], false
    ],
    [
        'word', 'fas fa-dog', 'nāi/nāy', 'Dog'
    ],
    [
        'a/b', ['adhõ', 'nāyõ'], 2, 'fas fa-sun', 'The dog too'
    ],
    [
        'sent', 'nīõ andhe nāiõ', ['you and that dog'], ['dog', 'me', 'see', 'that', 'you', 'and']
    ],
    [
        'y/n', 'fas fa-binoculars', ['pār', 'see'], true
    ]
  ],
    sentences2: [
        [
            'word', 'fas fa-arrow-down', '-e', 'Object marker', 'Add it to the end of the whatever or whoever the verb of the sentence is performed on/to'
        ],
        [
            'a/b', ['kadi', 'sāpd'], 2, 'fas fa-utensils', 'Eat'
        ],
        [
            'sent', 'Look at this', ['dhe pār', 'dhe pārœ', 'pār dhe', 'pārœ dhe'], ['kudi','sāpd','dh','e','pār','œ','õ'], 'Undardese’s word order is Subject-Object-Verb, so the word with the -e suffix comes before the verb. Also the order isn’t all that strict.'
        ],
        [
            'sent', 'Eat it', ['adhe sāpd', 'dhe sāpd', 'sāpd adhe', 'sāpd dhe', 'adhe sāpdœ', 'dhe sāpdœ', 'sāpdœ adhe', 'sāpdœ dhe'], ['sāpād', 'œ', 'kūpd', 'sāpd', 'e', 'dh', 'adh'], 'Undardese doesn’t have a word for ‘it’ so you have to use ‘this’ or ‘that’'
        ],
        [
            'word', 'fas fa-clock', '-r', 'Simple present tense marker', 'Added after verbs. There has to be a suffix marking who/what is doing it after this'
        ],
        [
            'word', 'fas fa-user-circle', 'æ̃', 'First person singular marker', 'Added after a tense marker. So \'-ræ̃\' added after a verb means you are doing it, and it is happenning now.'
        ],
        [
            'a/b', ['sāpdræ̃', 'sāpdr', 'sāpdæ̃'], 1, 'fas fa-utensils', 'I eat'
        ],
        [
            'sent', 'I see it',
            [
                'nã adhe pārræ̃',
                'nã dhe pārræ̃'
            ],
            [
                'nī', 'dh', 'ed', 'pār', 'õ', 'æ̃',
                'nã', 'adh', 'r', 'e'
            ], 'Don\'t forget, Subject-Object-Verb. The subject here is you. Subject don\' have any suffixed'
        ]
    ],
    data: {
        _sections: 2,
        basics1: ['Basics 1', 'far fa-sun', 1],
        basics2: ['Basics 2', 'fas fa-walking', 1],
        basics3: ['Basics 3', 'fas fa-users', 1],
        sentences1: ['Sentences 1', 'fas fa-icons', 2, true],
        sentences2: ['Sentences 2', 'fas fa-binoculars', 2, true]
    }
}