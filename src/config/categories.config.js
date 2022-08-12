const categoryMap = {
  misc: {
    icon: 'currency-php',
    label: 'Miscellaneous',
    style: {
      borderColor: 'violet',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'violet',
    },
  },
  transpo: {
    icon: 'bus',
    label: 'Transportation',
    style: {
      borderColor: 'green',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'green',
    },
  },
  allowance: {
    icon: 'briefcase-clock-outline',
    label: 'Allowance',
    style: {
      borderColor: 'goldenrod',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'purple',
    },
  },
  water: {
    icon: 'water-outline',
    label: 'Water',
    style: {
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'blue',
    },
  },
  electrict: {
    icon: 'transmission-tower',
    label: 'Electricity',
    style: {
      borderColor: 'orange',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indianred',
    },
  },
  mobile: {
    icon: 'cellphone-charging',
    label: 'Mobile',
    style: {
      borderColor: 'coral',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indianred',
    },
  },
  household: {
    icon: 'cart-variant',
    label: 'Household',
    style: {
      borderColor: 'purple',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'purple',
    },
  },
  investment: {
    icon: 'piggy-bank-outline',
    label: 'Investment',
    style: {
      borderColor: 'indigo',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indigo',
    },
  },
  insurance: {
    icon: 'bank-outline',
    label: 'Insurance',
    style: {
      borderColor: 'goldenrod',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'goldenrod',
    },
  },
  internet: {
    icon: 'wifi-arrow-up-down',
    label: 'Internet',
    style: {
      borderColor: 'yellowgreen',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'green',
    },
  },
  donation: {
    icon: 'charity',
    label: 'Donation',
    style: {
      borderColor: 'pink',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indianred',
    },
  },
  travel: {
    icon: 'airport',
    label: 'Travel',
    style: {
      borderColor: 'skyblue',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'blue',
    },
  },
  health: {
    icon: 'medical-bag',
    label: 'Health',
    style: {
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indianred',
    },
  },
  food: {
    icon: 'chef-hat',
    label: 'Food',
    style: {
      borderColor: 'salmon',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indianred',
    },
  },
  'baby-food': {
    icon: 'baby-bottle-outline',
    label: 'Baby Food',
    style: {
      borderColor: 'sienna',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indianred',
    },
  },
  'baby-stuff': {
    icon: 'baby-face-outline',
    label: 'Baby Stuff',
    style: {
      borderColor: 'springgreen',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'green',
    },
  },
  education: {
    icon: 'book-education-outline',
    label: 'Education',
    style: {
      borderColor: 'slateblue',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'slateblue',
    },
  },
  pet: {
    icon: 'cat',
    label: 'Pets',
    style: {
      borderColor: 'brown',
      borderWidth: 2,
      borderRadius: 9,
    },
    textStyle: {
      color: 'indianred',
    },
  },
}

const keys = Object.keys(categoryMap)
const categoryArray = keys.map(key => {
  return { key, ...categoryMap[key] }
})
const comboArray = keys.map(key => {
  return {
    value: key,
    label: categoryMap[key].label,
    labelStyle: categoryMap[key].textStyle,
  }
})

export { categoryMap, categoryArray, comboArray }
