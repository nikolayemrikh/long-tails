import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { gql } from '@apollo/client';
import { apolloClient } from '../apollo-client';

const Home: NextPage = () => {
  return (
    <div>
      123
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query MyQuery {
        getTailId(tail: "best-hello-ever") {
          json_id
        }
      }
    `
  });

  return {
    props: {

    }
  }
}
