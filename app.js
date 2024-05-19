const app = Vue.createApp({
    data: function() {
        return {
            submissions: submissions, // aus seed.js
            totalVotes: 0
        };
    },
    computed: {

    },
    methods: {
        upvote() {
            this.submissions[0].votes++;
        },
        logUpvote(text){
            console.log(text)
        }
    },
    watch : {
        submissions: {
            handler(newValue, oldValue) {
                console.log("Watch property ausgeführt")
                this.totalVotes = this.submissions.reduce((totalVotes, submission) => {
                    return totalVotes + submission.votes;
                }, 0)
            },
            deep: true,
            immediate: true,
        }
    }

})

//Liefert die Instanz zur Root-Component zurück
const vm = app.mount('#app');