function getAPIData(info) {
  const fetchedInfo = fetch(`http://localhost:3001/api/v1/${info}`)
    .then((res) => res.json())
  return fetchedInfo
}

function updateSleepData(newData) {
  const results =   fetch(`http://localhost:3001/api/v1/sleep`, {
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

function updateActivityData(newData) {
  const results =   fetch(`http://localhost:3001/api/v1/activity`, {
    method: 'POST',
    body: JSON.stringify(newData), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  return results
}

function updateHydrationData(newData) {
  const results =   fetch(`http://localhost:3001/api/v1/hydration`, {
    method: 'POST',
    body: JSON.stringify(newData), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  return results
}

export { getAPIData, updateSleepData, updateActivityData, updateHydrationData }