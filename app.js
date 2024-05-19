const app = Vue.createApp({
    data: function() {
        return {
            submissions: submissions // aus seed.js
        };
    },
    methods: {
        upvote(text) {
            this.submissions[0].votes++;
            console.log(text);
        },
    }

})

//Liefert die Instanz zur Root-Component zurück
const vm = app.mount('#app');