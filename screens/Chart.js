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
          labels: ['Temperature', 'Humidity'],
          datasets: [
            {
              data: [
                Math.random() * 100 / 2,
                Math.random() * 100 / 2,
                Math.random() * 100 / 2,
                Math.random() * 100 / 2,
                Math.random() * 100 / 2,
                Math.random() * 100 / 2,
              ],
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            },
            {
              data: [
                (Math.random() * 100) / 3,
                (Math.random() * 100) / 3,
                (Math.random() * 100) / 4,
                (Math.random() * 100) / 3,
                (Math.random() * 100) / 4,
                (Math.random() * 100) / 4,
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
          decimalPlaces: 1, // optional, defaults to 2dp
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
