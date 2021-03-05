import "./Body.css";
import axios from "axios";
import { Component, Fragment } from "react";
import API_KEY from "./Api";
import estados from "../assets/estados";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: "",
      cidades: [],
      isActive: false,
      value: "",
      temp: "",
      min_temp: "",
      max_temp: "",
      humidity: "",
      feels_like: "",
      wind: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCidade = this.handleChangeCidade.bind(this);
  }

  handleChange(e) {
    this.setState({ estado: e.target.value, isActive: true }, function () {
      estados.map((el) => {
        if (el.nome == this.state.estado) {
          this.setState({ cidades: el.cidades });
        }
      });
    });
  }

  handleChangeCidade(e) {
    this.setState({ value: e.target.value, submit: true });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: this.state.value,
        units: "metric",
      },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((res) => {
        const response = res.data;
        console.log(response);
        this.setState(
          {
            temp: `${response.main.temp} ºC`,
            min_temp: `${response.main.temp_min} ºC`,
            max_temp: `${response.main.temp_max} ºC`,
            humidity: `${response.main.humidity} %`,
            feels_like: `${response.main.feels_like} ºC`,
            wind: `aprox ${Math.round(response.wind.speed * 3.6)} Km/h`,
          },
          function () {
            console.log(this.state);
          }
        );
      })
      .catch((error) => {
        console.log(error);
        alert("Peço desculpas, a cidade não foi encontrada via API :( , tente uma cidade diferente...")
      });
  }
  render() {
    const {
      cidades,
      isActive,
      temp,
      max_temp,
      min_temp,
      humidity,
      feels_like,
      wind,
    } = this.state;

    return (
      <Fragment>
        <section className="selection">
          <form onSubmit={this.handleSubmit}>
            <select onChange={this.handleChange}>
              <option>Selecione um Estado</option>
              {estados.map((e) => {
                return <option key={e.nome}>{e.nome}</option>;
              })}
            </select>
            <div>
              <select onChange={this.handleChangeCidade}>
                <option>Selecione uma Cidade</option>
                {isActive
                  ? cidades.map((el) => {
                      return <option key={el}>{el}</option>;
                    })
                  : ""}
              </select>
            </div>
            <input type="submit" value="Quero saber o clima!" />
          </form>
        </section>

        <section>
          <div>
            <div className="results">
              <div className="wrapper">
                <p>Temp atual: <span className="render">{temp}</span></p>
                <p>Temp máxima: <span className="render">{max_temp}</span></p>
              </div>
              <div className="wrapper">
                <p>Temp Mínima: <span className="render">{min_temp}</span></p>
                <p>Umidade do ar: <span className="render">{humidity}</span></p>
              </div>
              <div className="wrapper">
              <p>Sensação térmica: <span className="render">{feels_like}</span></p>
              <p>Velocidade do vento: <span className="render">{wind}</span></p>
            </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
