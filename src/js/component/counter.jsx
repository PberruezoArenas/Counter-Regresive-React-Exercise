// Counter.jsx
import React from "react";
import PropTypes from "prop-types";

const Counter = (props) => {
  const digitStyle = {
    maxWidth: '110px',
    fontSize: '60px',
    border: '2px solid #666',
    borderRadius: '10px',
    backgroundColor: 'black',
    color: 'white',
  };

  const formatDigit = (digit) => {
    return digit < 10 ? digit.toString() : digit.toString()[1];
  };

  const digits = Array.from(String(props.countdownValue).padStart(6, "0")).map((digit, index) => (
    <div key={index + 1} style={digitStyle} className={`p-5 me-2 d-flex align-items-center justify-content-center`}>
      {formatDigit(Number(digit))}
    </div>
  ));

  return (
    <div className='bigCounter d-flex justify-content-center pt-5 pb-5 bg-black'>
      <div style={digitStyle} className='icon p-5 me-2 d-flex align-items-center justify-content-center'>
        <i className="far fa-clock"></i>
      </div>
      {digits}
    </div>
  );
};

Counter.propTypes = {
  countdownValue: PropTypes.number,
};

export default Counter;
