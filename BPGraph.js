import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Crosshair, useTooltip } from "@nivo/tooltip";
import { Defs, linearGradientDef } from '@nivo/core'
import data from "./data.json";
import {
  Typography,
  withStyles,
  Paper,
  Divider,
  Grid,
} from "@material-ui/core";
import axios from "axios";

const API =
  "https://md8vmmjtih.execute-api.eu-west-1.amazonaws.com/dev/holter-get-measurements-by-patientid";
const prefixCORS = "https://cors-anywhere.herokuapp.com/";

const useStyles = (theme) => ({
  paper: {
    paddingBottom: theme.spacing(3),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    height: "35vh",
  },
  paperHeader: {
    padding: theme.spacing(2),
    fontWeight: "500",
    // marginBottom: "10px",
  },
});

class BPGraph extends Component {
  state = {
    graphData: [],
    selectedPoint: null,
  };

  // initData = (data) => {
  //   if(data)
  //     this.props.init(data);
  // }

  MyCustomLayer = (props) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip();

    // console.log(props)
    return props.slices.map((slice) => (
      <rect
        x={slice.x0}
        y={slice.y0}
        width={slice.width}
        height={slice.height}
        stroke="red"
        strokeWidth={0}
        strokeOpacity={0.75}
        fill="red"
        fillOpacity={0}
        // onMouseEnter = {() => console.log(props)}
        onMouseEnter={() => props.setCurrentSlice(slice)}
        // onClick={() => this.pointClickedHandler(slice.points)}
        onClick={() => this.props.pointClicked(slice.points)}
        onMouseMove={(event) => {
          showTooltipFromEvent(
            React.createElement(props.sliceTooltip, {
              slice,
              axis: props.enableSlices,
            }),
            event,
            "right"
          );
        }}
        onMouseLeave={() => {
          hideTooltip();
          props.setCurrentSlice(null);
        }}
      />
    ));
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle2" className={classes.paperHeader}>
              Blood Pressure Trend - {this.props.time}
            </Typography>
            <Divider />
            {/* <div style={{width: '100%', height: '100%' }}> */}
            <ResponsiveLine
              data={this.props.data}
              margin={{ top: 10, right: 70, bottom: 70, left: 40 }}
              xScale={{
                type: "time",
                format: "%y%m%d%H%M", //define the format of received data (x)
                precision: "minute",
                useUTC: false,
              }}
              xFormat="time:%H:%M"
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              curve="monotoneX"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                format: "%H:%M", //define the format of ticks shown
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 45,
                tickValues: "every hour",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: 'count',
                legendOffset: -40,
                legendPosition: "middle",
              }}
              isInteractive={true}
              // onClick={this.pointClickedHandler}
              enableGridX={false}
              colors={["#75a8eb", "#5901f9", "#ff2366"]}
              pointSize={5}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor", modifiers: [] }}
              pointLabel="y"
              pointLabelYOffset={-12}
              enableArea={true}
              areaOpacity={0.2}
              defs={[
                linearGradientDef("gradientA", [
                  { offset: 0, color: "inherit" },
                  { offset: 100, color: "inherit", opacity: 0 },
                ]),
              ]}
              fill={[{ match: "*", id: "gradientA" }]}
              areaBaselineValue={80}
              crosshairType="x"
              useMesh={true}
              layers={[
                "grid",
                "markers",
                "axes",
                "areas",
                "crosshair",
                "lines",
                "points",
                // 'slices',
                this.MyCustomLayer,
                "mesh",
                "legends",
              ]}
              enableSlices="x"
              // sliceTooltip={({ slice }) => ( // adjust this to also show the timestamp on the tooltip
              //   <div>
              //     {slice.points.map((point) => (
              //       <Fragment>
              //         <div>Time: {/*point.data.x  or */ point.data.xFormatted}</div>
              //         <div> {/*point.data.x  or */ point.data.yFormatted}</div>
              //       </Fragment>
              //     ))}
              //   </div>
              // )}
              legends={[
                {
                  anchor: "right",
                  direction: "column",
                  justify: false,
                  translateX: 99,
                  translateY: 0,
                  itemsSpacing: 12,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 23,
                  itemOpacity: 0.75,
                  symbolSize: 13,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
            {/* </div> */}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(BPGraph);
