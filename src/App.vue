<template>
  <div id="main" :class="isDay ? 'day' : 'night'">
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-lg-8 grid-margin stretch-card">
            <!--weather card-->
            <div class="card">
              <div class="card-body" :class="isDay ? 'day' : 'night'">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-outline-primary">
                    <input
                      type="radio"
                      name="options"
                      id="option1"
                      @click="switchTemp = true"
                      autocomplete="off"
                      checked
                      class="btn"
                    />
                    C
                  </label>
                  <span class="btn btn-outline-primary">
                    <input
                      type="radio"
                      @click="switchTemp = false"
                      name="options"
                      id="option2"
                      autocomplete="off"
                    />
                    F
                  </span>
                </div>
                <div class="weather-date-location">
                  <div class="text-gray">
                    <div class="weather-location">
                      <h3>{{ weather.country }}</h3>
                    </div>
                    <div class="weather-date">
                      <span>{{ Day.currentDay }}</span>
                 {{ Day.currentDate }}
                    </div>
                  </div>
                </div>
                <div class="weather-data d-flex">
                  <div class="mr-auto">
                    <h4 class="display-3">
                      <span>{{
                        switchTemp ? convertToCelsius : convertToFahrenheit
                      }}</span>
                    </h4>

                    <p>
                      Feels like :
                      {{
                        switchTemp
                          ? convertToCelsiusDays(weather.feelsLike)
                          : convertToFahrenheitDays(weather.feelsLike)
                      }}
                    </p>
                    <p>Humidity : {{ weather.humidity }} %</p>
                    <p>Pressure : {{ weather.pressure }}</p>
                    <img :src="img" class="imgIcon" alt />
                    <p>{{ weather.description }}</p>
                  </div>
                </div>
              </div>
              <div class="card-body p-0">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <button
                      class="nav-link active"
                      id="daily-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#daily"
                      type="button"
                      role="tab"
                      aria-controls="daily"
                      aria-selected="true"
                    >
                      Daily Weather
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="hourly-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#hourly"
                      type="button"
                      role="tab"
                      aria-controls="hourly"
                      aria-selected="false"
                    >
                      Hourly weather
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="daily"
                    role="tabpanel"
                    aria-labelledby="daily-tab"
                  >
                    <div class="d-flex weakly-weather">
                      <div
                        class="weakly-weather-item"
                        v-for="(day, index) in weather.daily"
                        v-bind:key="day"
                      >
                        {{ Day.nextDay[index] }}
                        <p class="mdi mdi-weather-cloudy">
                          <img
                            :src="icon(weather.daily[index].weather[0].icon)"
                            class="imgIcon"
                          />
                          {{
                            switchTemp
                              ? convertToCelsiusDays(day.temp.day)
                              : convertToFahrenheitDays(day.temp.day)
                          }}
                        </p>
                        <p class="mb-0">
                          {{
                            switchTemp
                              ? convertToCelsiusDays(day.temp.min)
                              : convertToFahrenheitDays(day.temp.min)
                          }}
                          /
                          {{
                            switchTemp
                              ? convertToCelsiusDays(day.temp.max)
                              : convertToFahrenheitDays(day.temp.max)
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="hourly"
                    role="tabpanel"
                    aria-labelledby="hourly-tab"
                  >
                    <div class="card-body p-0">
                      <div class="d-flex weakly-weather">
                        <div
                          class="weakly-weather-item"
                          v-for="(day, index) in weather.hourly"
                          v-bind:key="day"
                        >
                          {{ Day.nextHours[index] }}
                          <p class="mdi mdi-weather-cloudy">
                            <img
                              :src="icon(weather.hourly[index].weather[0].icon)"
                              class="imgIcon"
                            />
                            {{
                              switchTemp
                                ? convertToCelsiusDays(day.temp)
                                : convertToFahrenheitDays(day.temp)
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--weather card ends-->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      switchTemp: true,
      isDay: true,
      weather: {
        cityName: "Alex",
        country: "EG",
        temperature: 12,
        description: "Clouds everywhere",
        pressure: "pressure",
        feelsLike: "20",
        humidity: "55",
        shortsummary: "",
        daily: [""],
        hourly: [""],
        timeOfDay: "",
        icons: "",
      },
      Day: {
        currentDate: "",
        currentDay: "",
        nextDay: [""],
        nextHours: [""],
      },
    };
  },
  methods: {
    convertToCelsiusDays(e) {
      return Math.round(+e - 273.15) + " °C";
    },
    convertToFahrenheitDays(e) {
      return Math.round(((e - 273.15) * 9) / 5 + 32) + " °F";
    },
    getWeather: async function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          let lon = position.coords.longitude;
          let lat = position.coords.latitude;
          // API_KEY
          const API_KEY = "0cad4b9d76235986d03e7c39bd611ee6";
          // API URL
          const base = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
          // Calling the API
          fetch(base)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              this.weather.temperature = Math.round(data.current.temp);
              this.weather.country = data.timezone.substring(7, 13);
              this.weather.feelsLike = Math.round(data.current.feels_like);
              this.weather.humidity = data.current.humidity;
              this.weather.description = data.current.weather[0].description;
              this.weather.pressure = data.current.pressure;
              this.weather.daily = data.daily;
              this.weather.hourly = data.hourly;
              this.weather.timeOfDay = data.current.weather[0].icon;
              const timeOftheDay = data.current.weather[0].icon;

              ///check for time of day
              if (timeOftheDay.includes("n")) {
                this.isDay = false;
              } else {
                this.isDay = true;
              }
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
      let weekDays = [];
      let daysRequired = 8;
      for (let i = 1; i <= daysRequired; i++) {
        weekDays.push(moment().add(i, "days").format("dddd"));
      }
      this.Day.nextDay = weekDays;
      let allNextHours = [];
      let HoursRequired = 48;
      for (let i = 1; i <= HoursRequired; i++) {
        allNextHours.push(moment().add(i, "Hours").format(" hh  A"));
      }
      this.Day.nextHours = allNextHours;
      console.log(allNextHours);

      today = " " + dd + "  " + mm + "  " + yyyy;
      this.Day.currentDate = today;
      this.Day.currentDay = day;
    },

    icon(e) {
      return `https://openweathermap.org/img/wn/${e}@2x.png`;
    },
  },
  beforeMount() {
    this.getWeather();
    this.getDay();
  },
  computed: {
    convertToCelsius() {
      return Math.round(this.weather.temperature - 273.15) + " °C";
    },
    convertToFahrenheit() {
      return (
        Math.round(((this.weather.temperature - 273.15) * 9) / 5 + 32) + " °F"
      );
    },
    img() {
      return `https://openweathermap.org/img/wn/${this.weather.timeOfDay}@2x.png`;
    },
  },
};
</script>

<style>
@import "./assets/custom.css";
</style>
