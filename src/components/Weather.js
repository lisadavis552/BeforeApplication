function Weather(props) {
  return (
    <div>
      <h3>{props.weather}</h3>
      <h4>Temperature: {props.temp} F</h4>
    </div>
  );
}

export default Weather;
