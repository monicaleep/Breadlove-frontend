import React from 'react';
import { useHistory } from 'react-router-dom'

const FourOFour = () => {
  const history = useHistory()
  return (
    <div className="container">

      <div className="row justify-content-center">
        <div className="col-md-4">

          <div>Page not found!</div>
          <button className="btn btn-warning" onClick={()=> history.goBack()}> Go Back! </button>
        </div>
      </div>
    </div>
  )
}

export default FourOFour;
