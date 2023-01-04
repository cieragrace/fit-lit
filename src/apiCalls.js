function getAPIData(info) {
  const fetchedInfo = fetch(`http://localhost:3001/api/v1/${info}`)
    .then((res) => res.json())
  return fetchedInfo
}

export { getAPIData }