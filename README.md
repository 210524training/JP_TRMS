# JP_TRMS

## Project Description

TRMS, or Tuition Reimbursement Management System is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications.
These requests can then be approved or rejected by the employee's direct supervisor, department head, and a benefits coordinator while the employee is able to track the status of
their requests.

## Technologies Used

* JavaScript
* Express.js
* DynamoDB
* React
* HTML
* CSS
* Redux
* TypeScript

## Features

List of features ready and TODOs for future development
* Create reimbursement requests as a user
* Review, approve, reject requests 
* Upload images as proof of course completion to S3

To-do list:
* Retrieve images uploaded to S3

## Getting Started
   
git clone https://github.com/210524training/JP_TRMS.git

* Server setup
cd ExpressServer
npm install
npm start

* Frontend setup
cd ReactApp/redux-toolkit-template
npm install
npm start

> Node package manager (npm) is required before hand.

## Usage

Four user roles are needed to complete a workflow; Employee, Direct Supervisor, Department Head, Benefits Coordinator.
1. First log in with an Employee user. Click create reimbursement. Fill out the form that appears with the information you want. Click submit.
2. Now log in with a Direct supervisor. You can click approve or if you type a rejection reason in the text box you can reject.
3. If you rejected go back to the user and you can change some data and hit submit again. Now go back to the previous step.
4. If you accepted log in with Department Head then repeat step 2. Do the same with Benefits Coordinator.
