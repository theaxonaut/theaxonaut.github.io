/* ═══════════════════════════════════════════════════════════════
   data.js — Single Source of Truth
   Edit THIS file to update all content across all pages.
═══════════════════════════════════════════════════════════════ */

var SITE = {

  /* ── GLOBAL ─────────────────────────────────────────────── */
  global: {
    siteName:   'Rashid®',
    siteTitle:  'Rashid — Aspiring Neuroscientist',
    favicon:    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='12' fill='%230d0c0b'/><text y='.92em' font-size='85' font-family='Georgia,serif' font-weight='700' fill='%23f0ebe3' x='12'>R</text></svg>",
    location:   'New Delhi, India',
    footerCopy: 'Rashid® — BSc Biotechnology · Jamia Hamdard · ©2026',

    email: {
      p1: 'zbp.yvnzabgbec@',
      p2: 'orj-qvufne'
    },

    social: [
      { label: 'GitHub',    url: 'https://github.com/theaxonaut/GSE33000-AD-analysis' },
      { label: 'X',         url: 'https://x.com/ztgc_rashid' },
      { label: 'LinkedIn',  url: 'https://linkedin.com/in/rashid-lab' },
      { label: 'Instagram', url: 'https://instagram.com/sliceof.my.life' }
    ]
  },


  /* ── NAV LINKS ──────────────────────────────────────────── */
  /*  id    → matches section id (used for anchor links)
      label → display text
      page  → which HTML file this section lives on             */
  nav: [
    { id: 'about',        label: 'About',        page: 'index.html' },
    { id: 'work',         label: 'Work',          page: 'index.html' },
    { id: 'publications', label: 'Publications',  page: 'index.html' },
    { id: 'experience',   label: 'Experience',    page: 'index.html' },
    { id: 'contact',      label: 'Contact',       page: 'index.html' }
  ],


  /* ── SECTIONS CONFIG ────────────────────────────────────── */
  sections: {
    order: ['hero', 'about', 'work', 'publications', 'experience', 'contact'],

    visibility: {
      hero:         true,
      about:        true,
      work:         true,
      publications: false,
      experience:   true,
      contact:      true
    }
  },


  /* ── PRELOADER ──────────────────────────────────────────── */
  preloader: {
    logoText:    'theaxonaut',
    subtitle:    'Aspiring Neuroscientist',
    duration:    2800
  },


  /* ── HERO ───────────────────────────────────────────────── */
  hero: {
    eyebrow:     'BSc Biotechnology · Jamia Hamdard · New Delhi · Ini. 2023',
    name:        'RASHID',
    description: 'Aspiring <strong>neuroscientist</strong> working at the intersection of molecular biology, computation &amp; <strong>neurodegenerative disease</strong>.',
    scrollText:  'Scroll'
  },


  /* ── ABOUT ──────────────────────────────────────────────── */
  about: {
    bio: [
      'A <strong>first-principles thinker</strong> pursuing a BSc in Biotechnology at Jamia Hamdard University, New Delhi. Experienced in both wet lab and computational biology, with a focused interest in <strong>neurodegenerative diseases</strong> — particularly Alzheimer\'s.',
      'Research internships at <strong>AIIMS Delhi</strong> and Jamia Hamdard, and independently performed computational gene expression analysis on post-mortem brain microarray data. Currently founding a university science magazine. Aiming for a <strong>Master\'s in Neuroscience</strong>, followed by a PhD.',
      'Target: <strong>DZNE — German Center for Neurodegenerative Diseases</strong>.'
    ],

    stats: [
      { value: '8.37',  label: 'CGPA' },
      { value: '3rd',   label: 'Year · 2027' },
      { value: '2+',    label: 'Internships' },
      { value: '92%',   label: 'Class XII · CBSE' }
    ],

    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Hindi',   level: 'Native' },
      { name: 'Bengali', level: 'Native' },
      { name: 'German',  level: 'Learning' },
      { name: 'Czech',   level: 'Learning'}
    ]
  },


  /* ── PROJECTS ───────────────────────────────────────────── */
  projects: [
    {
      title:       'Computational Gene Expression Analysis<br>in Alzheimer\'s Disease',
      category:    'Research · Bioinformatics',
      year:        '2026',
      description: 'Analysed 467 post-mortem brain samples (310 AD, 157 controls) from NCBI GEO. Identified differentially expressed genes and affected biological pathways using R, limma, and clusterProfiler.',
      link:        'https://github.com/theaxonaut/GSE33000-AD-analysis',
      linkLabel:   'View on GitHub ↗',
      visualType:  'full',
      image:       'brain_image.jpg',
      imageAlt:    'Brain gene expression analysis',
      watermark:   'GSE33000'
    },
    {
      title:       'BioEdge — University Science Magazine',
      category:    'Communication · Founder',
      year:        '2024–',
      description: 'Founded BioEdge at Jamia Hamdard — the university\'s first student science magazine. Secured all institutional approvals, assembled a team, and contributed the inaugural article on NNC2215.',
      link:        'https://bioedge.framer.website/',
      linkLabel:   'In Progress ↗',
      visualType:  'half',
      image:       'bioedge.png',
      imageAlt:    'BioEdge University Science Magazine'
    },
    {
      title:       'Ongoing Research',
      category:    'Research',
      year:        '2026',
      description: 'New research currently underway. Details will be published upon completion.',
      link:        null,
      linkLabel:   'Coming Soon',
      visualType:  'placeholder'
    }
  ],


  /* ── PUBLICATIONS ───────────────────────────────────────── */
  /*  Add objects here when you publish.
      Empty array → "Coming Soon" state renders automatically.

      Fields:
        title        — paper title
        authors      — array of author names
        journal      — journal / preprint server name
        volume       — optional (e.g. "Vol 12, Issue 3")
        pages        — optional (e.g. "pp. 142–158")
        year         — number
        doi          — DOI URL (primary click target)
        link         — fallback URL if no DOI
        abstract     — brief summary
        badge        — category tag (e.g. "Neuroscience")
        previewImage — image path for hover follower
        status       — "published" | "preprint" | "in-review"
  */
  publications: [
    /*
    {
      title:        'Example Paper Title',
      authors:      ['Rashid', 'Co-Author A', 'Supervisor B'],
      journal:      'Nature Neuroscience',
      volume:       'Vol 12, Issue 3',
      pages:        'pp. 142–158',
      year:         2026,
      doi:          'https://doi.org/10.xxxx/example',
      link:         null,
      abstract:     'Brief abstract of what was studied, found, and why it matters.',
      badge:        'Neuroscience',
      previewImage: 'paper1_preview.jpg',
      status:       'published'
    }
    */
  ],

  publicationsNote: 'Currently an undergraduate researcher. Manuscripts in preparation. Preprints and peer-reviewed articles will appear here upon submission.',


  /* ── EXPERIENCES ────────────────────────────────────────── */
  experiences: [
    {
      title:       'Research Intern — Biochemistry Lab',
      org:         'AIIMS Delhi',
      description: 'RNA isolation, plasmid isolation, E. coli culture, gel electrophoresis, nucleic acid quantification via NanoDrop. Autoclave operation, media preparation, centrifugation at 12,000 rpm.',
      badge:       'Wet Lab'
    },
    {
      title:       'Research Intern — Botany Lab',
      org:         'Jamia Hamdard University',
      description: 'Grew plants under controlled conditions; investigated germination rate variability. Authored a project report approved by HoD and PI; defended findings under questioning.',
      badge:       'Plant Biology'
    },
    {
      title:       'Volunteer — Science Communication',
      org:         'Next Generation Scientist Foundation',
      description: 'Created scientific posters, hosted events, managed outreach on X. Grew the organisation\'s following by over 3× to 10,000+ followers.',
      badge:       'Outreach'
    },
    {
      title:       'Digital Communications & Operations Coordinator',
      org:         'German Bharatham',
      description: 'Built and managed website, developed Google Forms and Scripts for automation, organized community groups, and handled email communications with new volunteers.',
      badge:       'Operations'
    },
    {
      title:       'Joint Secretary',
      org:         'Unnat Bharat Abhiyan — Jamia Hamdard',
      description: 'Leadership role in a national initiative promoting community development and rural engagement through science and technology.',
      badge:       'Leadership'
    },
    {
      title:       'Social Media Manager',
      org:         'Ignite Community — Jamia Hamdard',
      description: 'Managed the student society\'s digital presence and communications strategy.',
      badge:       'Media'
    },
    {
      title:       'Content Writer',
      org:         'Epoch Society — Jamia Hamdard',
      description: 'Contributed written content for the student publication covering science and campus topics.',
      badge:       'Writing'
    }
  ],


  /* ── SKILLS ─────────────────────────────────────────────── */
  skills: {
    marquee: [
      'RNA Isolation', 'PCR / RT-PCR', 'R / Bioconductor',
      'Gel Electrophoresis', 'limma · clusterProfiler', 'Cell Culture',
      'SDS-PAGE', 'Pathway Enrichment', 'NanoDrop', 'Figma · Canva',
      'Cryopreservation', 'Bioinformatics'
    ],

    categories: [
      {
        label: 'Wet Lab',
        tags: [
          'Cell Culture — Bacterial', 'Cell Culture — Animal',
          'RNA Isolation', 'DNA Isolation', 'Plasmid Isolation',
          'PCR', 'RT-PCR', 'Gel Electrophoresis', 'SDS-PAGE',
          'BCA Assay', 'NanoDrop', 'Cryopreservation',
          'Callus Culture', 'Sterilisation', 'Media Preparation'
        ]
      },
      {
        label: 'Computational',
        tags: [
          'R', 'Bioconductor', 'limma', 'clusterProfiler',
          'GEO Dataset Analysis', 'Differential Expression',
          'Pathway Enrichment', 'Google Colab', 'Bioinformatics'
        ]
      },
      {
        label: 'Design & Tools',
        tags: [
          'Figma', 'Canva', 'DaVinci Resolve',
          'Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint'
        ]
      }
    ]
  },


  /* ── CONTACT ────────────────────────────────────────────── */
  contact: {
    heading:   'Say<br><span>hello.</span>',

    enquiries: [
      {
        label:       '01 — Enquiry Type',
        title:       'Research<br>Collaboration',
        subtitle:    'Interested in offering internships, or scientific projects.',
        emailSubject: 'Research%20Collaboration'
      },
      {
        label:       '02 — Enquiry Type',
        title:       'General',
        subtitle:    'Anything else — science communication, or just saying hello.',
        emailSubject: 'General%20Enquiry'
      }
    ]
  }

};