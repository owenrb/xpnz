const addMonths = (date, amount) => {
  const endDate = new Date(date.getTime())
  const originalTimeZoneOffset = endDate.getTimezoneOffset()
  endDate.setMonth(endDate.getMonth() + amount)
  while (monthDiff(date, endDate) > amount) {
    endDate.setDate(endDate.getDate() - 1)
  }
  //endDate.setDate(endDate.getDate() + 1)

  const endTimeZoneOffset = endDate.getTimezoneOffset()
  const diff = endTimeZoneOffset - originalTimeZoneOffset
  const finalDate = diff
    ? endDate.setMinutes(endDate.getMinutes() - diff)
    : endDate
  return new Date(finalDate)
}
const monthDiff = (from, to) => {
  const years = to.getFullYear() - from.getFullYear()
  const months = to.getMonth() - from.getMonth()
  return 12 * years + months
}

export { addMonths, monthDiff }
