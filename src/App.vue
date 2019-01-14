<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-6">
            <div class="level">
              <div class="level-item">
                <figure class="image is-128x128">
                  <img src="gnrlogo.png">
                </figure>
              </div>
            </div>
            <h1 class="title is-1">THREE DOG</h1>
            <h4 class="subtitle is-4">
              <i>A Fallout Themed Discord Radio Bot</i>
            </h4>
            <discord-stats-level :guilds="guilds" :streams="streams" :uptime="uptime"></discord-stats-level>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import DiscordStatsLevel from './components/DiscordStatsLevel.vue';

export default {
  name: 'App',
  components: { DiscordStatsLevel },
  data() {
    return {
      guilds: 0,
      streams: 0,
      uptime: 0,
    };
  },
  mounted() {
    axios
      .get('/api/guilds')
      .then(res => (this.guilds = res.data))
      .catch(err => console.log(err));
    axios
      .get('/api/streams')
      .then(res => (this.streams = res.data))
      .catch(err => console.log(err));
    axios
      .get('/api/uptime')
      .then(res => (this.uptime = res.data))
      .catch(err => console.log(err));
  },
};
</script>

<style lang="scss">
@import 'styles.scss';
</style>
