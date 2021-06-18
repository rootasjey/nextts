/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import Link from 'next/link'
import {
  Box,
  ButtonBase,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { UilRocket } from '@iconscout/react-unicons'
import { jsx } from '@emotion/react'

const useStyles = makeStyles({
  buttonBase: {
    width: '400px',
  },
})

interface Props {
  launch: Launch
}

export default function LaunchCard(props: Props): JSX.Element {
  const classes = useStyles()
  const { id, mission_name, launch_date_local, rocket } = props.launch

  return (
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
                    <Typography component="span" variant="body2" color="textPrimary" align="left">
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
  )
}
