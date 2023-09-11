function dateFormat(timestamp) {
  const formattedDate = new Date(timestamp).toLocaleString();
  return formattedDate;
}

export default dateFormat;
