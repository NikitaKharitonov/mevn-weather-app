<template>
  <div class="container">
    <div class="locations-container">
      <div class="add-location" v-on:click="addLocation">+</div>
      <form>
        <input type="text" id="query" v-on:focusout="focusOut" autofocus/>
        <input type="submit" v-on:click="add" value="Submit" hidden/>
      </form>
      <div class="location" v-for="(loc, idx) in locations" v-bind:key="loc"
      v-on:click="changeLoc(loc)" @dblclick="removeLoc(idx)">
        {{ loc }}
        <i class="fas fa-times" title="Remove" v-on:cilck="removeLoc(idx)"></i>
      </div>
    </div>
    <div class="weather-data">
      <div class="location-name">
        {{ locationName }}
      </div>
      <div class="icon-container">
        <img v-bind:src="iconSrc" alt="icon" class="icon">
      </div>
      <div class="temperature">
        <span class="temp-value">{{ tempValue }}</span>
        <span class="temp-unit">{{ tempUnit }}</span>
      </div>
      <div class="description">{{ description }}</div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      locations: [],
      locationName: "Oslo",
      tempValue: "-5.5",
      tempUnit: "°C",
      description: "Cold",
      iconSrc: "http://openweathermap.org/img/wn/11n@2x.png"
    }
  },
  async created() {
    // const exampleData = '{"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"11n"}],"base":"stations","main":{"temp":174.6,"feels_like":270.16,"temp_min":274.15,"temp_max":274.82,"pressure":995,"humidity":93},"visibility":10000,"wind":{"speed":3.6,"deg":90},"rain":{"1h":0.36},"clouds":{"all":75},"dt":1611494261,"sys":{"type":1,"id":1414,"country":"GB","sunrise":1611474590,"sunset":1611506106},"timezone":0,"id":2643743,"name":"London","cod":200}';
    this.locations = ["Moscow", "London", "Berlin", "Paris", "Oslo", "Rome"];
    const cityName = this.locations[0];
    
    const apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9709d8161495e8ce8f004183eb81cc91`;
    const data = await fetch(apiCall).then(respsonse => respsonse.json());

    // const data = JSON.parse(exampleData);
    this.locationName = data.name;
    this.tempValue = Math.round(data.main.temp - 273.15);
    this.description = data.weather[0].main;
  },
  methods: {
    addLocation() {
      document.querySelector("form").style.display = "flex";
      document.querySelector(".add-location").style.display = "none";
    },
    focusOut() {
      document.querySelector("form").style.display = "none";
      document.querySelector(".add-location").style.display = "block";
    
    },
    add(event) {
      event.preventDefault();
      const queryText = document.getElementById("query").value;
      this.locations.unshift(queryText);
      document.getElementById("query").value = "";
    },
    async changeLoc(cityName) {

      const apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9709d8161495e8ce8f004183eb81cc91`;
      const data = await fetch(apiCall).then(respsonse => respsonse.json());

      // const data = JSON.parse(exampleData);
      this.locationName = data.name;
      this.tempValue = Math.round(data.main.temp - 273.15);
      this.description = data.weather[0].main;
    },
    removeLoc(idx) {
      this.locations.splice(idx, 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  /* display: flex;
  justify-content: space-between; */
  padding: 8px 8px;
  position: relative;
}

.weather-data {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  flex: 1;
  position: fixed;
  top: 0px;
  left: 50vw
}

.location-name {
  font-size: 2em;
}

.temperature {
  font-size: 1.5em;
}

.locations-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: right;
}

.locations-container .location {
  width: 24vw;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(38, 58, 114);
  border-radius: 4px;
  cursor: pointer;
  margin: 16px 0px;
  position: relative;
}



form {
  border: none;
  width: 24vw;
  height: 3em;
  font-size: 0.5em;
  display: none;
  flex-direction: row;

}

form input {
  width: 24vw;
}

.locations-container .location:hover {
  background-color: cornflowerblue;
  transition: all 0.3s ease;
}

.add-location {
  width: 40px;
  background-color: darkgreen;
  border-radius: 4px;
  cursor: pointer;
  position: sticky;
}

.add-location:hover {
  width: 40px;
  background-color: rgb(75, 168, 75);
  border-radius: 4px;
  cursor: pointer;
}

i {
  display: none;
}

.location:hover 
i {
  size: 0.25em;
  /* background: transparent; */
  position: absolute;
  right: 0;
  top: 0;
  /* margin-right: 0.2em;
  margin-top: 0.2em; */
  width: 1em;
  height: 1em;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

i:hover {
  color: red;
  background-color: salmon;
}

</style>
