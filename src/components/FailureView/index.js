import './index.css'

const FailureView = ({onClickTryAgain}) => {
  return (
    <div className="failure-main-container">
      <div className="failure-content">
        <img
          src="https://res.cloudinary.com/dqstchmvc/image/upload/v1758192849/alert-triangle_oq6akp.png"
          alt="failure view"
          className="failure-image"
        />
        <p className="failure-text">Something went wrong. Please try again</p>
        <button className="failure-button" onClick={onClickTryAgain}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default FailureView
