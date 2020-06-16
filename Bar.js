import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Typography, Divider, colors } from "@material-ui/core";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
    height: "35vh",
  },
  paperHeader: {
    padding: theme.spacing(2),
    fontWeight: "500",
  },
  gridContainer: {
    height: "100%",
  },
  dataGrid: {
    backgroundColor: "#effbfe",
    padding: theme.spacing(2),
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  minMaxData: {
    color: "#03759a",
  },
  barContainer: {
    padding: theme.spacing(2),
    position: "relative",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  bottomInfo: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "30%",
  },
}));

export default function Bar(props) {
  const classes = useStyles();

  const data = [
    {
      name: "Avg",
      value: props.rawData.average,
      fill: props.colors.avg,
    },
    {
      name: props.rawData.id,
      value: props.currentData,
      fill: props.colors.current,
    },
  ];
  console.log(data);

  return (
    <Grid item md={12} lg={4}>
      <Paper className={classes.paper}>
        <Typography variant="subtitle2" className={classes.paperHeader}>
          {props.title}
        </Typography>
        <Divider />
        <Grid container direction="row" className={classes.gridContainer}>
          <Grid item container sm={3} className={classes.dataGrid}>
            <Typography
              variant="h5"
              style={{ fontWeight: "700", color: props.colors.current }}
            >
              {props.currentData}
            </Typography>
            <Typography variant="body1">{props.unit}</Typography>
            <Divider
              variant="middle"
              style={{
                alignSelf: "stretch",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <Typography variant="h6" style={{ color: props.colors.avg }}>
              {props.rawData.average}
            </Typography>
            <Typography variant="caption">Average</Typography>
            <Typography variant="h6" className={classes.minMaxData}>
              {props.rawData.maximum}
            </Typography>
            <Typography variant="caption">Maximum</Typography>
            <Typography variant="h6" className={classes.minMaxData}>
              {props.rawData.minimum}
            </Typography>
            <Typography variant="caption">Minimum</Typography>
          </Grid>
          <Grid item container className={classes.barContainer} sm={9}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                // width={300}
                // height={240}
                innerRadius="70%"
                outerRadius="100%"
                data={data}
                startAngle={240}
                endAngle={-60}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 150]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  angleAxisId={0}
                  minAngle={15}
                  label={{ fill: "#000", position: "end" }}
                  background
                  clockWise={true}
                  dataKey="value"
                />
                {/* <Tooltip /> */}
              </RadialBarChart>
            </ResponsiveContainer>
            <Paper elevation={0} className={classes.bottomInfo}>
              <Grid container>
                <Grid xs={3}>
                </Grid>
                <Grid xs={3}>
                  <Typography variant="body2">Min</Typography>
                </Grid>
                <Grid xs={2}>
                </Grid>
                <Grid xs={4}>
                <Typography variant="body2">Max</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
