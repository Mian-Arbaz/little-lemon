// Static content for the Little Lemon site. Kept separate from components
// so that UI code never hard-codes restaurant data or booking options.

export const MENU_ITEMS = [
  {
    id: 'greek-salad',
    name: 'Greek Salad',
    description: 'Fresh vegetables, Kalamata olives and creamy feta cheese, tossed in a lemon-oregano vinaigrette.',
    price: '$12.99',
    image: '/images/greek-salad.jpg',
    alt: 'A bowl of Greek salad with tomatoes, cucumber, olives and feta cheese',
  },
  {
    id: 'bruschetta',
    name: 'Bruschetta',
    description: 'Grilled sourdough bread topped with ripe tomatoes, fresh basil and extra virgin olive oil.',
    price: '$7.99',
    image: '/images/bruschetta.jpg',
    alt: 'Slices of grilled bread topped with diced tomatoes and basil',
  },
  {
    id: 'lemon-dessert',
    name: 'Lemon Dessert',
    description: "Grandma Adilah's recipe: a refreshing Mediterranean-inspired lemon layer cake.",
    price: '$6.99',
    image: '/images/lemon-dessert.jpg',
    alt: 'A slice of light yellow lemon layer cake on a white plate',
  },
];

export const OCCASIONS = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'date-night', label: 'Date Night' },
  { value: 'family-gathering', label: 'Family Gathering' },
  { value: 'business-meal', label: 'Business Meal' },
  { value: 'other', label: 'Other' },
];

// Full list of times the restaurant could ever seat guests at.
export const ALL_TIME_SLOTS = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
];

export const RESTAURANT_INFO = {
  name: 'Little Lemon',
  city: 'Chicago, Illinois',
  address: '123 Mediterranean Ave, Chicago, IL 60601',
  phone: '(312) 555-0147',
  email: 'info@littlelemon.example',
  hoursWeekday: 'Monday – Friday: 5:00 PM – 10:00 PM',
  hoursWeekend: 'Saturday – Sunday: 12:00 PM – 10:00 PM',
};
