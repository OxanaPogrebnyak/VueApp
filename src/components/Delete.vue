<template lang="html">
  <div class="post" v-if="post">
    <h1 class="post__title">{{ post.title }}</h1>
    <p class="post__body">{{ post.body }}</p>
    <p class="post__id">{{ post.id }}</p>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'app',
        props: ['id'],
        data () {
            return {
                post: null,
                action: '/table.json?id=',
            }
        },
        created() {
            this.getPost();
        },
        watch: {
            '$route'() {
                this.getPost(this.id);
            }
        },
        methods: {
            getPost(id) {
                let currentObj = this;
                axios(this.action + id)
                    .then(response => {
                        currentObj.$router.push('/');
                    })
                    .catch( error => {
                        console.log(error)
                    })
            }
        }
    }
</script>
