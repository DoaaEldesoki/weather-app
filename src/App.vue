<template>
  <div id="main">
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-lg-8 grid-margin stretch-card">
            <!--weather card-->
            <div class="card card-weather">
              <div class="card-body">
                <div class="weather-date-location">
                  <h3>{{ Day.currentDay }}</h3>
                  <p class="text-gray">
                    <span class="weather-date">{{ Day.currentDate }}</span>
                    <span class="weather-location">{{ weather.country }}</span>
                  </p>
                </div>
                <div class="weather-data d-flex">
                  <div class="mr-auto">
                    <h4 class="display-3">
                      {{ weather.temperature }} <span class="symbol">°</span>C
                    </h4>
                    <p>{{ weather.description }}</p>

                    <p>Feels like : {{ weather.feelsLike }}</p>
                    <p>Humidity : {{ weather.humidity }} %</p>
                    <p>Pressure : {{ weather.pressure }}</p>
                  </div>
                </div>
              </div>
              <div class="card-body p-0">
                <div class="d-flex weakly-weather">
                  <div
                    class="weakly-weather-item"
                    v-for="day in weather.daily"
                    v-bind:key="day"
                  >
                    <p class="mb-0">{{ }}Day</p>
                    <i class="mdi mdi-weather-cloudy">{{
                      Math.round(day.temp.day)
                    }}</i>
                    <p class="mb-0">
                      {{ Math.round(day.temp.min) }} /
                      {{ Math.round(day.temp.max) }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="btn-group btn-group-toggle"
                data-toggle="buttons"
                :class="{ Feh: isFeh }"
                v-on:click="toggle()"
              >
                <label class="btn btn-secondary active">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autocomplete="off"
                    checked
                  />
                  C
                </label>
                <label class="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autocomplete="off"
                  />
                  F
                </label>
              </div>
            </div>
          </div>
          <!--weather card ends-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      cityFound: false,
      visible: false,
      stormy: false,
      cloudy: false,
      clearSky: false,
      clearNight: false,
      snowy: false,
      isDay: true,
      isFeh: true,

      citySearch: "",
      weather: {
        cityName: "Gwarinpa",
        country: "NG",
        temperature: 12,
        description: "Clouds everywhere",
        pressure: "pressure",
        feelsLike: "20",
        humidity: "55",
        shortsummary: "",
        daily: [""],
      },
      Day: {
        currentDate: "",
        currentDay: "",
      },
    };
  },
  methods: {
    getWeather: async function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          let lon = position.coords.longitude;
          let lat = position.coords.latitude;
          // API_KEY
          const API_KEY = "15cb44b943ee32703dac10b393f3d17b";
          // API URL
          const base = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
          // Calling the API
          fetch(base)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data.daily);
              this.weather.temperature = Math.round(data.current.temp);
              this.weather.country = data.timezone;
              this.weather.feelsLike = Math.round(data.current.feels_like);
              this.weather.humidity = data.current.humidity;
              this.weather.description = data.current.weather[0].description;
              this.weather.pressure = data.current.pressure;
              this.weather.daily = data.daily;
            });
        });
      }
    },
    getDay: function () {
      var monthNames = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];
      var days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ];
      var today = new Date();
      var dd = today.getDate();
      var mm = monthNames[today.getMonth()];
      var yyyy = today.getFullYear();
      var day = days[today.getDay()];
      today = " " + dd + "-" + mm + "-" + yyyy;
      console.log(today);
      console.log("Day is : " + day);
      this.Day.currentDate = today;
      this.Day.currentDay = day;
    },
    getHumanDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    toggle() {
      this.Feh = !this.Feh;
    },
  },
  beforeMount() {
    this.getWeather();
    this.getDay();
  },
};
</script>

<style>
@import "./assets/custom.css";
</style>
