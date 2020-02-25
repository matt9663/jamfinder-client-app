const STORE = { 
  users: [
      { id: 1, user_name: 'test-user1', genres: 'Funk/R&B', instrument: 'Electric guitar', influences: 'James Brown, Isaiah Sharkey, Nile Rogers', bands: [1,2,3]},
      { id: 2, user_name: 'test-user2', genres: 'Metal/Folk', instrument: 'Accordian', influences: 'Weird Al', bands: [1]},
      { id: 3, user_name: 'test-user3', genres: 'Blues/Americana', instrument: 'Electric bass', influences: 'Ernest Tub, Robert Johnson, Blind Lemon Jefferson', bands: [1] }
  ],
  bands: [
      { id: 1, band_name: 'Gutter Helmet & The Hawgs', genre: 'Bog-rock', description: 'Swamp blues straight from the Bayou', new_members: true, location: 'Loosianah, LA', members: [1,2,3], bandleader: 1},
      { id: 2, band_name: 'Boistrous Oysters', genre: 'Jazz Fusion', description: 'Super fast future jazz', new_members: false, location: 'Los Angeles, CA', members: [1], bandleader: 1},
      { id: 3, band_name: 'The Lunch Ladies', genre: 'Indie-rock', description: 'Angsty songs by dudes who are too old to be this angsty', new_members: true, location: 'Philadelphia, PA', members: [2], bandleader: 1}
    ],
  band_messages: [
      {id: 1, band: 1, author: 1, author_user_name: 'test-user-1', date_published: '2/18/2020 9:00:00 AM', message: `Since we have a show next week, are you guys available to meet for rehearsal this Saturday afternoon at 2pm?`},
      {id: 2, band: 1, author: 2, author_user_name: 'test-user-2', date_published: '2/18/2020 10:00:00 AM', message: `Yeah that works for me, see you then!`},
      {id: 3, band: 1, author: 3, author_user_name: 'test-user-3', date_published: '2/17/2020 9:00:00 AM', message: `Nice to meet everyone, thanks for letting me join the group. Excited to make some music will y'all!`},
  ]
}

export default STORE;