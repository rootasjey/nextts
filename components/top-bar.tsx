/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Typography, Paper, Button, makeStyles } from '@material-ui/core'
import { UilRocket } from '@iconscout/react-unicons'
import { css, jsx } from '@emotion/react'

// A style sheet
const useStyles = makeStyles({
  button: {
    marginRight: '10px',
  },
})

export default function TopBar(): JSX.Element {
  const classes = useStyles()
  return (
    <nav>
      <Paper elevation={2} square>
        <Box px={10} py={3}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
              `}
            >
              <Box component="span" pr={1}>
                <UilRocket size="20" color="#4834d4" />
              </Box>
              <Typography component="span">
                <b>Rocket Fire</b>
              </Typography>
            </div>

            <div>
              <Button className={classes.button}>Launches</Button>
              <Button className={classes.button}>About</Button>
              <Button className={classes.button}>GitHub</Button>
            </div>
            {/* <Typography component="span">Launches</Typography> */}
          </div>
        </Box>
      </Paper>
    </nav>
  )
}
