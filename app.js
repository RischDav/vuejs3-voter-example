const app = Vue.createApp({
  data: function () {
    return {
      submissions: submissions, // aus seed.js
      totalVotes: 0,
    };
  },
  computed: {
    sortedSubmissions() {
      return this.submissions.sort((a, b) => {
        return b.votes - a.votes;
      });
    },
    cardHeaderBackgroundColor() {
      if (this.totalVotes >= 50) {
        return ["bg-primary", "text-white"];
      } else {
        return ["bg-success"];
      }
    },
  },
  methods: {},
  watch: {
    submissions: {
      handler(newValue, oldValue) {
        console.log("Watch property ausgeführt");
        this.totalVotes = this.submissions.reduce((totalVotes, submission) => {
          return totalVotes + submission.votes;
        }, 0);
      },
      deep: true,
      immediate: true,
    },
  },
});

app.component("SubmissionListItem", {
  methods: {
    upvote() {
      this.submission.votes++;
    },
    logUpvote(text) {
      console.log(text);
    },
  },
  props: ["submission"],
  template: `
    <div class="d-flex">
        <div class="d-shrink-0">
            <img v-bind:src="submission.img" alt="" />
        </div>
        <div class="flex-grow-1 ms-3">
            <h5>
            {{ submission.title }}
            <span
                class="float-end text-primary"
                style="cursor: pointer"
                v-on:click="upvote(), logUpvote('upgevotet')"
            >
                <i class="fa fa-chevron-up"></i
                ><strong> {{ submission.votes }} </strong></span
            >
            </h5>
            <div v-html="submission.desc"></div>
            <small class="text-muted"
            >Eingereicht von: {{ submission.author }}</small
            >
        </div>
    </div>
    `,
});

//Liefert die Instanz zur Root-Component zurück
const vm = app.mount("#app");
