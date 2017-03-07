# iRoamba
## A web dashboard for the iRobot Create 2 Roomba.
## Created by Nishir Shelat, Teresa Liu, Daniel Koo, and Ethan Yu

## What it does

iRoamba is a web control dashboard which serially links to the iRobot Create 2 unit. It enables the user to administer directional commands, such as "drive forward," "drive backward," "turn left," and "turn right," to the unit and also visualizes important data which it receives from the unit's many sensors: cliff sensors, bump sensors, a wall sensor, and wheel drop sensors. On top of that, it allows the user to see the total distance traveled, the current angle of the unit, the rotary encoder counts from both wheels, and the instantaneous velocity of the unit. It also shows a tracking map which dynamically updates with the path of the unit in real-time. All of this information is displayed in a visually pleasing, interactive web page which is responsive and fits on one screen.

## How we built it

We used an open-source Node.js framework which enabled us to control and read from the unit with the iRobot Create 2 Open Interface specifications. The algorithms which parsed and displayed the data on the webpage were created with pure JavaScript so that they entire application would be lightweight and clean. We used Socket.IO to perform serverside/clientside communications. We displayed the tracking map with the Plotly graphing API. The webpage itself was created with HTML/CSS. The diagram which shows the bump sensor data was created with several layers of photos designed in Adobe Illustrator - the JavaScript determines which photo should have an opacity of "1" depending on which bump sensors are being activated at the time.

## Challenges we ran into

Having never worked with an iRobot developmental product, we had some difficulty finding a way to control the unit from our computers. However, after asking the visiting iRobot engineer, Rodrigo, we were able to find a Node.js framework on GitHub that was available for us to download and use with the unit. Another challenge we ran into was with the design and implementation of the bump sensor diagram, since there was too much information to display in a column on the side of the webpage. Eventually, we opted to create a more user-intuitive, colorful display which we made to look like the curve of a Roomba. Using a combination of CSS and JavaScript, we were able to make it light up the correct part of the diagram depending on which bump sensor was being activated.

## What we learned

We learned how to program with hardware, since this was our first hardware hack. We also learned that there is usually a handy JavaScript framework for almost anything we want to do that is web-related. We also learned Socket.io and its ability to connect and transfer data from Node.js our front-end. Along with that, we also learned about the ubiquity of Node.js and its capabilities.

## What's next for iRoamba

Now that we have created a user-friendly, robust web dashboard through which to directionally control the Create 2, we want to update our webpage so that it can administer more unique commands, such as toggling between modes and playing music. We also want to implement a scheduling system or path design tool so that the user can queue up a series of commands which the unit will carry out at the push of a button. Another component we want to add to the webpage is a new set of graphs so that the data visualization is even more intuitive, and we want the user to be able to save an export the graphs, as well as record the unit's journey through the webpage. When it comes to user control, we want the user to be able to make the unit move around not only with the mouse, but also the keyboard, so that it feels easier to direct the unit.

On a higher level, we want to be able to use our webpage to design larger, more complex programs with the Create 2 unit. Pairing the unit with an Amazon Echo or Raspberry Pi or large monitor so that it can play music and connect to WiFi and display pictures and text are all made easier with our webpage, since we can control and read from the unit more efficiently, which makes the entire developmental process easier. For starters, we want to create a real-life PAC-MAN style game with the Roomba, using a series of commands on our webpage to program the unit to complete an obstacle course of debris. The more clutter it sweeps up from the floor, the more points it gets!

Finally, we were thinking of ways to use the sensors on the Roomba to make it remember if it passed over a piece of debris that was too large to pick up in just one sweep. If the on-board sensors are not enough to sense this, we can attach an external sensor to the bottom of the unit, and then create a state machine in our JavaScript. If we put one sensor before the vacuum and one sensor after it, we can make the unit constantly check if it was successful in its quest to sweep up the clutter. If it sees that it was not successful, we can program it to turn around and try one more time. As a result, the Roomba should be more effective in its cleaning!
