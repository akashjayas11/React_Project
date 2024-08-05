import React from 'react'
import './ErrorPage.css'

interface ErrorPageProp{
    message : string;
    onRetry? :()=> void;
}

const ErrorPage = ({ message , onRetry }:ErrorPageProp) => {
  return (
    <div className="error-page">
    <h1>Error</h1>
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn btn-primary">
        Retry
      </button>
    )}
  </div>
  )
}

export default ErrorPage