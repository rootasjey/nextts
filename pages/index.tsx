/** @jsxRuntime classic */
/** @jsx jsx */
import Link from 'next/link'
import Layout from '../components/layout'
import { Box, Button, List, Typography } from '@material-ui/core'
import { css, jsx } from '@emotion/react'
import { gql, useQuery } from '@apollo/client'
import LaunchCard from '../components/launch-card'

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

export default function IndexPage(): JSX.Element {
  const limit = 3
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
            padding-bottom: 100px;
          `}
        >
          <Box padding={10}>
            <Typography variant="h1">
              <b>Lastest</b>
            </Typography>
            <Typography variant="h1">
              <b>Launches</b>
            </Typography>
            <Link href="/launches">
              <Button variant="contained" color="secondary">
                More launches →
              </Button>
            </Link>
          </Box>

          <Box>
            <List>
              {launches.map((launch) => (
                <LaunchCard key={launch.id} launch={launch} />
              ))}
            </List>
          </Box>
        </div>
      </main>
    </Layout>
  )
}
