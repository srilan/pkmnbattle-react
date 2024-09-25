

const PinkButton = ({
  buttonClick,
  label
}) => {
  return (
    <button 
      style={{
        color: "pink",
        fontSize: 24
      }}
      onClick={buttonClick}
    >
      {label}  
    </button>
  )
}

export default PinkButton;