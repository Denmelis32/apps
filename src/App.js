import React from "react";
import Info from "./componets/info";
import Form from "./componets/form";
import Weather from "./componets/Weather";

const API_KEY = "4b6cb4a0038510cbd10b31ad75ce0c89"

class App extends React.Component{

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: ""
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    debugger
    const city = e.target.elements.cite.value;
    if(city){
    const api_url = await
    fetch(`https://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    debugger
    const data = await api_url.json();

    var sunset = data.sys.sunset;
    var date = new Date()
    date.setTime(sunset);
    var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    this.setState({
      temp: data.main.temp,
      city: data.name,
      country: data.sys.country,
      pressure: data.main.pressure,
      sunset: data.sys.sunset,
      error: undefined
    });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
      });
    }
  }

  render(){
    return(
      <div className="wrapper">
        <div className="main">
        <div className ="container">
          <div className="row">
            <div className="col-sm-5 info">
            <Info/>
              </div>
              <Info/>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather}/>
                <Weather
                temp={this.state.temp}
                city={this.state.cite}
                country={this.state.country}
                pressure={this.state.pressure}
                sunset={this.state.sunset}
                />
              </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}


export default App;