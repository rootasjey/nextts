/** @jsxRuntime classic */
/** @jsx jsx */
import Layout from '../components/layout'
import { Box, Button, List, makeStyles, Typography } from '@material-ui/core'
import { css, jsx } from '@emotion/react'
import { gql, useQuery } from '@apollo/client'
import LaunchCard from '../components/launch-card'
import { useRouter } from 'next/router'

const GET_LAUNCHES = gql`
  query GetPastLaunches($limit: Int!) {
    launchesPast(limit: $limit, order: "desc", sort: "launch_date_local") {
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
  launchesList: {
    width: '600px',
    padding: '20px 90px',
    paddingBottom: '400px',
  },
})

export default function Launches(): JSX.Element {
  const limit = 10
  const classes = useStyles()
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_LAUNCHES, {
    variables: { limit },
  })

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>`Error! ${error.message}`</Typography>

  const launches: Array<Launch> = data['launchesPast']

  return (
    <Layout>
      <div
        css={css`
          display: column;
          align-items: flex-start;
          padding-top: 60px;
        `}
      >
        <Box padding={10}>
          <div>
            <Button onClick={router.back}>←Back</Button>
          </div>
          <Typography variant="h1">
            <b>Latest</b>
          </Typography>
          <Typography variant="h1">
            <b>Launches</b>
          </Typography>
        </Box>

        <Box className={classes.launchesList}>
          <List>
            {launches.map((launch) => (
              <LaunchCard key={launch.id} launch={launch} />
            ))}
          </List>
        </Box>
      </div>
    </Layout>
  )
}
