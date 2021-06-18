/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { jsx } from '@emotion/react'

import Layout from '../../components/layout'
import { UilClockEight, UilRocket } from '@iconscout/react-unicons'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import YoutubeEmbed from '../../components/youtube-embed'

const GET_LAUNCH = gql`
  query GetPastLaunches($id: ID!) {
    launch(id: $id) {
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
    }
  }
`

const useStyles = makeStyles({
  rocketContainer: {
    display: 'flex',
    paddingTop: 8,
    paddingBottom: 32,
    alignItems: 'center',
  },
  rocketText: {
    paddingLeft: 12,
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
  },
})

export default function Post(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(GET_LAUNCH, {
    variables: { id },
  })

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>`Error! ${error.message}`</Typography>

  const launch: Launch = data.launch
  const { mission_name, launch_date_local, links, rocket } = launch

  const videoId = links.video_link.substring(links.video_link.lastIndexOf('/'))

  return (
    <Layout>
      <Box padding={10}>
        <div>
          <Button onClick={router.back}>←Back</Button>
        </div>
        <Typography variant="h1">{mission_name}</Typography>

        <Box className={classes.timeContainer}>
          <UilClockEight size="25" />
          <Typography className={classes.rocketText}>
            {new Date(launch_date_local).toLocaleDateString()}
          </Typography>
        </Box>

        <Box className={classes.rocketContainer}>
          <UilRocket size="25" color="#4834d4" />
          <Typography className={classes.rocketText} variant="h6">
            {rocket.rocket_name}
          </Typography>
        </Box>

        <YoutubeEmbed embedId={videoId} />
      </Box>
    </Layout>
  )
}
