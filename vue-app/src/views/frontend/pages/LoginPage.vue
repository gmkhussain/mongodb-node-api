<template>
    <div>
        <form @submit.prevent="requestLogin">
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" value="admin" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" value="123" />
            </div>
            <div class="form-group">
                <button class="btn">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "LoginPage",
    data() {
        return {
            pageInfo: {
                loading: false,
            },
            loginInfo: {
                id: 'admin',
                password: '123'
            }
        }
    },
    methods: {
        requestLogin() {
            axios.post(`${process.env.VUE_APP_API_BASE_URL}/auth/login`, this.loginInfo ).then(
                res => {
                    console.log( "Res", res )
                }
            ).catch( err=> { console.log("Err", err ) } )
        }
    },
    mounted() {
        
    }
}
</script>