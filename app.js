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
      if (this.totalVotes >= 0) {
        return ["bg-primary", "text-white"];
      } else {
        return ["bg-danger", "text-white"];
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
    downvote() {
        this.submission.votes--;
      },
    logUpvote(text) {
      console.log(text);
    },
  },
  computed: {
    votesColor() {
        if (this.submission.votes < 0) {
            return ["text-danger"]
        } else {
            return ["text-primary"]
        }
    },
    arrowDirection() {
        if(this.submission.votes < 0){
            return ["fa fa-chevron-down"]
        } else {
            return ["fa fa-chevron-up"]
        }
    }
  },
  props: ["submission"],
  template: `
    <div class="d-flex">
        <div class="d-shrink-0">
            <img :src="submission.img" alt="" />
        </div>
        <div class="flex-grow-1 ms-3">
            <h5>
            {{ submission.title }}
            <span
                :class="votesColor" class="float-end"
            >
                <i :class="arrowDirection"></i
                ><strong> {{ submission.votes }} </strong>
                </span>
                <br>
                <span class="float-end d-grid gap-2 mx-auto" style="margin-top: 20px;"> 
                <button type="button" class="btn btn-success float-end" @click="upvote()">Upvote</button>
                <br>
                <button type="button" class="btn btn-danger float-end" @click="downvote()">Downvote</button>
                </span>
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
