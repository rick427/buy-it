import App from "next/app";
import axios from 'axios';
import Router from "next/router";
import {parseCookies, destroyCookie} from 'nookies';
import Layout from '../components/_App/Layout';
import {redirectUser} from '../utils/auth';
import baseUrl from '../utils/baseUrl';

class MyApp extends App {
  static async getInitialProps({Component, ctx}){
    const {token} = parseCookies(ctx);

    let pageProps = {};

    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
    }

    if(!token){
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create'

      if(isProtectedRoute){
        redirectUser(ctx, '/login')
      }
    }
    else{
      try {
        const payload = { headers: {Authorization: token}}
        const url = `${baseUrl}/api/account`;
        const res = await axios.get(url, payload);
        const user = res.data;
        const isRoot = user.role === 'root';
        const isAdmin = user.admin === 'admin';
        // if authenticated but not admin or root, redirect
        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create'
        if(isNotPermitted){
          redirectUser(ctx, '/')
        }
        pageProps.user = user;
      } 
      catch (error) {
        console.error('Error getting current user', error);
        // Throw out invalid token
        destroyCookie(ctx, 'token');
        // redirect to login page
        redirectUser(ctx, '/login');
      }
    }

    return {pageProps};
  }

  componentDidMount(){
    window.addEventListener('storage', this.syncLogout)
  }

  syncLogout = event => {
    console.log(event)
    console.log(event.key);
    if(event.key === 'logout'){
      console.log('%c Logged out successfully', 'color: #de2f40; background: #f5f5f5;')
      Router.push('/login')
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
