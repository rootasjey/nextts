/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { jsx } from '@emotion/react'
import Link from 'next/link'

const useStyles = makeStyles({
  container: {
    padding: '20px 90px',
    paddingBottom: '400px',
  },
  techStack: {
    paddingTop: '40px',
  },
})

export default function About(): JSX.Element {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Typography variant="h3" id="about">
        <b>About</b>
      </Typography>
      <Typography variant="body2">
        This is a demo <Link href="https://nextjs.org/">Next.JS</Link> project using
        <Link href="https://api.spacex.land/graphql/"> SpaceX GraphQL </Link>
        API to show last launches.
      </Typography>

      <Box className={classes.techStack}>
        <Typography variant="h6">TECK STACK</Typography>
        <ul>
          <li>
            <Button href="https://nextjs.org">Next.JS</Button>
          </li>
          <li>
            <Button href="https://reactjs.org">React</Button>
          </li>
          <li>
            <Button href="https://apollographql.com">Apollo</Button>
          </li>
          <li>
            <Button href="https://iconscout.com">Unicons</Button>
          </li>
          <li>
            <Button href="https://material-ui.com">material-ui</Button>
          </li>
          <li>
            <Button href="https://emotion.sh">emotion</Button>
          </li>
        </ul>
      </Box>
    </Box>
  )
}
