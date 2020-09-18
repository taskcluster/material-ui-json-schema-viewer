import React, { Fragment } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  useTheme,
  makeStyles,
} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { TASKCLUSTER_THEME } from '../src/utils/theme';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      icon: 'wrench',
      items: ['default', 'taskcluster-light', 'taskcluster-dark'],
    },
  },
  spacing: {
    name: 'Theme',
    description: 'Theme spacing',
    defaultValue: '8',
    toolbar: {
      icon: 'grid',
      items: ['2', '4', '8', '12'],
    },
  },
};

function WithTheme(Story, context) {
  const defaultTheme = useTheme();
  const parentTheme = {
    default: defaultTheme,
    'taskcluster-light': TASKCLUSTER_THEME.lightTheme,
    'taskcluster-dark': TASKCLUSTER_THEME.darkTheme,
  }[context.globals.theme];
  const spacing = parseInt(context.globals.spacing, 10);
  const theme = createMuiTheme({ ...parentTheme,  spacing });

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Story {...context} />
      </ThemeProvider>
    </Fragment>
  );
}

export const decorators = [WithTheme];
/*
        <Paper elevation={2}>
          <form className={classes.themeForm}>
            <FormControl className={classes.themeFormControl}>
              <Typography variant="body2" gutterBottom>
                Theme
              </Typography>
              <Select value={themeName} onChange={e => setThemeName(e.target.value)}>
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="tcLight">Taskcluster Light</MenuItem>
                <MenuItem value="tcDark">Taskcluster Dark</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.themeFormControl}>
              <Typography variant="body2" gutterBottom>
                Spacing ({spacing})
              </Typography>
              <Slider
                className={classes.spacingSlider}
                value={spacing}
                onChange={(e, v) => setSpacing(v)}
                max={21}
                min={1}
              />
            </FormControl>
          </form>
        </Paper>
*/
