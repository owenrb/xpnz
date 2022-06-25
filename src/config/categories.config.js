const categoryMap = {
  transpo: { icon: 'bus', label: 'Transportation' },
  water: { icon: 'water-outline', label: 'Water' },
  electrict: { icon: 'transmission-tower', label: 'Electricity' },
  mobile: { icon: 'cellphone-charging', label: 'Mobile' },
  household: { icon: 'cart-variant', label: 'Household' },
  investment: { icon: 'piggy-bank-outline', label: 'Investment' },
  insurance: { icon: 'bank-outline', label: 'Insurance' },
  internet: { icon: 'wifi-arrow-up-down', label: 'Internet' },
  donation: { icon: 'charity', label: 'Donation' },
  travel: { icon: 'airport', label: 'Travel' },
  health: { icon: 'medical-bag', label: 'Health' },
  food: { icon: 'chef-hat', label: 'Food' },
  'baby-food': { icon: 'baby-bottle-outline', label: 'Baby Food' },
  'baby-stuff': { icon: 'baby-face-outline', label: 'Baby Stuff' },
  education: { icon: 'book-education-outline', label: 'Education' },
  misc: { icon: 'currency-php', label: 'Miscellaneous' },
}

const keys = Object.keys(categoryMap)
const categoryArray = keys.map(key => {
  return { key, ...categoryMap[key] }
})

export { categoryMap, categoryArray }
