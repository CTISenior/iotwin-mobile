import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: [
                Math.floor(Math.random() * (15) + 20),
                Math.floor(Math.random() * (15) + 20),
                Math.floor(Math.random() * (15) + 20),
                Math.floor(Math.random() * (15) + 20),
                Math.floor(Math.random() * (15) + 20),
                Math.floor(Math.random() * (15) + 20),
              ],
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            },
            {
              data: [
                Math.floor(Math.random() * 9.0 + 8.5),
                Math.floor(Math.random() * 9.0 + 8.5),
                Math.floor(Math.random() * 9.0 + 8.5),
                Math.floor(Math.random() * 9.0 + 8.5),
                Math.floor(Math.random() * 9.0 + 8.5),
                Math.floor(Math.random() * 9.0 + 8.5),
              ],
            },
          ],
        }}
        //width={Dimensions.get("window").width} // from react-native
        width={400}
        height={220}
        xAxisLabel=""
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#00008b',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: '#white',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
