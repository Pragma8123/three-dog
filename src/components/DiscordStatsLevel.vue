<template>
  <nav class="level is-mobile">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading has-text-success">Guilds</p>
        <p class="title">{{ guilds }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading has-text-success">Listeners</p>
        <p class="title">{{ streams }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading has-text-success">Uptime</p>
        <p class="title is-3">{{ uptimePretty }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DiscordStatsLevel',
  props: {
    guilds: { type: Number, default: 0 },
    streams: { type: Number, default: 0 },
    uptime: { type: Number, default: 0 },
  },
  computed: {
    uptimePretty() {
      const temp = moment.duration(this.uptime);
      return `${temp.hours()}h:${temp.minutes()}m`;
    },
  },
};
</script>
