/** @jsxRuntime classic */
/** @jsx jsx */
import { NextPage } from 'next'
import TopBar from '../components/top-bar'
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'

import { css, jsx } from '@emotion/react'
import React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

import { UilRocket } from '@iconscout/react-unicons'

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
})

interface InitProps {
  props: {
    launches: Array<Launch>
  }
}

interface Props {
  launches: Array<Launch>
}

interface Launch {
  mission_name: string
  site: string
  launch_date_local: string
  rocket: {
    rocket_name: string
  }
}

const GET_LAUNCHES = gql`
  query GetPastLaunches {
    launchesPast(limit: 3) {
      mission_name
      launch_date_local
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`

export async function getStaticProps(): Promise<InitProps> {
  const results = await client.query({
    query: GET_LAUNCHES,
  })

  const launches: Array<Launch> = results.data['launchesPast']

  // The value of the `props` key will be
  // passed to the `Home` component
  return {
    props: {
      launches: launches,
    },
  }
}

const IndexPage: NextPage<Props> = ({ launches }) => (
  <ApolloProvider client={client}>
    <main>
      <TopBar></TopBar>
      <div
        css={css`
          display: flex;
          align-items: center;
          padding-top: 60px;
        `}
      >
        <Box padding={10}>
          <Typography variant="h1">
            <b>Lastest</b>
          </Typography>
          <Typography variant="h1">
            <b>Launches</b>
          </Typography>
          <Button variant="contained" color="secondary">
            More launches →
          </Button>
        </Box>

        <Box>
          <List>
            {launches.map(({ mission_name, launch_date_local, rocket }) => (
              <Box key={mission_name}>
                <ListItem key={mission_name}>
                  <ListItemAvatar>
                    <UilRocket size="40" color="#4834d4" />
                  </ListItemAvatar>

                  <Box pl={3}>
                    <ListItemText
                      primary={mission_name}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body1" color="textPrimary">
                            {new Date(launch_date_local).toLocaleDateString()} <br />
                          </Typography>
                          <Typography component="span" variant="body2" color="textPrimary">
                            {rocket.rocket_name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Box>
                </ListItem>

                <Box py={1}>
                  <Divider component="li" />
                </Box>
              </Box>
            ))}
          </List>
        </Box>
      </div>
    </main>
  </ApolloProvider>
)

export default IndexPage
