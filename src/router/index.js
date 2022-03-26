import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: '',
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;










https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=15cb44b943ee32703dac10b393f3d17b







https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=15cb44b943ee32703dac10b393f3d17b






https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/30.04.31.23





https://api.openweathermap.org/data/2.5/weather?lat=30.21&lon=32.03&appid=15cb44b943ee32703dac10b393f3d17b













  console.log(this.citySearch);
      console.log(navigator.geolocation.position)
      const API_KEY = '15cb44b943ee32703dac10b393f3d17b';
      const baseUrl =`https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch}&appid=${API_KEY}`
      const response = await fetch(baseUrl)
      const data = await (response.json())
      console.log(data)




















 <div id="main" :class="isDay ? 'day' : 'night'">
    <div class="container my-5" style="max-width: 400px; min-width: 360px">
      <h1 class="title text-center">Weather in</h1>
      <form class="search-location" v-on:submit.prevent="getWeather">
        <input
          type="text"
          class="form-control text-muted form-rounded p-4 shadow-sm"
          placeholder="What City?"
          v-model="citySearch"
          autocomplete="off"
        />
      </form>
      <p class="text-center my-3" v-if="cityFound">No city found</p>
      <div class="card rounded my-3 shadow-lg back-card" v-if="visible">
        <!-- weather animation container -->
        <div>
          <div icon="sunny" v-if="clearSky" data-label="Sunny">
            <span class="sun"></span>
          </div>

          <div icon="snowy" v-if="snowy" data-label="Chilly">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <div icon="stormy" v-if="stormy" data-label="Soggy">
            <span class="cloud"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div icon="cloudy" v-if="cloudy" data-label="Perfect">
            <span class="cloud"></span>
            <span class="cloud"></span>
          </div>
          <div icon="nightmoon" v-if="clearNight" data-label="Cool!">
            <span class="moon"></span>
            <span class="meteor"></span>
          </div>
        </div>

        <!-- Top of card starts here -->
        <div class="card-top text-center" style="margin-bottom: 15rem">
          <div class="city-name my-3">
            <p>{{ data.name }}</p>
            <span>...</span>
            <p class="">{{ weather.country }}</p>
          </div>
        </div>
        <!-- top of card ends here -->

        <!--card middle body, card body used cos I want to just update the innerHTML -->
        <div class="card-body">
          <!-- card middle starts here -->
          <div class="card-mid">
            <div class="row">
              <div class="col-12 text-center temp">
                <span>{{ weather.temperature }}&deg;C</span>
                <p class="my-4">{{ weather.description }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-between px-5 mx-5">
                <p>
                  <img src="./assets/down.svg" alt="" />
                  {{ weather.lowTemp }}&deg;C
                </p>
                <p>
                  <img src="./assets/up.svg" alt="" />
                  {{ weather.highTemp }}&deg;C
                </p>
              </div>
            </div>
          </div>
          <!-- card middle ends here -->

          <!-- card bottom starts here -->
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>{{ weather.feelsLike }}&deg;C</p>
              <span>Feels like</span>
            </div>
            <div class="col text-center">
              <p>{{ weather.humidity }}%</p>
              <span>humidity</span>
            </div>
          </div>

          <!-- card bottom ends here -->
        </div>
      </div>
    </div>
  </div>












          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`










              this.weather.country = data.sys.country;

   this.weather.feelsLike = data.main.feels_like;
              this.weather.highTemp = data.main.temp_max;
              this.weather.lowTemp = data.main.temp_min;
              this.weather.description = data.weather[0].description;
              this.weather.shortsummary = data.weather[0].main;




{{
                      switchTemp
                        ? convertToCelsiusDays(day.temp.min)
                        : convertToFahrenheitDays(day.temp.min)
                    }}










      this.Day.nextDay=weekDays
  v-for="day in Day.nextDay"
                    v-bind:key="day"


              this.weather.daily = data.daily;
  v-for="day in weather.daily"
                    v-bind:key="day"










  <img :src=`https://openweathermap.org/img/wn/10n@2x.png`
                    width="220px" alt />



 getImage() {
      return require(`http://openweathermap.org/img/wn/${timeOfDay}@2x.png`); // the module request
    },

 <img
                      :src="
                        require(`http://openweathermap.org/img/wn/${timeOfDay}@2x.png`)
                      "
                      alt
                      class="icon"
                    />



















 <p>
          <button
            class="btn btn-primary"
            data-bs-toggle="collapse"
            href="#collapseExample2"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample2"
          >
            Link with href
          </button>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Button with data-bs-target
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            Sjlkdjlksome placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
          <div class="collapse" id="collapseExample2">
          <div class="card card-body">
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>