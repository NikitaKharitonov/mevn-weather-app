<template>
  <!-- <div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div class="container">
    <div class="locations-container">
      <div class="add-location" v-on:click="addLocation">+</div>
      <form>
        <input type="text" id="query" v-on:focusout="focusOut" autofocus />
        <input type="submit" v-on:click="add" value="Submit" hidden />
      </form>

      <div class="location" v-for="(loc, idx) in locations" v-bind:key="loc._id">
        <span class="location-name" @click="changeLoc(idx)">{{ loc.name }}</span>
        <span class="remove-btn" @click="removeLoc(loc._id)"
          ><i class="fas fa-times"></i
        ></span>
      </div>
    </div>
    <div class="curr-weather-info-container">
      <div class="curr-location">{{ currLocation }}</div>
      <img v-bind:src="iconSrc" alt="icon" class="curr-weather-icon" />
      <div class="temperature">
        <span>{{ temperatureValue }}</span
        ><span>{{ temperatureUnit }}</span>
      </div>
      <div class="curr-weather-description">
        {{ currWeatherDescription }}
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LocationsService from './LocationsService'

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  data() {
    return {
      locations: [],
      currLocation: "",
      iconSrc: "http://openweathermap.org/img/wn/11n@2x.png",
      temperatureValue: 0,
      temperatureUnit: "°C",
      currWeatherDescription: "Cloudy",
      exampleData:
        '{"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":275.88,"feels_like":272.28,"temp_min":273.71,"temp_max":277.59,"pressure":1018,"humidity":75},"visibility":10000,"wind":{"speed":2.06,"deg":220},"clouds":{"all":40},"dt":1611655530,"sys":{"type":1,"id":1414,"country":"GB","sunrise":1611647236,"sunset":1611679116},"timezone":0,"id":2643743,"name":"London","cod":200}',
    };
  },
  async created() {
    // this.locations = [
    //   "London",
    //   "New York",
    //   "Tokyo",
    //   "Berlin",
    //   "Madrid",
    //   "Rome",
    //   "Paris",
    //   "Oslo",
    //   "Moscow",
    //   "Istanbul",
    //   "Kyiv",
    //   "Minsk",
    //   "Beijin",
    //   "Samara",
    //   "Sidney",
    //   "Prague",
    // ];

    this.locations = await LocationsService.getLocaions();

    const query = this.locations[0].name;

    const data = await this.getData(query);

    this.fillData(data);
  },
  methods: {
    async getData(query) {
      return new Promise((resolve) => {
        const apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=9709d8161495e8ce8f004183eb81cc91`;
        fetch(apiCall)
          .then((respsonse) => respsonse.json())
          .then((data) => resolve(data));
      });
    },
    fillData(data) {
      this.currLocation = data.name;
      this.temperatureValue = Math.round(data.main.temp - 273.15);
      this.currWeatherDescription = data.weather[0].main;
    },
    addLocation() {
      document.querySelector("form").style.display = "flex";
      document.querySelector(".add-location").style.display = "none";
    },
    focusOut() {
      document.querySelector("form").style.display = "none";
      document.querySelector(".add-location").style.display = "block";
    },
    async add(event) {
      event.preventDefault();
      const queryText = document.getElementById("query").value;

      await LocationsService.insertLocation(queryText);

      this.locations = await LocationsService.getLocaions();

      document.getElementById("query").value = "";
    },
    async changeLoc(idx) {
      const query = this.locations[idx].name;

      const data = await this.getData(query);

      this.fillData(data);
    },
    async removeLoc(id) {
      // this.locations.splice(idx, 1);
      await LocationsService.deleteLocation(id);
      this.locations = await LocationsService.getLocaions()
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-image: linear-gradient(rgb(77, 192, 192), rgb(73, 73, 199));
  font-size: 1rem;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
  font-size: 2rem;
}

.locations-container {
  position: absolute;
  top: 1%;
  left: 1%;
  width: 30%;
}

.location {
  margin-bottom: 4%;
  height: 3em;
  width: 100%;
}

.location:hover .remove-btn {
  display: inline;
}

.location-name:hover {
  background-color: cornflowerblue;
}

.location-name {
  border-radius: 8px;
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 80%;
  height: 3em;
  float: left;
}

.remove-btn {
  display: none;
  color: cadetblue;
  float: right;
  border-radius: 8px;
  cursor: pointer;
  width: 1em;
  height: 1em;
  margin-left: 2%;
}

.remove-btn:hover {
  color: crimson;
}

.add-location {
  width: 40px;
  background-color: darkgreen;
  border-radius: 4px;
  cursor: pointer;
  position: sticky;
  margin-bottom: 4%;
}

.add-location:hover {
  width: 40px;
  background-color: rgb(75, 168, 75);
  border-radius: 4px;
  cursor: pointer;
}

form {
  border: none;
  width: 24vw;
  height: 3em;
  font-size: 0.5em;
  display: none;
  flex-direction: row;

  margin-bottom: 4%;
}

form input {
  width: 24vw;
}

.curr-weather-info-container {
  position: fixed;
  top: 1%;
  left: 32%;
  width: 77%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
