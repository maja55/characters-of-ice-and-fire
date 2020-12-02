export const API_ROOT = 'https://www.anapioficeandfire.com/api';

export const API_RESOURCES = {
  books: 'https://www.anapioficeandfire.com/api/books',
  characters: 'https://www.anapioficeandfire.com/api/characters?pageSize=40',
  houses: 'https://www.anapioficeandfire.com/api/houses?pageSize=40',
  pictures: 'https://randomuser.me/api/?inc=picture&gender=[gender]'
};

export const PLACEHOLDER_IMG = "//style.anu.edu.au/_anu/4/images/placeholders/person.png"

// only primary fields are shown on lister page
export const CHARACTER_FIELDS = [{
  propertyName: 'name',
  isPrimary: true
}, {
  propertyName: 'aliases',
  isPrimary: true
}, {
  propertyName: 'titles',
}, {
  propertyName: 'gender',
}, {
  propertyName: 'born',
  isPrimary: true
}, {
  propertyName: 'died',
  isPrimary: true
}, {
  propertyName: 'allegiances',
  label: 'Houses',
  isPrimary: true,
  resourceType: 'houses'
}, {
  propertyName: 'father',
  resourceType: 'characters'
}, {
  propertyName: 'mother',
  resourceType: 'characters'
}, {
  propertyName: 'spouse',
  resourceType: 'characters'
}, {
  propertyName: 'culture',
}, {
  propertyName: 'books',
  resourceType: 'books',
  isPrimary: true,
  isFilter: true,
}];
