# iRoamba
#### A web dashboard for the iRobot Create 2 Roomba.
Created during HackTech 2017 at California Institute of Technology as a submission to iRobot's Roomba Challenge.  
**Read more about iRoamba on our [Devpost](https://devpost.com/software/iroamba)

## Our Team
- Nishir Shelat
- Teresa Liu
- Daniel Koo
- Ethan Yu

## About

iRoamba is a web control dashboard which serially links to the iRobot Create 2 unit. It enables the user to administer directional commands, such as "drive forward," "drive backward," "turn left," and "turn right," to the unit and also visualizes important data which it receives from the unit's many sensors: cliff sensors, bump sensors, a wall sensor, and wheel drop sensors. On top of that, it allows the user to see the total distance traveled, the current angle of the unit, the rotary encoder counts from both wheels, and the instantaneous velocity of the unit. It also shows a tracking map which dynamically updates with the path of the unit in real-time. All of this information is displayed in a visually pleasing, interactive web page which is responsive and fits on one screen.

## Built With

- An open-source Node.js framework to control and read from the unit with the iRobot Create 2 Open Interface specifications
- JavaScript to parse and display the data on the webpage
- Socket.IO to perform serverside/clientside communications
- Plotly graphing API to visualize and display data
- HTML/CSS
- Adobe Illustrator for the designs

## YouTube Demo
[Watch this great video about our project](https://www.youtube.com/watch?v=NeWSxk7NHXI)

## Images
<img width="667" alt="screen shot 2017-05-24 at 4 46 14 pm" src="https://cloud.githubusercontent.com/assets/22362476/26424836/9a79a9f0-40a0-11e7-94be-418cef8e8401.png">



