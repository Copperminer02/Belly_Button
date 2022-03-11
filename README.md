# Belly_Button

## Repository Overview
This respistory holds a web deployment for viewinng results from a bacterial survey for each volunteer's naval.  The site contains a navigation bar at the top to access each chart and a drop down menu that allows users to look up their anonymous sample number.  Once a number is chosen, the chart.js file sorts the sample.json data to retrive the results for that number.  A bar chart, belly button washing gauge, and bubble chart are then created for each user.  

Repository contains:
  1.  **index.html** - controls styling and control of web visualization as well as connection to bootstrap, d3, and plotly.
  2.  **samples.json** - contains all raw bacterial data,
  3.  **static/chart.js** - sorts data, controls drop down, and builds charts and gauges
  4.  **static/css/style.css** - controls background color and jumbotron image
  5.  **statis/image/impossible_burger.jpg** - jumbotron image
