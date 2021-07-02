function Order(dataArray, field) {
  return dataArray.sort((a, b) => (a[field] < b[field]) ? 1 : -1);
}

export {Order}
