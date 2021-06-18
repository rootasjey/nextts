/** @jsxRuntime classic */
/** @jsx jsx */
import Link from 'next/link'
import Layout from '../components/layout'

import {
  Box,
  Button,
  ButtonBase,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'

import { css, jsx } from '@emotion/react'
import React from 'react'

import { gql, useQuery } from '@apollo/client'

import { UilRocket } from '@iconscout/react-unicons'

const GET_LAUNCHES = gql`
  query GetPastLaunches($limit: Int!) {
    launchesPast(limit: $limit) {
      id
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

const useStyles = makeStyles({
  buttonBase: {
    width: '400px',
  },
})

export default function IndexPage(): JSX.Element {
  const limit = 3
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_LAUNCHES, {
    variables: { limit },
  })

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>`Error! ${error.message}`</Typography>

  const launches: Array<Launch> = data['launchesPast']

  return (
    <Layout>
      <main>
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
              {launches.map(({ id, mission_name, launch_date_local, rocket }) => (
                <Box key={mission_name}>
                  <ButtonBase focusRipple className={classes.buttonBase}>
                    <Link href={`/launch/${id}`}>
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
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                  align="left"
                                >
                                  {rocket.rocket_name}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </Box>
                      </ListItem>
                    </Link>
                  </ButtonBase>

                  <Box py={1}>
                    <Divider component="li" />
                  </Box>
                </Box>
              ))}
            </List>
          </Box>
        </div>
      </main>
    </Layout>
  )
}
