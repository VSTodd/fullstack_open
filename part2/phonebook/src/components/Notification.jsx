const Notification = ({ message, type }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const failureStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  let style

  if (type === 'success') {
    style = successStyle
  } else {
    style = failureStyle
  }

  return (
    <div className='success' style={style}>
      {message}
    </div>
  )
}

export default Notification