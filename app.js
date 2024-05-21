const app = Vue.createApp({
    data: function() {
        return {
            submissions: submissions, // aus seed.js
            totalVotes: 0
        };
    },
    computed: {
        sortedSubmissions() {
            return this.submissions.sort((a, b) => {
                return b.votes - a.votes;
            })
        },
        cardHeaderBackgroundColor() {
            if(this.totalVotes >= 50){
                return ["bg-primary", "text-white"];
            } else {
                return ["bg-success"];
            }
        },
    },
    methods: {
        upvote(submissionId) {
            const submission = this.submissions.find(
                (submission) => 
                submission.id === submissionId
            )
            submission.votes++;
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