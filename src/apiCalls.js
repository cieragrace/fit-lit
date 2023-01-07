function getAPIData(info) {
  const fetchedInfo = fetch(`http://localhost:3001/api/v1/${info}`)
    .then((res) => res.json())
  return fetchedInfo
}

function updateAPIData(newData, endpoint) {
  const results =   fetch(`http://localhost:3001/api/v1/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(newData), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error(res.status)
    }
    return res.json()
  }).catch(error => console.log(error))
  return results
}

export { getAPIData, updateAPIData }